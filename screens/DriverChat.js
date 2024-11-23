import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DriverChat({ navigation }) {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Boa noite, tenho interesse no serviço!', sender: 'student', time: '19:21' },
        { id: '2', text: 'Boa noite! Qual seria o destino?', sender: 'driver', time: '19:23' },
        { id: '3', text: 'UNISALES -> Campo Grande - Cariacica', sender: 'student', time: '19:25' },
        { id: '4', text: 'Para essa rota, deixo os passageiros no local próximo ao *.', sender: 'driver', time: '19:28' },
        { id: '5', text: 'Pode ser. Irei solicitar o serviço!', sender: 'student', time: '19:30' },
    ]);

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.sender === 'driver' ? styles.driverMessage : styles.studentMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pedro Henrique</Text>
                <Ionicons name="person-circle" size={32} color="#000" />
            </View>

            {/* Chat Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                style={styles.chatArea}
            />

            {/* Input Area */}
            <View style={styles.inputArea}>
                <TextInput style={styles.input} placeholder="Digite sua mensagem..." />
                <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    chatArea: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    driverMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#d1f0d1',
    },
    studentMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e0e0e0',
    },
    messageText: {
        fontSize: 14,
        color: '#333',
    },
    messageTime: {
        fontSize: 10,
        color: '#666',
        textAlign: 'right',
        marginTop: 5,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});