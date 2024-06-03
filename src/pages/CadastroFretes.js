import React, { useEffect, useState } from 'react';
import { View, StatusBar, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, addDoc, getDoc, collection } from 'firebase/firestore';
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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);




export function CadastroFretes({ navigation }) {
    const initialFreteState = {
        origem: "",
        destino: "",
        veiculo: "",
        carroceria: "",
        produto: "",
        distancia: "",
        peso: "",
        obs: "",
        pagamento: "",
      };

    const [frete, setFrete] = useState(initialFreteState);  
    const [user, setUser] = useState(null);
    const [userimg, setUserimg] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        loadUserData();
    }, []);


    const handleInputChange = (name, value) => {
        setFrete(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleAddFrete = async () =>
        {
               try {
                await addDoc(collection(db, 'fretes'), frete);
                Alert.alert('Frete cadastrado com sucesso');
                navigation.navigate('ListaFretes')
              } catch (error) {
                console.error('Erro no cadastro ', error);
                Alert.alert('Erro ao Adicionar Frete, tente mais tarde!');
              }
            
        }




    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ListaFretes')}>
                            <Image source={require('../assets/imagens/voltar.png')} style={styles.voltar} />
                        </TouchableOpacity>

                        <Text style={styles.mobyheader}> Cadastrar Fretes</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <View>
                            <Image
                                source={{ uri: userimg }}
                                style={styles.imagemPerfil}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.conteudo}>
                    <View style={styles.info}>
                        <Image
                            source={require('../assets/imagens/iconecadastrarfretes.png')}
                            style={styles.iconcadastrarfretes}
                        />
                        <View>
                            <Text style={styles.infoconteudo}>Abaixo Preencha as</Text>
                            <Text style={styles.infoconteudo}>informações necessárias</Text>
                            <Text style={styles.infoconteudo}>referente a sua carga</Text>
                        </View>
                    </View>
                    <View style={styles.forms}>
                    <Text style={styles.textLabel}>Origem</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.origem}
                        onChangeText={(text) => handleInputChange('origem', text)}
                    />
                    <Text style={styles.textLabel}>Destino</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.destino}
                        onChangeText={(text) => handleInputChange('destino', text)}
                    />
                    <Text style={styles.textLabel}>Veiculo</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.veiculo}
                        onChangeText={(text) => handleInputChange('veiculo', text)}
                    />
                    <Text style={styles.textLabel}>Carroceria</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.carroceria}
                        onChangeText={(text) => handleInputChange('carroceria', text)}
                    />
                    </View>
                    <Text style={styles.textLabel}>Produto</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.produto}
                        onChangeText={(text) => handleInputChange('produto', text)}
                    />
                    <Text style={styles.textLabel}>Distância</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.distancia}
                        onChangeText={(text) => handleInputChange('distancia', text)}
                    />
                    <Text style={styles.textLabel}>Peso da Carga</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.peso}
                        onChangeText={(text) => handleInputChange('peso', text)}
                    />
                    <Text style={styles.textLabel}>Obs</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.obs}
                        onChangeText={(text) => handleInputChange('obs', text)}
                    />
                    <Text style={styles.textLabel}>Pagamento</Text>
                    <TextInput
                        selectionColor={'#FF7A00'}
                        style={styles.input}
                        value={frete.pagamento}
                        onChangeText={(text) => handleInputChange('pagamento', text)}
                    />

                </View>
                <TouchableOpacity style={styles.botaoAdd} >
                    <Text style={styles.textoBotao} onPress={handleAddFrete}>ADICIONAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};

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
    conteudo: {
        height: 'auto',
        alignItems: 'center',
        width: '100%'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 30,
        gap: 10,
        alignItems: 'center',
    },
    iconcadastrarfretes: {
        width: 90,
        height: 90,
    },
    infoconteudo: {
        fontSize: 19,
    },
    forms: {
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