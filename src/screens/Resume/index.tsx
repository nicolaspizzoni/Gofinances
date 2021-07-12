import React, {useState, useCallback,} from 'react';
import {ActivityIndicator} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { VictoryPie } from 'victory-native'

import { HistoryCard } from '../../components/HistoryCard';

import {
    Container,
    Header,
    Title,
    Content,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    GraphContainer,
    LoadContainer,
} from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/native';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

interface TransactionProps {
    type: 'positive' | 'negative',
    name: string,
    amount: string,
    category: string,
    date: string,
}

interface TotalByCategories {
    key: string,
    name: string,
    amount: string,
    color: string,
    percent: number,
    percentFormatted: string,
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date);
    const [categoryTotal, setCategoryTotal] = useState<TotalByCategories[]>([]);
    const {user} = useAuth();
    
    function handleSetMonths(action: 'next' | 'prev'){

        if(action == 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData(){
        setIsLoading(true)

        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const outcomes = responseFormatted
        .filter((category : TransactionProps) => category.type === 'negative' &&
            new Date(category.date).getMonth() === selectedDate.getMonth() &&
            new Date(category.date).getFullYear() === selectedDate.getFullYear()
        );

        const totalOutcomes = outcomes
        .reduce((accumulator:Number, item:TotalByCategories) => {
            return accumulator + item.amount;
        }, 0)

        const totalByCategory : TotalByCategories[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outcomes.forEach((outcome : TransactionProps) => {
                if(outcome.category === category.key){
                    categorySum += Number(outcome.amount)
                }
            })

            if(categorySum > 0){
                const amount = categorySum
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = (categorySum/totalOutcomes) * 100;
                const percentFormatted = `${percent.toFixed(0)}%`;


                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    amount,
                    color: category.color,
                    percent,
                    percentFormatted,
                })
            }
        })

        setCategoryTotal(totalByCategory);
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]))

    return(
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {
            isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                    color={theme.colors.primary}
                    size="large"
                    />
                </LoadContainer>
            :
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleSetMonths('prev')}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton>
                    <Month>
                        {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
                    </Month>
                    <MonthSelectButton onPress={() => handleSetMonths('next')}>
                        <MonthSelectIcon name="chevron-right"/>
                    </MonthSelectButton>
                </MonthSelect>
                <GraphContainer>
                    <VictoryPie
                        data={categoryTotal}
                        colorScale={categoryTotal.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(20),
                                fontWeight: 'bold',
                                fill: 'white',
                            }
                        }}
                        labelRadius={50}
                        x="percentFormatted"
                        y="percent"
                        height={350}
                    />
                </GraphContainer>
                {
                    categoryTotal.map(item =>
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.amount}
                            color={item.color}
                        />
                    )
                }
            </Content>
            }
        </Container>
    )
}