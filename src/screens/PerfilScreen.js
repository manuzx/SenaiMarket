import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ navigation }) {
  // ESTADOS (States): Armazenam os dados do perfil e controlam o modo de edição
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [status, setStatus] = useState('');
  const [editando, setEditando] = useState(false); // Switch para alternar entre visualização e edição

  // 1. CARREGAMENTO (Read): Recupera o perfil salvo no dispositivo
  const carregarDados = async () => {
    const jsonValue = await AsyncStorage.getItem('@usuario_data');
    if (jsonValue !== null) {
      const dados = JSON.parse(jsonValue);
      setNomeUsuario(dados.usuario);
      setEmailUsuario(dados.email);
      // Fallback: Se não houver status, define um valor padrão
      if (dados.status) {
        setStatus(dados.status);
      } else {
        setStatus('Estudante SENAI');
      }
    }
  };

  // Ciclo de Vida: Executa a carga de dados assim que a tela é montada
  useEffect(() => {
    carregarDados();
  }, []);

  // 2. ATUALIZAÇÃO PARCIAL (Update): Altera apenas o campo 'status' no JSON original
  const salvarNovoStatus = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@usuario_data');
      if (jsonValue !== null) {
        let dados = JSON.parse(jsonValue);
        dados.status = status; // Atualiza apenas a propriedade status no objeto
        
        // Persiste o objeto completo novamente (Update)
        await AsyncStorage.setItem('@usuario_data', JSON.stringify(dados));
        setEditando(false); // Sai do modo de edição
        Keyboard.dismiss(); // UX: Fecha o teclado automaticamente
      }
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar.");
    }
  };

  // 3. LÓGICA DE TRATAMENTO DE STRING:
  // Gera o avatar dinamicamente pegando a primeira letra do nome.
  let letraAvatar = "U"; // Default caso o nome esteja vazio
  if (nomeUsuario !== '') {
    letraAvatar = nomeUsuario.substring(0, 1).toUpperCase();
  }

  // 4. RENDERIZAÇÃO DINÂMICA (Control Flow):
  // Em vez de ternários complexos no JSX, usamos uma variável auxiliar 'areaDeStatus'
  let areaDeStatus;

  if (editando === true) {
    // Caso esteja editando, renderiza o campo de input e o botão OK
    areaDeStatus = (
      <View style={styles.editRow}>
        <TextInput 
          style={styles.inputStatus} 
          value={status} 
          onChangeText={(texto) => setStatus(texto)} 
          autoFocus={true} // UX: Foca no campo assim que ele aparece
          placeholder="Digite seu status..."
        />
        <TouchableOpacity onPress={salvarNovoStatus} style={styles.saveBtn}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // Caso não esteja editando, mostra apenas o texto clicável
    areaDeStatus = (
      <TouchableOpacity style={styles.statusDisplay} onPress={() => setEditando(true)}>
        <Text style={styles.infoValue}>{status}</Text>
        <Text style={styles.editIcon}> ✎</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Avatar customizado com a lógica de string definida acima */}
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{letraAvatar}</Text>
        </View>
        <Text style={styles.userName}>{nomeUsuario}</Text>
        <Text style={styles.userEmail}>{emailUsuario}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Bio / Status:</Text>
        {/* Injeção da variável de controle de UI */}
        {areaDeStatus}
      </View>

      {/* LOGOUT: Usa o .replace para limpar a pilha e garantir que o usuário saia do app */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.replace('Login')} 
      >
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}