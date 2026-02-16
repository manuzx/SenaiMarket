import React from 'react';
// Importamos o criador de navegação em pilha (Stack)
import { createStackNavigator } from '@react-navigation/stack';
// Importamos a tela de Login que será o ponto de partida
import LoginScreen from '../screens/LoginScreen';

// Instanciamos o objeto Stack, que gerencia o histórico de telas (LIFO - Last In, First Out)
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    /* O Stack.Navigator agrupa as telas de um mesmo contexto.
       screenOptions={{ headerShown: false }}: Remove o cabeçalho padrão do sistema, 
       permitindo que o design da tela de login ocupe 100% da área visível.
    */
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* Definimos a tela de Login. 
         O 'name' é o identificador que usamos no navigation.navigate('Login')
      */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
    </Stack.Navigator>
  );
}