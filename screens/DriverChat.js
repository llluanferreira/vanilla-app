import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

export default function DriverChat({ navigation }) {
    const [messages, setMessages] = useState([
        { id: '1', sender: 'estudante', text: 'Boa noite, tenho interesse no serviço!', time: '19:21' },
        { id: '2', sender: 'motorista', text: 'Boa noite! Qual seria o destino?', time: '19:23' },
        { id: '3', sender: 'estudante', text: 'UNISALES -> Campo Grande - Cariacica', time: '19:25' },
        { id: '4', sender: 'motorista', text: 'Para essa rota, deixo os passageiros no local próximo ao *.', time: '19:28' },
        { id: '5', sender: 'estudante', text: 'Pode ser. Irei solicitar o serviço!', time: '19:30' },
        { id: '6', sender: 'motorista', text: 'Ok!', time: '19:32' },
        { id: '7', sender: 'estudante', text: 'Comprovante_picxpay_plx_14092024080805.pdf', time: '19:40' },
        { id: '8', sender: 'motorista', text: 'Sua solicitação de serviço foi aceita!', time: '19:42' },
        { id: '9', sender: 'estudante', text: 'Obrigado!', time: '19:50' },
        { id: '10', sender: 'motorista', text: 'Partida em 10 minutos! Vá até o local de saída.', time: '21:00' },
    ]);
    

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === 'motorista' ? styles.motorista : styles.estudante,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                style={styles.chatList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
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
        padding: 15,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chatList: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    motorista: {
        alignSelf: 'flex-end',
        backgroundColor: '#d4f8d4',
    },
    estudante: {
        alignSelf: 'flex-start',
        backgroundColor: '#eaeaea',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sendButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
