import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalhesScreen({ route, navigation }) {
  // RECEBIMENTO DE PARÂMETROS:
  // O React Navigation passa os dados da Vitrine para cá através do objeto 'route.params'.
  const { produto } = route.params;

  // Lógica para persistir o item na lista do carrinho
  const handleAddCarrinho = async () => {
    try {
      // 1. LEITURA (READ): Buscamos a string do carrinho que já está gravada.
      const carrinhoAtual = await AsyncStorage.getItem('@carrinho_data');
      
      // Inicializamos uma lista vazia para evitar erros caso seja o primeiro item.
      let listaProdutos = [];
      
      // 2. DESSERIALIZAÇÃO: Se já existir dados, convertemos de String para Array (JSON.parse).
      if (carrinhoAtual !== null) {
        listaProdutos = JSON.parse(carrinhoAtual);
      }

      // 3. ATUALIZAÇÃO: Inserimos o objeto 'produto' recebido no final do array.
      // Aqui usamos o método nativo de arrays do JavaScript: .push()
      listaProdutos.push(produto);

      // 4. ESCRITA (WRITE): Convertemos o array atualizado para String (JSON.stringify)
      // e salvamos de volta no disco do celular.
      await AsyncStorage.setItem('@carrinho_data', JSON.stringify(listaProdutos));

      Alert.alert("Sucesso!", `${produto.nome} foi para o seu carrinho.`);
      
      // UX: Após adicionar, voltamos o usuário para a Vitrine para facilitar novas compras.
      navigation.goBack(); 
    } catch (error) {
      // Tratamento de exceção em caso de falha no armazenamento.
      Alert.alert("Erro", "Não conseguimos salvar no carrinho.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibição dinâmica dos dados do produto recebido via parâmetro */}
      <Text style={styles.icon}>{produto.imagem}</Text>
      <Text style={styles.title}>{produto.nome}</Text>
      <Text style={styles.price}>{produto.preco}</Text>
      
      <Text style={styles.description}>
        Este é um excelente {produto.nome} disponível no SenaiMarket.
      </Text>
      
      <View style={styles.buttonContainer}>
        {/* O componente Button nativo é usado aqui para uma ação direta de formulário */}
        <Button 
          title="Adicionar ao Carrinho" 
          color="#E31010" // Cor padrão SENAI
          onPress={handleAddCarrinho} 
        />
      </View>
    </View>
  );
}