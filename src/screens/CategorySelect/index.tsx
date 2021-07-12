import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    CloseSelectCategory: () => void;
}

export function CategorySelect({CloseSelectCategory, setCategory, category} : Props){

    function handleSetCategory(category: Category) {
        setCategory(category)
    }

    return(
        <Container>
            <Header>
                <Title>Categorias</Title>
            </Header>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.key}
                style={{flex: 1, width: '100%'}}
                renderItem={({item}) => (
                    <Category
                        onPress={() => handleSetCategory(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon}/>
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Button title="Selecionar" onPress={CloseSelectCategory}/>
            </Footer>
        </Container>
    )
}