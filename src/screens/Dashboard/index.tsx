import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../../global/styles/theme'
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  LoadContainer,
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGrettings,
  UserName,
  Icon,
  HighLightCards,
  Title,
  Transactions,
  TransactionList,
  LogoutButton
} from "./styles";
import { useAuth } from "../../hooks/auth";

export interface DataProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  transactionDate: string;
}

interface HighLightData {
  entries: HighLightProps;
  outcomes: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const {user, signOut} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  
  function getLastTransactionsDate(collection : DataProps[], type: 'positive' | 'negative'){
    const filteredCollection = collection
    .filter(transaction => transaction.type === type)

    if(filteredCollection.length === 0){
      return 0;
    }

    const lastTransactionDate = new Date(
    Math.max.apply(Math, filteredCollection
    .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString('pt-BR', {month:'long'})}`;

  }
  
  async function loadTransactions(){
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let outTotal = 0;

    const transactionsFormatted : DataProps[] = transactions
    .map((item: DataProps) => {
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) //formatação de moeda

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date())

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount)
      }

      if(item.type === 'negative'){
        outTotal += Number(item.amount)
      }

      const lastTransactionEntries = getLastTransactionsDate(transactions, 'positive');
      const lastTransactionOutcome = getLastTransactionsDate(transactions, 'negative');
      const totalInterval = lastTransactionOutcome === 0
      ? 'Não há trasações'
      : `01 a ${lastTransactionOutcome}`;

      let totalCard = entriesTotal - outTotal;

      setHighLightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          transactionDate: lastTransactionEntries === 0 
          ? "Não há transações"
          : `Última entrada dia ${lastTransactionEntries}`
        },
        outcomes: {
          amount: outTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          transactionDate: lastTransactionOutcome === 0
          ? "Não há transações"
          : `Última saída dia ${lastTransactionOutcome}`
        },
        total: {
          amount: totalCard.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          transactionDate: totalInterval
        }
      })

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    });


    setData(transactionsFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

//   const dataKey = '@gofinances:transactions'
//   useEffect(() => {
//     async function loadData() {
//       const data = await AsyncStorage.getItem(dataKey)
//       console.log(JSON.parse(data!)) //data! a ! serve para indicar que sempre havera um valor para data, not null
//     }
//     loadData()
//     async function removeAll(){
//       await AsyncStorage.removeItem(dataKey)
//     }
//     removeAll()
// }, [])

  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
          color={theme.colors.primary}
          size="large"
          />
        </LoadContainer>
        :
        <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo
                source={{
                  uri: user.photo,
                }}
              />
              <User>
                <UserGrettings>Olá,</UserGrettings>
                <UserName>{user.name}</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={signOut}>
            <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighLightCards>
          <HighLightCard
            title="Entradas"
            amount={highLightData.entries == undefined ? '0' : highLightData.entries.amount}
            lastTransaction={highLightData.entries == undefined ? '' : highLightData.entries.transactionDate}
            type="up"
          />
          <HighLightCard
            title="Saídas"
            amount={highLightData.outcomes == undefined ? '0' : highLightData.outcomes.amount}
            lastTransaction={highLightData.outcomes == undefined ? '' : highLightData.outcomes.transactionDate}
            type="down"
          />
          <HighLightCard
            title="Total"
            amount={highLightData.total == undefined ? '0' : highLightData.total.amount}
            lastTransaction={highLightData.total == undefined ? '' : highLightData.total.transactionDate}
            type="total"
          />
        </HighLightCards>
        <Transactions>
          <Title>Listagem</Title>
          <TransactionList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <TransactionCard data={item}/>}
          />
        </Transactions>
      </>
}
    </Container>
  );
}
