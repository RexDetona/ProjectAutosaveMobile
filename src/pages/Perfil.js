import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, onSnapshot } from 'firebase/firestore';
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const initialUserState = {
  nome: "",
  cpf: "",
  sexo: "",
  telefone: "",
  estado: "",
  cidade: "",
  numCnh: "",
  categoriaCnh: "",
  dataEmissao: "",
  estadoExpedidor: "",
};

export function Perfil({ navigation }) {
  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const docRef = doc(db, "users", uid);
      const unsub = onSnapshot(docRef, async (docSnap) => {
        setLoading(true);
        try {
          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            throw new Error("Documento não encontrado");
          }
          const imageRef = ref(storage, `userimage/${uid}`);
          const downloadURL = await getDownloadURL(imageRef);
          setImage(downloadURL);
        } catch (err) {
          console.error("Erro ao carregar usuário ou imagem: ", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      });
      return () => unsub();
    }
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
      const response = await fetch(uri);
      const blob = await response.blob();
      const uid = auth.currentUser?.uid;
      if (uid) {
        const storageRef = ref(storage, `userimage/${uid}`);
        try {
          await uploadBytes(storageRef, blob);
          console.log('Upload feito com sucesso!');
        } catch (error) {
          console.error('Erro ao fazer upload do arquivo', error);
        }
      }
    }
  };

  const handleAltCadastro = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      try {
        await setDoc(doc(db, 'users', uid), user);
        Alert.alert('Perfil atualizado com sucesso');
      } catch (error) {
        console.error('Erro no cadastro ', error);
        Alert.alert('Erro ao cadastrar, tente mais tarde');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <Text style={styles.nomeEmpresa}>
          <Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes
        </Text>
        <Text style={{ textAlign: 'center' }}>O melhor e mais utilizado aplicativo de Fretes do Brasil</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  const handleChange = (field, value) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ListaFretes')}>
            <Image source={require('../assets/imagens/voltar.png')} style={styles.voltar} />
          </TouchableOpacity>
          <Text style={styles.mobyHeader}>  Perfil</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/imagens/configuracao.png')} style={styles.config} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
            <Image source={require('../assets/imagens/lupa.png')} style={styles.buscar} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <View style={{ position: 'relative', marginVertical: 15, alignItems: 'center' }}>
            <TouchableOpacity style={styles.perfil}>
              <Image source={{ uri: image }} style={styles.imagemPerfil} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePicker} style={styles.altFoto}>
              <Image source={require('../assets/imagens/camera.png')} style={styles.fotoIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.nome}>
            <Text style={styles.textoNome}>{user.nome}</Text>
          </View>
        </View>
        <View style={styles.dados}>
          {Object.keys(initialUserState).map((key) => (
            <View key={key} style={styles.inputContainer}>
              <Text style={styles.textLabel}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
              <TextInput
                style={styles.input}
                selectionColor="#FF7A00"
                value={user[key]}
                onChangeText={(value) => handleChange(key, value)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.botaoAtt} onPress={handleAltCadastro}>
            <Text style={styles.textoBotao}>ATUALIZAR</Text>
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
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeEmpresa: {
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
  mobyHeader: {
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
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagemPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    alignItems: 'center',
    width: '65%',
    height: 40,
    borderColor: '#2D3F57',
    borderBottomWidth: 3,
  },
  textoNome: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dados: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textLabel: {
    paddingBottom: 10,
    fontSize: 15,
    width: '65%',
  },
  input: {
    height: 40,
    marginBottom: 30,
    width: '65%',
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    borderRadius: 6,
  },
  botaoAtt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 170,
    backgroundColor: '#FF7A00',
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
});
