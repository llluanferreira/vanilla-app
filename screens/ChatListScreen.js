import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function ChatListScreen({ navigation }) {
  // Simulando dados para o chat
  const chats = [
    {
      id: '1',
      name: 'Lucas Ribeiro',
      status: '2 novas mensagens',
      time: '1h',
     // avatar: require('../assets/user1.png'),
    },
    {
      id: '2',
      name: 'Fábio Fagundes',
      status: '1 nova mensagem',
      time: '1h',
      //avatar: require('../assets/user2.png'),
    },
    {
      id: '3',
      name: 'Cléber Rangel',
      status: 'Enviado',
      time: '1h',
     // avatar: require('../assets/user3.png'), 
    },
    {
      id: '4',
      name: 'Estevão Fernandes',
      status: 'Enviado',
      time: '5h',
      //avatar: require('../assets/user4.png'), 
    },
  ];

  const renderChat = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => navigation.navigate('Chat', { name: item.name })}
    >
      {/* Avatar */}
      <Image source={item.avatar} style={styles.avatar} />
      {/* Informações do Chat */}
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatStatus}>{item.status}</Text>
      </View>
      {/* Hora */}
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bate-papo</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        style={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatStatus: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
  },
});