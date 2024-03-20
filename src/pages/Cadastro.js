import React, { useRef } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export function Cadastro({ navigation }) {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const cpfInputRef = useRef(null);
  const sexoInputRef = useRef(null);
  const telefoneInputRef = useRef(null);
  const cidadeInputRef = useRef(null);
  const scrollViewRef = useRef();

  const handleInputFocus = (inputRef) => {
    inputRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current.scrollTo({ y: pageY, animated: true });
    });
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
          <Text style={styles.textlabel}>Email</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(emailInputRef)}
            ref={emailInputRef}
          />
          <Text style={styles.textlabel}>Senha</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(passwordInputRef)}
            ref={passwordInputRef}
          />
          <Text style={styles.textlabel}>CPF</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(cpfInputRef)}
            ref={cpfInputRef}
          />
          <Text style={styles.textlabel}>Sexo</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(sexoInputRef)}
            ref={sexoInputRef}
          />
          <Text style={styles.textlabel}>Telefone</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(telefoneInputRef)}
            ref={telefoneInputRef}
          />
          <Text style={styles.textlabel}>Cidade Residencial</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(cidadeInputRef)}
            ref={cidadeInputRef}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro2')} style={styles.botaologin}><Text style={styles.textobotao}>PROXIMO</Text></TouchableOpacity>
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
    transform: [{ translateX: -60}],
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,
  },
});
