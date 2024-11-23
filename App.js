import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import TripsScreen from './screens/TripsScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import EditStudentProfileScreen from './screens/EditStudentProfileScreen';
import DriverDashboard from './screens/DriverDashboard';
import AddRoute from './screens/AddRoute';
import DriverChat from './screens/DriverChat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Trips" component={TripsScreen} options={{ title: 'Escolha sua Rota' }} />
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Bate-papo' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat com Motorista' }} />
        <Stack.Screen name="Profile" component={StudentProfileScreen} options={{ title: 'Perfil do Estudante' }} />
        <Stack.Screen name="EditProfile" component={EditStudentProfileScreen} options={{ title: 'Editar Perfil' }} />
        <Stack.Screen name="DriverDashboard" component={DriverDashboard} options={{ title: 'Dashboard do Motorista' }} />
        <Stack.Screen name="AddRoute" component={AddRoute} options={{ title: 'Adicionar Rota' }} />
        <Stack.Screen name="DriverChat" component={DriverChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
