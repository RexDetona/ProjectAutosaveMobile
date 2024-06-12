import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from 'firebase/storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import { set } from 'firebase/database';

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
const storage = getStorage(app);
const db = getFirestore(app);

export function ListaFretes({ navigation }) {
  const [user, setUser] = useState(null);
  const [fretes, setFretes] = useState([]);
  const [userimg, setUserimg] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("")
  const [searchParam] = useState(["origem", "destino", "veiculo", "carroceria", "produto", "obs", "pagamento"])
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState([false, false]);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      const userf = auth.currentUser;
      const uid = userf.uid;
      try {
        const imageRef = ref(storage, `userimage/${uid}`);
        const downloadURL = await getDownloadURL(imageRef);
        setUserimg(downloadURL);
      } catch (error) {
        console.log("Erro ao carregar: ", error)
      }
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("Documento não encontrado");
          setError("Documento não encontrado");
        }
      } catch (err) {
        console.error("Erro ao carregar usuário: ", err);
        setError(err.message);
      }
      try {
        const querySnapshot = await getDocs(collection(db, "fretes"));
        const fretesList = [];
        querySnapshot.forEach((doc) => {
          fretesList.push({ id: doc.id, ...doc.data() });
        });
        setFretes(fretesList)

      } catch (err) {
        console.log('Erro ao carregar documentos')
      }
      setLoading(false);
    };
    loadUserData();
  }, []);


  const toggleCardExpansion = (id) => {
    setExpandedCards((prevExpandedCards) => ({
      ...prevExpandedCards,
      [id]: !prevExpandedCards[id]
    }));
  };

  const reloadData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fretes"));
      const fretesList = [];
      querySnapshot.forEach((doc) => {
        fretesList.push({ id: doc.id, ...doc.data() });
      });
      setFretes(fretesList)
    } catch (err) {
      console.log('Falha ao recarregar! ', err)
    }
  }


function busca(fretes){
   return fretes.filter((item) => {
    return searchParam.some((newItem) => {
      return (item[newItem].toString()?.toLowerCase()?.indexOf(search.toLowerCase()) > -1)})
  })
}

  if (loading) {
    return (
      <View style={styles.containerloading}>
        <Text style={styles.nomeempresa}>
          <Text style={{ color: '#FF7A00' }}>Mooby</Text> Fretes
        </Text>
        <Text style={{ textAlign: 'center' }}>O melhor e mais utilizado aplicativo de Fretes do Brasil</Text>
      </View>
    );
  }
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.mobyheader}>Mooby Fretes</Text>
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
              <Image
                source={{ uri: userimg }}
                style={styles.imagemPerfil}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Login')} >
              <Text style={styles.sair}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.conteudo}>
          <Text style={styles.tituloconteudo}><Text style={{ color: '#FF7A00' }}>Fretes</Text> Disponíveis</Text>
          <TextInput value={search} selectionColor={'#FF7A00'} onChangeText={(value) => setSearch(value)} style={styles.input} placeholder='Pesquise aqui'></TextInput>
          <View style={styles.containerfiltro}>
            <TouchableOpacity style={styles.botaofiltro} onPress={reloadData}>
              <Text>Recarregar</Text>
            </TouchableOpacity>
          </View>
          <Text>Foram encontrados {busca(fretes).length} fretes.</Text>



           {busca(fretes).map(item => (
            <TouchableOpacity key={item.id} style={[styles.botfrete, expandedCards[item.id] && styles.expandedCard]} onPress={() => toggleCardExpansion(item.id)}>
              <View style={styles.cardfrete}>
              <View>
                <Image source={require('../assets/imagens/cardimg1.png')} style={styles.imgcard} />
                <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}>Lançado a 2 horas.</Text>
              </View>
                <Text style={{ fontSize: 12, paddingBottom: 20, marginLeft: 10 }}>De: {item.origem}</Text>
                <Text style={{ fontSize: 12, paddingBottom: 20, marginLeft: 10 }}>Para: {item.destino}</Text>
                <View style={{alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Text style={{fontWeight: 'bold', fontSize: 20 }}>R$ {item.valor}</Text>
                </View>
                </View>
              
                {expandedCards[item.id] && (
                  <View style={styles.cardexp}>
                    <View>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Veiculo</Text>
                      <Text style={{ fontSize: 11 }}>{item.veiculo}</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Carroceria</Text>
                      <Text style={{ fontSize: 11 }}>{item.carroceria}</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Produto</Text>
                      <Text style={{ fontSize: 11 }}>{item.produto}</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>KM</Text>
                      <Text style={{ fontSize: 11 }}>{item.distancia} KM</Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}></Text>
                      <Text style={{ fontSize: 11 }}></Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Peso de carga</Text>
                      <Text style={{ fontSize: 11 }}>{item.peso} KG</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Obs</Text>
                      <Text style={{ fontSize: 11 }}>{item.obs}</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Pagamentos</Text>
                      <Text style={{ fontSize: 11 }}>{item.pagamento}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Lona</Text>
                      <Text style={{ fontSize: 11 }}>NÃO</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Pedágio</Text>
                      <Text style={{ fontSize: 11 }}>SIM</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Rastreamento</Text>
                      <Text style={{ fontSize: 11 }}>NÃO</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Agenciamento</Text>
                      <Text style={{ fontSize: 11 }}>NÃO</Text>
                    </View>
                  </View>
                )}
              

            </TouchableOpacity>
          ))}

        </View>
        <TouchableOpacity style={styles.botaoAdd} onPress={() => navigation.navigate('CadastroFretes')}>
          <Text style={styles.textoBotao}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
      </Modal>
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',


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
    height: 115,
    width: '100%',
    backgroundColor: '#2D3F57',
    borderBottomWidth: 10,
    borderColor: '#FF7A00',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  mobyheader: {
    height: '100%',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  imagemPerfil: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  sair: {
    color: '#fff',
    textAlign: 'center',
    padding: 0,
    margin: 0,
    fontWeight: 'bold'
  },
  conteudo: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  tituloconteudo: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
  input: {
    textAlign: 'center',
    height: 40,
    width: '90%',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#D9D9D9',
  },
  containerfiltro: {
    width: '90%',
    alignItems: 'flex-end',
  },
  botaofiltro: {
    backgroundColor: '#D9D9D9',
    width: 90,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  imagemfiltro: {
    width: 20,
    height: 20,
  },
  botfrete: {
 height: 115,
 backgroundColor: '#E1E1F7',
 marginTop: 15,
 borderRadius: 5,
 padding: 10,
 width: '90%',
  },
  cardfrete: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgcard: {
    width: 100,
    height: 60,
    borderRadius: 5,
  },
  expandedCard: {
    height: 'auto',
  },

  cardexp: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,

  },
  botaoAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 170,
    backgroundColor: '#FF7A00',
    marginVertical: 20,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
});