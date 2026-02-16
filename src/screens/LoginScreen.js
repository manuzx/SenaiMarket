import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// AsyncStorage: Fundamental para simular a verificação de um banco de dados local
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  // Estados para capturar as credenciais digitadas pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Lógica de Autenticação
  const handleLogin = async () => {
    try {
      // 1. RECUPERAÇÃO (READ): Buscamos os dados que foram salvos na tela de Cadastro
      const jsonValue = await AsyncStorage.getItem('@usuario_data');
      
      // 2. PARSING: Convertemos a string JSON de volta para um objeto JavaScript
      // Usamos uma verificação simples: se não houver valor, retorna null
      const dadosCadastrados = jsonValue != null ? JSON.parse(jsonValue) : null;

      // 3. VALIDAÇÃO DE EXISTÊNCIA: Verifica se existe algum usuário no "banco"
      if (dadosCadastrados) {
        
        // 4. LÓGICA DE COMPARAÇÃO:
        // Comparamos o input atual com os dados recuperados do armazenamento
        if (email === dadosCadastrados.email && senha === dadosCadastrados.senha) {
          
          // NAVEGAÇÃO DE SUBSTITUIÇÃO:
          // .replace('Main') encerra a pilha de login e inicia a de abas.
          // Isso impede que o usuário volte ao Login clicando no botão "Voltar" do Android.
          navigation.replace('Main');
          
        } else {
          Alert.alert('Erro', 'E-mail ou senha não conferem com o cadastro!');
        }
      } else {
        // Caso o AsyncStorage retorne nulo (primeiro acesso do app)
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Vá em "Cadastre-se".');
      }
    } catch (e) {
      // Tratamento de erros de leitura de hardware ou corrupção de dados
      Alert.alert('Erro', 'Falha ao ler os dados de autenticação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SenaiMarket</Text>
      
      {/* Campo de E-mail: Desativamos a capitalização para evitar erros de login */}
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Campo de Senha: Oculta o texto digitado */}
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Navegação Simples: Adiciona a tela de Cadastro no topo da pilha atual */}
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}