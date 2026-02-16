import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// useIsFocused: Hook essencial para resolver o problema de telas "paradas" em segundo plano
import { useIsFocused } from '@react-navigation/native'; 

export default function CarrinhoScreen() {
  // Estado que armazena a lista de produtos recuperada do "banco"
  const [itensNoCarrinho, setItensNoCarrinho] = useState([]);
  
  // Variável booleana que muda para 'true' toda vez que o usuário clica nesta aba
  const isFocused = useIsFocused(); 

  // 1. Lógica de Recuperação de Dados
  const carregarCarrinho = async () => {
    try {
      // Busca a string JSON salva sob a chave '@carrinho_data'
      const jsonValue = await AsyncStorage.getItem('@carrinho_data');
      
      if (jsonValue !== null) {
        // Desserialização: Converte a string de volta para um Array de objetos JS
        setItensNoCarrinho(JSON.parse(jsonValue));
      } else {
        // Caso a chave não exista, garante que o estado seja um array vazio
        setItensNoCarrinho([]); 
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar o carrinho.");
    }
  };

  // 2. CICLO DE VIDA (useEffect):
  // Este hook monitora a variável 'isFocused'. Quando você entra na tela, 
  // 'isFocused' vira true e dispara a função 'carregarCarrinho()'.
  useEffect(() => {
    if (isFocused) {
      carregarCarrinho();
    }
  }, [isFocused]);

  // 3. Lógica de Deleção (CRUD - Delete)
  const limparCarrinho = async () => {
    // Remove fisicamente a chave do armazenamento local
    await AsyncStorage.removeItem('@carrinho_data');
    // Limpa o estado da tela para refletir a mudança visualmente na hora
    setItensNoCarrinho([]);
    Alert.alert("Sucesso", "Carrinho esvaziado!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      {/* RENDERIZAÇÃO CONDICIONAL: 
          Se o tamanho do array for 0, mostra mensagem de vazio.
          Caso contrário, renderiza a FlatList com os produtos. */}
      {itensNoCarrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Poxa, seu carrinho está vazio... 🛒</Text>
        </View>
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            data={itensNoCarrinho}
            // Usa o index como chave para garantir unicidade na renderização
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Text style={styles.itemIcon}>{item.imagem}</Text>
                <View>
                  <Text style={styles.itemName}>{item.nome}</Text>
                  <Text style={styles.itemPrice}>{item.preco}</Text>
                </View>
              </View>
            )}
          />

          {/* Botão de ação para o método 'Delete' do armazenamento local */}
          <TouchableOpacity style={styles.clearButton} onPress={limparCarrinho}>
            <Text style={styles.clearButtonText}>Esvaziar Carrinho</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}