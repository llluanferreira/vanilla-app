import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TripsScreen({ navigation }) {
  // Lista de motoristas
  const drivers = [
    { id: '1', name: 'Lucas Ribeiro', priceMonthly: 200, priceDaily: 30 },
    { id: '2', name: 'Fábio Fagundes', priceMonthly: 300, priceDaily: 35 },
  ];

  // Renderiza os cartões de motoristas
  const renderDriver = ({ item }) => (
    <View style={styles.driverCard}>
      <Text style={styles.driverName}>{item.name}</Text>
      <Text style={styles.driverInfo}>
        A partir de R$ {item.priceMonthly},00 mensais ou R$ {item.priceDaily},00 diários
      </Text>
      <TouchableOpacity
        style={styles.interactButton}
        onPress={() => navigation.navigate('Chat', { name: item.name })}
      >
        <Text style={styles.interactButtonText}>Interagir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Selecione a rota desejada</Text>

      {/* Campos de Local de Partida e Destino */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Local de partida"
          placeholderTextColor="#aaa"
          value="UNISALES - Centro Universitário"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Para onde?"
          placeholderTextColor="#aaa"
          value="Campo Grande - Cariacica"
          editable={false}
        />
      </View>

      {/* Lista de Motoristas */}
      <Text style={styles.subTitle}>Motoristas disponíveis</Text>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        renderItem={renderDriver}
        style={styles.driverList}
      />

      {/* Barra de Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Trips')}>
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text style={styles.navBarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
          <Ionicons name="chatbox-outline" size={24} color="#333" />
          <Text style={styles.navBarText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.navBarText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  driverList: {
    flex: 1,
    marginTop: 10,
  },
  driverCard: {
    backgroundColor: '#e6ffe6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  driverInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  interactButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  interactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});
