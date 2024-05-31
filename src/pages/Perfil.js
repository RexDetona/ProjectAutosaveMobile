import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbHoj6ITNs-4sxl79aMYMyahjOadBovmQ",
  authDomain: "mobby-fretes.firebaseapp.com",
  projectId: "mobby-fretes",
  storageBucket: "mobby-fretes.appspot.com",
  messagingSenderId: "306864195281",
  appId: "1:306864195281:web:9a346bcb2d2654b30a67f0",
  measurementId: "G-K2YBH5RB78"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app, "gs://mobby-fretes.appspot.com");



export function Perfil({ navigation }) {
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [numCnh, setNumCnh] = useState("");
  const [categoriaCnh, setCategoriaCnh] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [estadoExpedidor, setEstadoExpedidor] = useState("");
  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");

  const userf = auth.currentUser
  const uid = userf.uid


  useEffect(() => {
    const docRef = doc(db, "users", uid);
    const unsub = onSnapshot(docRef, async (docSnap) =>  {
      setLoading(true);
      try {
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("Documento não encontrado")
          setError("Documento não encontrado")
        }
        try {
          const imageRef = ref(storage, `userimage/${uid}`);
          const downloadURL = await getDownloadURL(imageRef);
          setImage(downloadURL);
        } catch (err) {
          console.error("Erro ao obter URL da imagem: ", err);
        }
      } catch (err) {
        console.error("Erro ao carregar usuário: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
    return() => unsub();
  }, [uid]);


  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditin0g: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `userimage/${uid}`);
      try {
        await uploadBytes(storageRef, blob);
        console.log('Upload feito com sucesso!');
      } catch (error) {
        console.log('Erro ao fazer upload do arquivo', error);
      }
    }
  };

  const handleAltCadastro = async () => {
    try{
    await setDoc(doc(db, 'users', user.uid), {
      nome: user,
      cpf: cpf,
      sexo: sexo,
      telefone: telefone,
      estado: estado,
      cidade: cidade,
      numCnh: numCnh,
      categoriaCnh: categoriaCnh,
      dataEmissao: dataEmissao,
      estadoExpedidor: estadoExpedidor
    });
    console.log('Documento alterado com sucesso');
    Alert.alert('Perfil atualizado com sucesso');
    navigation.navigate('Perfil');
  }catch (error){
    console.log('Erro no cadastro ', error)
    Alert.alert('Erro ao cadastrar, tente mais tarde');
  }
  
  
  }



  if (loading) {
    return (
      <View style={[styles.containerloading]}>
        <Text style={styles.nomeempresa}>
          <Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes
        </Text>
        <Text style={{ textAlign: 'center' }}>O melhor e mais utilizado aplicativo de Fretes do Brasil</Text>
      </View>
    )
  }
  if (error) {
    return (
      <Text>Erro: {error}</Text>
    )
  }

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
            <Text style={styles.textoNome}>{user.nome}</Text>
          </View>
        </View>
        <View style={styles.dados}>
        <Text style={styles.textlabel}>Nome Completo</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.nome} onChangeText={setUser}></TextInput>
          <Text style={styles.textlabel}>CPF</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.cpf} onChangeText={setCpf}></TextInput>
          <Text style={styles.textlabel}>Sexo</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.sexo} onChangeText={setSexo}></TextInput>
          <Text style={styles.textlabel}>Telefone</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.telefone} onChangeText={setTelefone}></TextInput>
          <Text style={styles.textlabel}>Estado</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.estado} onChangeText={setEstado}></TextInput>
          <Text style={styles.textlabel}>Cidade</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.cidade} onChangeText={setCidade}></TextInput>
          <Text style={styles.textlabel}>Número do CNH</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.numCnh} onChangeText={setNumCnh}></TextInput>
          <Text style={styles.textlabel}>Categoria do CNH</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.categoriaCnh} onChangeText={setCategoriaCnh}></TextInput>
          <Text style={styles.textlabel}>Data de Emissão</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.dataEmissao} onChangeText={setDataEmissao}></TextInput>
          <Text style={styles.textlabel}>Estado Expedidor</Text>
          <TextInput style={styles.input} selectionColor={'#FF7A00'} value={user.estadoExpedidor} onChangeText={setEstadoExpedidor}></TextInput>
          <TouchableOpacity style={styles.botaoatt}>
            <Text style={styles.textobotao} onPress={handleAltCadastro}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerloading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  nomeempresa: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginRight: 25,
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
    borderRadius: 150 / 2,
  },
  imagemPerfil: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
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
  textoEmail: {
    marginTop: 10,
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
    width: '65%',
  },
  input: {
    textAlign: 'center',
    height: 30,
    marginBottom: 30,
    width: '65%',
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
    alignItems: 'center',
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
