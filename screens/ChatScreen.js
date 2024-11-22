import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ChatScreen({ route }) {
  const { name } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá, como posso te ajudar?', sender: 'motorista' },
    { id: '2', text: 'Qual o horário disponível?', sender: 'estudante' },
  ]);
  const [messageText, setMessageText] = useState('');

  const sendMessage = () => {
    if (!messageText.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), text: messageText, sender: 'estudante' },
    ]);
    setMessageText('');

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: 'Vou verificar e já te respondo!', sender: 'motorista' },
      ]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'estudante' ? styles.studentBubble : styles.driverBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.chatTitle}>{name}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  chatTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  messageList: { flex: 1, paddingHorizontal: 10 },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '70%' },
  studentBubble: { backgroundColor: '#d1e7ff', alignSelf: 'flex-end' },
  driverBubble: { backgroundColor: '#e6ffe6', alignSelf: 'flex-start' },
  messageText: { fontSize: 14 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, backgroundColor: '#f9f9f9', borderRadius: 5, paddingHorizontal: 10 },
  sendButton: { padding: 10, backgroundColor: '#000', borderRadius: 5, marginLeft: 10 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});

