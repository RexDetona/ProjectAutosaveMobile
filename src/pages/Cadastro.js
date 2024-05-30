import React, { useRef } from 'react';
import { useState } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbHoj6ITNs-4sxl79aMYMyahjOadBovmQ",
  authDomain: "mobby-fretes.firebaseapp.com",
  projectId: "mobby-fretes",
  storageBucket: "mobby-fretes.appspot.com",
  messagingSenderId: "306864195281",
  appId: "1:306864195281:web:9a346bcb2d2654b30a67f0",
  measurementId: "G-K2YBH5RB78"
};




export function Cadastro({ navigation }) {
  const nomeInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const telefoneInputRef = useRef(null);
  const cidadeInputRef = useRef(null);
  const scrollViewRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [telefon, setTelefon] = useState('');
  const [city, setCity] = useState('')



  const handleInputFocus = (inputRef) => {
    inputRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current.scrollTo({ y: pageY, animated: true });
    });
  };

  const handleCadastro = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        telefon: telefon,
        city: city,
      });
  
      console.log('Usuário autenticado:', user);
      Alert.alert('Usuário cadastrado!');
      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = 'Erro ao Cadastrar.';
  
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Erro',
          'O email já está em uso. Por favor, tente com outro email.'
        );
      } else {
        Alert.alert('Erro', 'Erro ao criar conta. Tente novamente mais tarde.');
      }
  
      Alert.alert('Erro', errorMessage);
    }

  };

  



  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerform}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajuste o valor conforme necessário
        >
          <Text style={styles.nomeempresa}><Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes</Text>
          <Text style={styles.textDesc}>Cadastre-se para conseguir os melhores fretes para seu caminhão</Text>
          <Text style={styles.textlabel}>Nome</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(nomeInputRef)}
            onChangeText={setName}
            ref={nomeInputRef}
          />
          <Text style={styles.textlabel}>Email</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(emailInputRef)}
            onChangeText={(email) => setEmail(email)}
            ref={emailInputRef}
          />
          <Text style={styles.textlabel}>Senha</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            secureTextEntry = {true}
            onFocus={() => handleInputFocus(passwordInputRef)}
            onChangeText={(password) => setPassword(password)}
            ref={passwordInputRef}
          />
          <Text style={styles.textlabel}>Telefone</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(telefoneInputRef)}
            onChangeText={(telefon) => setTelefon(telefon)}
            ref={telefoneInputRef}
          />
          <Text style={styles.textlabel}>Cidade Residencial</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(cidadeInputRef)}
            onChangeText={(city) => setCity(city)}
            ref={cidadeInputRef}
          />
          <TouchableOpacity onPress={handleCadastro} style={styles.botaologin}><Text style={styles.textobotao}>PROXIMO</Text></TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textDesc: {
    textAlign: 'center',
    paddingVertical: 18,
    color: '#666',
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
    transform: [{ translateX: -60 }],
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,
  },
});
