import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORTANTE: O ../ serve para subir um nível na pasta e acessar 'screens'
import LoginScreen from '../screens/LoginScreen'; 
import CadastroScreen from '../screens/CadastroScreen'; 
import AppTabs from './AppTabs'; // ./ indica que está na mesma pasta 'routes'

// Instancia o navegador em pilha (Stack)
const Stack = createStackNavigator();

export default function Router() {
  return (
    // headerShown: false remove aquela barra superior padrão do Android/iOS
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* 1ª Tela da Pilha: Login. É a primeira que o usuário vê ao abrir o app */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* 2ª Tela da Pilha: Cadastro. Acessada via navigation.navigate('Cadastro') */}
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      
      {/* 3ª Tela: Main. Aqui "injetamos" o TabNavigator (AppTabs) 
          que contém as abas do sistema após o login com sucesso */}
      <Stack.Screen name="Main" component={AppTabs} />
      
    </Stack.Navigator>
  );
}