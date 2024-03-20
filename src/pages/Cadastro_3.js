import React, { useRef, useState } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export function Cadastro3({ navigation }) {
  const bitremInputRef = useRef(null);
  const rastreadorInputRef = useRef(null);
  const nomeCompletoInputRef = useRef(null);
  const categoriaCnhInputRef = useRef(null);
  const codCnhInputRef = useRef(null);
  const dataEmissaoInputRef = useRef(null);
  const estadoExpeditorInputRef = useRef(null);
  const placaVeiculoInputRef = useRef(null);
  const tipoRntrcInputRef = useRef(null);
  const numRntrcInputRef = useRef(null);
  const scrollViewRef = useRef();

  const [bitrem, setBitrem] = useState(null);
  const [rastreador, setRastreador] = useState(null);

  const handleInputFocus = (inputRef) => {
    inputRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current.scrollTo({ y: pageY + height, animated: true }); // Adicione a altura do componente ao deslocamento
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
          <Text style={styles.textlabel}>Nome Completo</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(nomeCompletoInputRef)}
            ref={nomeCompletoInputRef}
          />
          <Text style={styles.textlabel}>Categoria CNH</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(categoriaCnhInputRef)}
            ref={categoriaCnhInputRef}
          />
          <Text style={styles.textlabel}>Cod CNH</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(codCnhInputRef)}
            ref={codCnhInputRef}
          />
          <Text style={styles.textlabel}>Data de Emissão</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(dataEmissaoInputRef)}
            ref={dataEmissaoInputRef}
          />
          <Text style={styles.textlabel}>Estado Expeditor</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(estadoExpeditorInputRef)}
            ref={estadoExpeditorInputRef}
          />
          <Text style={styles.textlabel}>Placa do veiculo</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(placaVeiculoInputRef)}
            ref={placaVeiculoInputRef}
          />
          <Text style={styles.textlabel}>Tipo RNTRC</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(tipoRntrcInputRef)}
            ref={tipoRntrcInputRef}
          />
          <Text style={styles.textlabel}>Num RNTRC</Text>
          <TextInput
            selectionColor={'#FF7A00'}
            style={styles.input}
            onFocus={() => handleInputFocus(numRntrcInputRef)}
            ref={numRntrcInputRef}
          />
          <Text style={styles.textlabel}>Bitrem</Text>
          <TouchableOpacity
            style={[styles.toggleButton, bitrem === 'Sim' && styles.toggleButtonSelected]}
            onPress={() => setBitrem('Sim')}
          >
            <Text style={[styles.toggleButtonText, bitrem === 'Sim' && styles.toggleButtonTextSelected]}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, bitrem === 'Não' && styles.toggleButtonSelected]}
            onPress={() => setBitrem('Não')}
          >
            <Text style={[styles.toggleButtonText, bitrem === 'Não' && styles.toggleButtonTextSelected]}>Não</Text>
          </TouchableOpacity>
          <Text style={styles.textlabel}>Possui Rastreador</Text>
          <TouchableOpacity
            style={[styles.toggleButton, rastreador === 'Sim' && styles.toggleButtonSelected]}
            onPress={() => setRastreador('Sim')}
          >
            <Text style={[styles.toggleButtonText, rastreador === 'Sim' && styles.toggleButtonTextSelected]}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, rastreador === 'Não' && styles.toggleButtonSelected]}
            onPress={() => setRastreador('Não')}
          >
            <Text style={[styles.toggleButtonText, rastreador === 'Não' && styles.toggleButtonTextSelected]}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ListaFretes')} style={styles.botaologin}><Text style={styles.textobotao}>PROXIMO</Text></TouchableOpacity>
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
    paddingBottom: 100, // Ajuste conforme necessário
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
  toggleButton: {
    borderWidth: 1,
    borderColor: '#FF7A00',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  toggleButtonSelected: {
    backgroundColor: '#FF7A00',
  },
  toggleButtonText: {
    color: '#FF7A00',
  },
  toggleButtonTextSelected: {
    color: '#fff',
  },
  botaologin: {
    position: 'absolute',
    bottom: 20,
    right: -1,
    height: 40,
    width: 120,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textobotao: {
    color: '#fff',
    fontSize: 20,
  },
});
