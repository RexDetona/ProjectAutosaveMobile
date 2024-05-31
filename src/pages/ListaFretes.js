import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from 'firebase/storage'

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
    const [userimg, setUserimg] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [expandedCards, setExpandedCards] = useState([false, false]);
  
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const userf = auth.currentUser;
          const uid = userf.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUser(docSnap.data());
            const imageRef = ref(storage, `userimage/${uid}`);
            const downloadURL = await getDownloadURL(imageRef);
            setUserimg(downloadURL);
          } else {
            console.error("Documento não encontrado");
            setError("Documento não encontrado");
          }
        } catch (err) {
          console.error("Erro ao carregar usuário: ", err);
          setError(err.message);
        }
      };
  
      loadUserData();
    }, []);
  
    const toggleFilter = (filter) => {
      setSelectedFilters(prevFilters => {
        if (prevFilters.includes(filter)) {
          return prevFilters.filter(item => item !== filter);
        } else {
          return [...prevFilters, filter];
        }
      });
    };
  
    const toggleCardExpansion = (index) => {
      setExpandedCards(prevExpanded => {
        const newExpanded = [...prevExpanded];
        newExpanded[index] = !newExpanded[index];
        return newExpanded;
      });
    };
  
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.header}>
            <Text style={styles.mobyheader}>Mooby Fretes</Text>
            <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
              <Image
                source={{uri: userimg}}
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
            <TextInput selectionColor={'#FF7A00'} style={styles.input} placeholder='Pesquise aqui'></TextInput>
            <View style={styles.containerfiltro}>
              <TouchableOpacity style={styles.botaofiltro} onPress={() => setModalVisible(true)}>
                <Text>Filtros <Image source={require('../assets/imagens/filtro.png')} style={styles.imagemfiltro} /></Text>
              </TouchableOpacity>
            </View>
            <Text>Foram encontrados 3 fretes.</Text>
  
            {[0, 1,].map((index) => (
              <TouchableOpacity key={index} style={[styles.cardfrete, expandedCards[index] && styles.expandedCard]} onPress={() => toggleCardExpansion(index)}>
                <View>
                  <Image source={require('../assets/imagens/cardimg1.png')} style={styles.imgcard} />
                  <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}>Lançado a 2 horas.</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>De: Campinas SP</Text>
                  <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>Para: Niterói RJ</Text>
  
                  {expandedCards[index] && (
                    <View style={styles.cardexp}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Veiculo</Text>
                      <Text style={{ fontSize: 11 }}>Fiorino, VLC, 4/4, Toco</Text>
                    </View>
                  )}
                </View>
                <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>R$ 4.500</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          {/* Modal de Filtros */}
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
        height: 100,
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
    sair:{
        color: '#fff',
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontWeight: 'bold'
    },
    conteudo: {
        height: 900,
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
        borderRadius: 10,
        marginBottom: 30,
    },
    imagemfiltro: {
        width: 20,
        height: 20,
    },
    cardfrete: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: 115,
        backgroundColor: '#E1E1F7',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'space-around',
        marginTop: 15,
    },
    imgcard: {
        width: 100,
        height: 60,
        borderRadius: 5,
    },
    cardbotao: {
        backgroundColor: '#FF7A00',
        width: 90,
        height: 23,
        borderRadius: 5,
    },
    cardbottext: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#2D3F57',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        width: 150,
        alignItems: 'center',
    },
    filterButtonSelected: {
        backgroundColor: '#FF7A00',
    },
    filterButtonClose: {
        backgroundColor: '#FF0000',
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    expandedCard: {
        height: 300, // Altura maior para o card expandido
    },
    conteudo: {
        height: 900,
        width: '100%',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
    },
    cardexp: {
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
    },
    barra: {
        height: 20,
        width: '90%',
        backgroundColor: '#fff'
    }
});