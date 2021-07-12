import React, {useState, useEffect} from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import uuid from 'react-native-uuid'


import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { Container, Header, Title, Form, Fields, TransactionsType } from "./styles";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionButton } from "../../components/Form/TransactionButton";
import {CategorySelect} from '../CategorySelect'
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { useAuth } from "../../hooks/auth";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required("Nome é obrigatório"),
  amount: Yup
  .number()
  .typeError("Informe um valor númerico")
  .positive("Informe um valor positivo")
  .required("Informe um valor")
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [openModal, setOpenModal] = useState(false)

  const {user} = useAuth()

  const [category, setCategory] = useState({
    key: 'category',
    name: "Categoria"
  })


  const navigation = useNavigation();

  const {control, handleSubmit, reset, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });


  function handleTransactionType(type: string){
    setTransactionType(type)
  }

  function handleOpenModal() {
    setOpenModal(true)
  }

  function handleCloseModal() {
    setOpenModal(false)
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert("Informe o tipo de transação")
    }
    if(category.name === 'Categoria'){
      return Alert.alert("Informe a categoria")
    }


    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
        Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          <TransactionsType>
            <TransactionButton 
              title="Income"
              type="up"
              onPress={() => handleTransactionType('positive')}
              isActive={transactionType === 'positive'}
            /> 
            <TransactionButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionType('negative')}
              isActive={transactionType === 'negative'}
            />
          </TransactionsType>
            <CategorySelectButton
            title={category.name}
            onPress={() => handleOpenModal()}
            />
          <Modal visible={openModal}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              CloseSelectCategory={handleCloseModal}
            />
          </Modal>
        </Fields>

        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)} //handleSubmit passa os dados de cada input para o handleRegister
        />
      </Form>
    </Container>
    </TouchableWithoutFeedback>
  );
}
