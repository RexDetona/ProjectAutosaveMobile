import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';

export function ListaFretes({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [expandedCards, setExpandedCards] = useState([false, false]); // Array de estado para controlar a expansão de cada card
    const toggleFilter = (filter) => {
        if (selectedFilters.includes(filter)) {
            setSelectedFilters(selectedFilters.filter(item => item !== filter));
        } else {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    const toggleCardExpansion = (index) => {
        const newExpandedCards = [...expandedCards];
        newExpandedCards[index] = !newExpandedCards[index];
        setExpandedCards(newExpandedCards);
    };

    return (
        <ScrollView>
            <View>
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    <View style={styles.header}>
                        <Text style={styles.mobyheader}>Mooby Fretes</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.perfil}>
                            <Image
                                source={require('../assets/imagens/perfil.png')}
                                style={styles.imagemPerfil}
                            />
                        </TouchableOpacity>
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

                        <View style={[styles.cardfrete, expandedCards[0] && styles.expandedCard]}>
                            <View>
                                <Image source={require('../assets/imagens/cardimg1.png')} style={styles.imgcard} />
                                <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}>Lançado a 2 horas.</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>De: Campinas SP</Text>
                                <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>Para: Niterói RJ</Text>

                                {/* Conteúdo expandido */}
                                {expandedCards[0] && (

                                    <View style={styles.cardexp}>
                                        <View>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold'}}>Veiculo</Text>
                                            <Text style={{ fontSize: 11 }}>Fiorino, VLC, 4/4, Toco</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Carroceria</Text>
                                            <Text style={{ fontSize: 11 }}>Baú, Sider</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Produto</Text>
                                            <Text style={{ fontSize: 11 }}>Fogões</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>KM</Text>
                                            <Text style={{ fontSize: 11 }}>437,2 km</Text>
                                        </View>
                                        <View>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}></Text>
                                            <Text style={{ fontSize: 11 }}></Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Peso de carga</Text>
                                            <Text style={{ fontSize: 11 }}>2 t</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Obs</Text>
                                            <Text style={{ fontSize: 11 }}>Entrega na Loja</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Pagamento</Text>
                                            <Text style={{ fontSize: 11 }}>PIX</Text>
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
                            </View>
                            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>R$ 4.500</Text>
                                <TouchableOpacity style={styles.cardbotao} onPress={() => toggleCardExpansion(0)}><Text style={styles.cardbottext}>VISUALIZAR</Text></TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.cardfrete, expandedCards[1] && styles.expandedCard]}>
                            <View>
                                <Image source={require('../assets/imagens/cardimg1.png')} style={styles.imgcard} />
                                <Text style={{ fontSize: 11, textAlign: 'center', marginTop: 5 }}>Lançado a 2 horas.</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>De: Campinas SP</Text>
                                <Text style={{ fontSize: 12, paddingBottom: 23, marginLeft: 10 }}>Para: Niterói RJ</Text>

                                {/* Conteúdo expandido */}
                                {expandedCards[1] && (
                                    <View style={{}}>
                                        <Text style={{ fontSize: 12, paddingTop: 30, marginLeft: -90, fontWeight: 'bold', }}>Veiculo</Text>
                                        <Text style={{ fontSize: 11, paddingTop: 5, marginLeft: -90, }}>Fiorino, VLC, 4/4, Toco</Text>

                                        {/* Continuar conteudo do card expandido. -Gustavo */}
                                    </View>

                                )}
                            </View>
                            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>R$ 4.500</Text>
                                <TouchableOpacity style={styles.cardbotao} onPress={() => toggleCardExpansion(1)}><Text style={styles.cardbottext}>VISUALIZAR</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Modal de Filtros */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Selecione os Filtros</Text>
                        {/* Botões de Filtro */}
                        <Pressable
                            style={[styles.filterButton, selectedFilters.includes('Valor') && styles.filterButtonSelected]}
                            onPress={() => toggleFilter('Valor')}
                        >
                            <Text style={styles.filterButtonText}>Valor</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, selectedFilters.includes('Empresa') && styles.filterButtonSelected]}
                            onPress={() => toggleFilter('Empresa')}
                        >
                            <Text style={styles.filterButtonText}>Empresa</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, selectedFilters.includes('Hora') && styles.filterButtonSelected]}
                            onPress={() => toggleFilter('Hora')}
                        >
                            <Text style={styles.filterButtonText}>Hora</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, selectedFilters.includes('Peso da Carga') && styles.filterButtonSelected]}
                            onPress={() => toggleFilter('Peso da Carga')}
                        >
                            <Text style={styles.filterButtonText}>Peso da Carga</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, selectedFilters.includes('Tipo de Carga') && styles.filterButtonSelected]}
                            onPress={() => toggleFilter('Tipo de Carga')}
                        >
                            <Text style={styles.filterButtonText}>Tipo de Carga</Text>
                        </Pressable>
                        {/* Botão de Fechar Modal */}
                        <Pressable
                            style={[styles.filterButton, styles.filterButtonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.filterButtonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
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
        borderRadius: 15,
    },
    perfiltexto: {
        color: 'white',
        fontSize: 20,
        fontWeight: '100',
    },
    perfil: {
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRadius: 10,
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