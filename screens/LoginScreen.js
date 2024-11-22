import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBBmyirUScyWqobNKyKvpbbKEUVSEcEUE4",
    authDomain: "vanilla-app-unisales.firebaseapp.com",
    projectId: "vanilla-app-unisales",
    storageBucket: "vanilla-app-unisales.firebasestorage.app",
    messagingSenderId: "398090863209",
    appId: "1:398090863209:web:105e3df9f120faa82f98f8",
    measurementId: "G-L6RFBYH1R6"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student'); // 'student' ou 'driver'

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Redirecionar com base no tipo de usuário
            if (userType === 'student') {
                navigation.navigate('Trips'); // Tela do estudante
            } else {
                navigation.navigate('DriverDashboard'); // Tela do motorista
            }
        } catch (error) {
            alert("Erro ao fazer login: " + error.message);
        }
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            alert("Preencha os campos de e-mail e senha.");
            return;
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
    
            await setDoc(doc(db, "drivers", userId), {
                email: email,
                userType: "driver", // Ajuste para "student" se for estudante
                routes: [], // Inicializa com um array vazio
            });
    
            alert("Conta criada com sucesso!");
            navigation.navigate("DriverDashboard", { userId });
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            alert("Erro ao criar conta. Tente novamente.");
        }
    };
    
    

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Por favor, insira seu e-mail para redefinir a senha.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("E-mail de redefinição de senha enviado!");
        } catch (error) {
            alert("Erro ao redefinir a senha: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Ícone e Nome do App */}
            <Image
                source={require('../assets/logovanilla.png')} // Atualize para o caminho correto
                style={styles.logo}
            />
            <Text style={styles.title}>VANILLA</Text>

            {/* Campos de Entrada */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Seleção de Tipo de Usuário */}
            <View style={styles.userTypeContainer}>
                <TouchableOpacity
                    style={[
                        styles.userTypeButton,
                        userType === 'student' && styles.selectedButton,
                    ]}
                    onPress={() => setUserType('student')}
                >
                    <Text style={styles.userTypeText}>Estudante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.userTypeButton,
                        userType === 'driver' && styles.selectedButton,
                    ]}
                    onPress={() => setUserType('driver')}
                >
                    <Text style={styles.userTypeText}>Motorista</Text>
                </TouchableOpacity>
            </View>

            {/* Botão de Login */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Links Extras */}
            <View style={styles.extraLinks}>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.link}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.link}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    userTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    userTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    selectedButton: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    userTypeText: {
        color: '#fff',
    },
    loginButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    extraLinks: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        width: '80%',
    },
    link: {
        color: '#007BFF',
        fontSize: 14,
    },
});
