import React from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.containerform, {marginBottom: 50} ]}
      >
        <Text style={styles.nomeempresa}><Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes</Text>
        <Text style={styles.textDesc}>Cadastre-se para conseguir os melhores fretes para seu caminhão</Text>
        <Text style={styles.textlabel}>Nome Completo</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>Email</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>Senha</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>CPF</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>Sexo</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>Telefone</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <Text style={styles.textlabel}>Cidade Residencial</Text>
        <TextInput selectionColor={'#FF7A00'} style={styles.input}></TextInput>
        <TouchableOpacity style={styles.botaologin}><Text style={styles.textobotao}>PROXIMO</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textDesc: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  nomeempresa: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerform: {
    width: '75%',
    justifyContent: 'center',
  },
  textlabel: {
    paddingBottom: 10,
    fontSize: 15,
  },
  input: {
    textAlign: 'center',
    height: 30,
    marginBottom: 30,
    backgroundColor: '#D9D9D9',
  },
  botaologin: {
    height: 40,
    width: 120,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '79%',
    transform: [{ translateX: -60}],
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,

  },


});


