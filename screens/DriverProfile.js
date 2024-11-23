import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function DriverProfile({ navigation }) {
    const [driverData, setDriverData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchDriverData = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                alert("Erro: usuário não identificado!");
                navigation.navigate("DriverDashboard");
                return;
            }

            const db = getFirestore();
            const docRef = doc(db, "drivers", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDriverData(docSnap.data());
            } else {
                alert("Dados do motorista não encontrados.");
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Erro ao buscar dados do motorista:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDriverData();
    }, []);

    const handleSave = async () => {
        try {
            const userId = auth.currentUser?.uid;
            const db = getFirestore();
            const docRef = doc(db, "drivers", userId);

            await updateDoc(docRef, driverData);

            alert("Informações atualizadas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar informações:", error);
            alert("Erro ao salvar informações. Tente novamente.");
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name}>{driverData.name || "Gabriel Gomes Rizzoli"}</Text>

            <Text style={styles.label}>TELEFONE:</Text>
            <TextInput
                style={styles.input}
                value={driverData.phone || ''}
                onChangeText={(text) => setDriverData({ ...driverData, phone: text })}
            />

            <Text style={styles.label}>E-MAIL:</Text>
            <TextInput
                style={styles.input}
                value={driverData.email || ''}
                onChangeText={(text) => setDriverData({ ...driverData, email: text })}
            />

            <Text style={styles.label}>CNPJ:</Text>
            <TextInput
                style={styles.input}
                value={driverData.cnpj || ''}
                onChangeText={(text) => setDriverData({ ...driverData, cnpj: text })}
            />

            
            <Text style={styles.subLabel}>ORIGEM:</Text>
            <TextInput
                style={styles.input}
                value={driverData.route?.departure || ''}
                onChangeText={(text) =>
                    setDriverData({
                        ...driverData,
                        route: { ...driverData.route, departure: text },
                    })
                }
            />
            <Text style={styles.subLabel}>DESTINO:</Text>
            <TextInput
                style={styles.input}
                value={driverData.route?.destination || ''}
                onChangeText={(text) =>
                    setDriverData({
                        ...driverData,
                        route: { ...driverData.route, destination: text },
                    })
                }
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Informações</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    subLabel: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
