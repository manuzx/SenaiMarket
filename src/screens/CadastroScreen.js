import React, { useState } from 'react';
// Importamos os componentes nativos para construir a interface (UI)
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
// O AsyncStorage funciona como um Banco de Dados local (Chave-Valor)
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({ navigation }) {
  // HOOKS DE ESTADO (useState): 
  // Criamos variáveis para armazenar o que o usuário digita em tempo real.
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');

  // Lógica de Negócio: Função assíncrona (async) para salvar os dados
  const handleCadastro = async () => {
    
    // VALIDAÇÃO: Verifica se os campos obrigatórios estão vazios antes de prosseguir
    if (usuario === '' || email === '' || senha === '') {
      Alert.alert('Aviso', 'Nome, E-mail e Senha são obrigatórios!');
    } else {
      try {
        // MODELAGEM DOS DADOS: Criamos um objeto literal com as informações
        const dadosUsuario = {
          usuario: usuario,
          email: email,
          senha: senha,
          status: status
        };

        // VALIDAÇÃO DE CAMPO OPCIONAL: 
        // Se o usuário não preencher a Bio, atribuímos um valor default.
        if (status === '') {
          dadosUsuario.status = "Estudante de ADS";
        }

        // SERIALIZAÇÃO E PERSISTÊNCIA:
        // AsyncStorage só aceita String. JSON.stringify converte o Objeto em Texto.
        await AsyncStorage.setItem('@usuario_data', JSON.stringify(dadosUsuario));

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        
        // NAVEGAÇÃO: .goBack() remove a tela atual da pilha e volta para o Login
        navigation.goBack(); 
      } catch (error) {
        // TRATAMENTO DE ERRO: Bloco catch captura falhas na escrita do arquivo
        Alert.alert('Erro', 'Erro ao salvar os dados no dispositivo.');
      }
    }
  };

  return (
    // ScrollView: Permite a rolagem da tela caso o teclado cubra os campos
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SenaiMarket</Text>
      <Text style={styles.subtitle}>Crie sua conta profissional</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome de Usuário</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Emmanoel Silva" 
          value={usuario} 
          onChangeText={setUsuario} // Atualiza o estado 'usuario' a cada tecla
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="seu@email.com" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" // UX: Abre teclado com '@' visível
          autoCapitalize="none" // Evita que a primeira letra seja maiúscula no e-mail
        />

        <Text style={styles.label}>Status / Bio</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Buscando estágio" 
          value={status} 
          onChangeText={setStatus} 
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput 
          style={styles.input} 
          placeholder="No mínimo 6 caracteres" 
          value={senha} 
          onChangeText={setSenha} 
          secureTextEntry // UX: Oculta os caracteres por segurança
        />

        {/* TouchableOpacity: Botão customizável com feedback visual de clique */}
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
        </TouchableOpacity>

        {/* Link para navegação de retorno */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
          <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}