import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Alert, } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDbHoj6ITNs-4sxl79aMYMyahjOadBovmQ",
    authDomain: "mobby-fretes.firebaseapp.com",
    projectId: "mobby-fretes",
    storageBucket: "mobby-fretes.appspot.com",
    messagingSenderId: "306864195281",
    appId: "1:306864195281:web:9a346bcb2d2654b30a67f0",
    measurementId: "G-K2YBH5RB78"
  };



export function Login({ navigation }) {

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButtons, setDisableButtons] = useState(false); // Estado para desabilitar os botões
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const signOutCurrentUser = async () => {
      try {
        await signOut(auth);

      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

    signOutCurrentUser();

  
  });

  const handleLogin = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuário autenticado:', userCredential.user);
        navigation.replace('ListaFretes');
      })
      .catch((error) => {
        // Exibe um alerta com a mensagem de erro
        let errorMessage = 'Erro ao fazer login.';

        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado. Verifique o email digitado.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta. Verifique a senha digitada.';
            break;
          default:
            errorMessage = 'Erro ao fazer login. Tente novamente mais tarde.';
            break;
        }

        Alert.alert('Erro', errorMessage);
      });
  };

  // Funções para lidar com o teclado
  const handleKeyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardVisible(false);
  };

  // Efeito para adicionar ou remover os listeners do teclado
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
          type='email'
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Text style={styles.textlabel}>Senha</Text>
        <TextInput
          selectionColor={'#FF7A00'}
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.botaologin} onPress={handleLogin}>
          <Text style={styles.textobotao}>ENTRAR</Text>
        </TouchableOpacity>
        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
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
                style={[styles.botaofretes]}
                onPress={() => navigation.navigate('Cadastro')}
              >
                <Text style={styles.botfretestexto}>Procuro</Text>
                <Text style={styles.botfretestexto}>Fretes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botaocadastro]} onPress={() => navigation.navigate('CadastroEmpresa')}>
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

//estilos da página
const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#CCCCCC',
  },
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
  quickSignup: {
    textAlign: 'center',
    color: '#2D3F57',
    textDecorationLine: 'underline',
    marginTop: 10,
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

