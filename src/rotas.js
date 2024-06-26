import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Cadastro2 } from './pages/Cadastro_2';
import { Cadastro3 } from './pages/Cadastro_3';
import { ListaFretes } from './pages/ListaFretes';
import { Perfil } from './pages/Perfil';
import { CadastroFretes } from './pages/CadastroFretes';
import { CadastroEmpresa } from './pages/CadastroEmpresa';

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Cadastro2" component={Cadastro2} />
        <Stack.Screen name="Cadastro3" component={Cadastro3} />
        <Stack.Screen name="ListaFretes" component={ListaFretes} />
        <Stack.Screen name="CadastroFretes" component={CadastroFretes} />
        <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
