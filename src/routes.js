import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './pages/Login'
import { Cadastro } from '../components/Cadastro'
import { ScreenStack } from 'react-native-screens';

const Stack = createNativeStackNavigator();

export function Routes(){
    <NavigationContainer>
    <Tab.Navigator>
        <Stack.Screen/>
    </Tab.Navigator>
    </NavigationContainer>
}