import React from 'react';
// FlatList: O componente mais performático do React Native para listas longas
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// Importação de dados estáticos (Mock Data) para alimentar a interface
import { PRODUTOS } from '../data/produtos'; 

export default function VitrineScreen({ navigation }) {
  
  // 1. RENDERIZADOR DE ITENS (Callback):
  // Esta função é executada para cada objeto dentro do array PRODUTOS.
  const renderItem = ({ item }) => (
    /* TouchableOpacity: Transforma o card em um componente clicável 
       com feedback visual (opacidade reduz ao tocar). */
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detalhes', { produto: item })} 
      /* PASSAGEM DE PARÂMETROS:
         Aqui enviamos o objeto 'item' inteiro para a tela de Detalhes. 
         Isso é fundamental para não ter que buscar o produto novamente. */
    >
      <Text style={styles.icon}>{item.imagem}</Text>
      <View>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>{item.preco}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 2. COMPONENTE FLATLIST:
          Diferente de um Map comum, a FlatList só renderiza o que está 
          visível na tela, economizando memória RAM do dispositivo. */}
      <FlatList
        data={PRODUTOS} // Fonte de dados (Array de objetos)
        // keyExtractor: Ajuda o React a identificar quais itens mudaram (essencial para performance)
        keyExtractor={item => item.id}
        // renderItem: A função que desenha cada linha da lista
        renderItem={renderItem}
        // Estilização específica para o conteúdo interno da lista
        contentContainerStyle={styles.list}
      />
    </View>
  );
}