import React, { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';

export function Perfil({ navigation }) {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.header}>
      <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => navigation.navigate('ListaFretes')}><Image source={require('../assets/imagens/voltar.png')} style={styles.voltar}/></TouchableOpacity>
        <Text style={styles.mobyheader}>  Menu</Text>
        </View>
        <View style={{flexDirection:'row'}}>
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
    <View style={{width: '100%'}}>
    <View style={{position:'relative', marginVertical: 15, alignItems: 'center'}}>
    <TouchableOpacity style={styles.perfil}>
            <Image
                source={require('../assets/imagens/perfil.png')}
                style={styles.imagemPerfil}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.altFoto}>
            <Image
                source={require('../assets/imagens/camera.png')}
                style={styles.fotoIcon}
            />
        </TouchableOpacity>   
    </View>
    <View style={styles.nome}>
      <Text style={styles.textoNome}>Romeu</Text>
      <TouchableOpacity style={styles.altNome}>
            <Image
                source={require('../assets/imagens/lapis.png')}
                style={styles.lapisIcon}
            />
        </TouchableOpacity> 
    </View>
    </View>
    <View style={styles.dados}>
    <Text style={styles.textlabel}>CPF</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Sexo</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Telefone</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Estado</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Cidade</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Número do CNH</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Categoria do CNH</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Data de Emissão</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <Text style={styles.textlabel}>Estado Expedidor</Text>
        <TextInput style={styles.input} selectionColor={'#FF7A00'}></TextInput>
        <TouchableOpacity style={styles.botaoatt}>
          <Text style={styles.textobotao}>ATUALIZAR</Text>
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
  borderRadius: 15,
},
imagemPerfil: {
  width: 150,
  height: 150,
  borderRadius: 15,
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
}
});
