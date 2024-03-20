import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

export function Login({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleKeyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ height: 50 }}></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.containerform, { marginBottom: 50 }]}
      >
        <Text style={styles.nomeempresa}>
          <Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes
        </Text>
        <Text style={styles.textlabel}>Email</Text>
        <TextInput
          selectionColor={'#FF7A00'}
          style={styles.input}
        ></TextInput>
        <Text style={styles.textlabel}>Senha</Text>
        <TextInput
          selectionColor={'#FF7A00'}
          style={styles.input}
        ></TextInput>
        <TouchableOpacity style={styles.botaologin}>
          <Text style={styles.textobotao}>ENTRAR</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View>
        {!keyboardVisible && (
          <>
            <Text style={{ textAlign: 'center', fontSize: 15 }}>
              Não possui conta?
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 15 }}>Cadastre-se</Text>
          </>
        )}
        <View style={styles.botoesinf}>
          {!keyboardVisible && (
            <>
              <TouchableOpacity
                style={styles.botaofretes}
                onPress={() => navigation.navigate('Cadastro')}
              >
                <Text style={styles.botfretestexto}>Procuro</Text>
                <Text style={styles.botfretestexto}>Fretes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaocadastro}>
                <Text style={styles.botfretestexto}>Cadastrar</Text>
                <Text style={styles.botfretestexto}>Fretes</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nomeempresa: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 70,
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
    height: 50,
    marginBottom: 30,
    backgroundColor: '#D9D9D9',
  },
  botaologin: {
    height: 48,
    width: 120,
    backgroundColor: '#2D3F57',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50%',
    transform: [{ translateX: -60 }],
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,
  },
  botoesinf: {
    display: 'flex',
    flexDirection: 'row',
    margin: 30,
    gap: 20,
  },
  botaofretes: {
    height: 60,
    width: 140,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botfretestexto: {
    color: '#fff',
    fontSize: 15,
  },
  botaocadastro: {
    height: 60,
    width: 140,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
