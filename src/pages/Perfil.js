import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Importe getAuth

export function Perfil({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [numCnh, setNumCnh] = useState("");
  const [categoriaCnh, setCategoriaCnh] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [estadoExpedidor, setEstadoExpedidor] = useState("");
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Estado para armazenar o e-mail do usuário

  const firebaseConfig = {
    apiKey: "SuaApiKey",
    authDomain: "SeuAuthDomain",
    projectId: "SeuProjectId",
    storageBucket: "SeuStorageBucket",
    messagingSenderId: "SeuMessagingSenderId",
    appId: "SeuAppId",
    measurementId: "SuaMeasurementId"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app); // Obtenha a referência de autenticação

  // UseEffect para obter o e-mail do usuário atual quando o componente é montado
  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
      setName(auth.currentUser.email); // Defina o nome inicial como o e-mail do usuário
    }
  }, [auth.currentUser]);

  const handleConfirmName = () => {
    setName(newName);
    setVisible(false); // Oculta o campo de texto

    // Salvar no banco de dados
    saveDataToDatabase();
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveDataToDatabase = () => {
    // Obtém uma referência para o banco de dados
    const db = getDatabase();

    // Define o caminho no banco de dados onde os dados serão salvos
    const userRef = ref(db, `usuarios/${auth.currentUser.uid}`);

    // Define os dados a serem salvos
    const userData = {
      name,
      cpf,
      sexo,
      telefone,
      estado,
      cidade,
      numCnh,
      categoriaCnh,
      dataEmissao,
      estadoExpedidor,
      image, // Se desejar, salve a URL da imagem
    };

    // Salva os dados no banco de dados
    set(userRef, userData)
      .then(() => {
        console.log('Dados salvos com sucesso!');
        Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao salvar os dados:', error);
        Alert.alert('Erro', 'Erro ao salvar os dados. Tente novamente mais tarde.');
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaFretes')}><Image source={require('../assets/imagens/voltar.png')} style={styles.voltar} /></TouchableOpacity>
          <Text style={styles.mobyheader}>  Menu</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image
              source={require('../assets/imagens/configuracao.png')}
              style={styles.config}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image
              source={require('../assets/imagens/lupa.png')}
              style={styles.buscar}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <View style={{ position: 'relative', marginVertical: 15, alignItems: 'center' }}>
            <TouchableOpacity style={styles.perfil}>
              <Image
                source={{ uri: image }}
                style={styles.imagemPerfil}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePicker} style={styles.altFoto}>
              <Image
                source={require('../assets/imagens/camera.png')}
                style={styles.fotoIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nome}>
            <Text style={styles.textoNome}>{name}</Text> {/* Aqui exibimos o nome */}
            <Text style={styles.textoEmail}>{userEmail}</Text> {/* Aqui exibimos o e-mail */}
            <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.altNome}>
              <Image
                source={require('../assets/imagens/lapis.png')}
                style={styles.lapisIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dados}>
          <Text style={styles.textlabel}>CPF</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setCpf}></TextInput>
          <Text style={styles.textlabel}>Sexo</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setSexo}></TextInput>
          <Text style={styles.textlabel}>Telefone</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setTelefone}></TextInput>
          <Text style={styles.textlabel}>Estado</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setEstado}></TextInput>
          <Text style={styles.textlabel}>Cidade</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setCidade}></TextInput>
          <Text style={styles.textlabel}>Número do CNH</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setNumCnh}></TextInput>
          <Text style={styles.textlabel}>Categoria do CNH</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setCategoriaCnh}></TextInput>
          <Text style={styles.textlabel}>Data de Emissão</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setDataEmissao}></TextInput>
          <Text style={styles.textlabel}>Estado Expedidor</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} onChangeText={setEstadoExpedidor}></TextInput>
          <TouchableOpacity style={styles.botaoatt} onPress={saveDataToDatabase}>
            <Text style={styles.textobotao}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {
        visible ? (
          <View style={styles.viewFlu}>
            <TextInput style={styles.altInp} onChangeText={setNewName} placeholder='Digite aqui'></TextInput>,
            <TouchableOpacity onPress={handleConfirmName} style={styles.altNome}>
              <Image
                source={require('../assets/imagens/lapis.png')}
                style={styles.lapisIcon}
              />
            </TouchableOpacity>
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 15,
    height: 100,
    width: '100%',
    backgroundColor: '#2D3F57',
    borderBottomWidth: 10,
    borderColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobyheader: {
    height: '100%',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  config: {
    width: 30,
    height: 30,
    marginRight:25,
  },
  buscar: {
    width: 30,
    height: 30,
  },
  perfil: {
    display: 'flex',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 150/2,
  },
  imagemPerfil: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
  },
  altFoto: {
    position: 'absolute',
    left: '55%',
    top: '60%',
  },
  fotoIcon: {
    width: 65,
    height: 65,
  },
  nome: {
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '65%',
    height: 40,
    borderColor: '#2D3F57',
    borderBottomWidth: 3,
  },
  textoNome: {
    position: 'relative',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  altNome: {
    position: 'absolute',
    left: '90%',
  },
  lapisIcon: {
    width: 23,
    height: 23,
  },
  dados: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,
  },
  textlabel: {
    paddingBottom: 10,
    fontSize: 15,
    width:'65%',
  },
  input: {
    textAlign: 'center',
    height: 30,
    marginBottom: 30,
    width:'65%',
    backgroundColor: '#D9D9D9',
  },
  botaoatt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 170,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
  },
  textobotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
  viewFlu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  altInp: {
    display: 'flex',
    textAlign: 'center',
    width: '65%',
    height: 50,
    backgroundColor: '#fff',
  }
});
