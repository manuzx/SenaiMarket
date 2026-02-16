import React from 'react';
// Importa o criador de navegação em pilha da biblioteca react-navigation
import { createStackNavigator } from '@react-navigation/stack';

// Importação das telas: 
// O '../' sobe um nível na pasta (sai de 'routes' e vai para a raiz da 'src')
import LoginScreen from '../screens/LoginScreen'; 
import CadastroScreen from '../screens/CadastroScreen'; 
// O './' indica que o arquivo está no mesmo nível de diretório (dentro de 'routes')
import AppTabs from './AppTabs'; 

// Inicializa o objeto de navegação em pilha
const Stack = createStackNavigator();

export default function Router() {
  return (
    /* Navigator: O container que gerencia a transição entre telas.
       headerShown: false -> Remove a barra de título automática para dar 
       total liberdade de design para a sua interface. */
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* 1. Telas de Autenticação:
          A primeira 'Stack.Screen' definida é, por padrão, a tela inicial do App.
          Neste caso, o fluxo começa sempre pelo Login. */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Tela de Cadastro: Adicionada à pilha quando o usuário clica em "Cadastre-se" */}
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      
      {/* 2. Fluxo Principal (Pós-Login):
          Note que aqui o 'component' não é uma tela comum, mas sim outro navegador 
          (o Tab Navigator que criamos no AppTabs). Isso é chamado de 
          'Navegação Aninhada' ou 'Nested Navigation'. */}
      <Stack.Screen name="Main" component={AppTabs} />
      
    </Stack.Navigator>
  );
}