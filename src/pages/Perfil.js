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
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.perfil}>
            <Image
                source={require('../assets/imagens/perfil.png')}
                style={styles.imagemPerfil}
            />
        </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  alignItems: 'center',

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
});
