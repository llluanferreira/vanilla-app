import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function DriverDashboard({ navigation }) {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid; // Obtém o UID do motorista logado

    useEffect(() => {
        const fetchRoutes = async () => {
            if (!userId) {
                console.error("Erro: UID não encontrado no DriverDashboard.");
                return;
            }

            const docRef = doc(db, "drivers", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setRoutes(data.routes || []);
            } else {
                console.log("Nenhum documento encontrado para o UID:", userId);
            }
            setLoading(false);
        };

        fetchRoutes();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, Motorista!</Text>

            {loading ? (
                <Text>Carregando...</Text>
            ) : routes.length === 0 ? (
                <Text style={styles.infoText}>
                    Você ainda não adicionou nenhuma rota. Clique abaixo para adicionar.
                </Text>
            ) : (
                <FlatList
                    data={routes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.routeCard}>
                            <Text style={styles.routeInfo}>Partida: {item.departure}</Text>
                            <Text style={styles.routeInfo}>Referência: {item.reference}</Text>
                            <Text style={styles.routeInfo}>Destino: {item.destination}</Text>
                            <Text style={styles.routeInfo}>Preço Mensal: {item.monthlyPrice}</Text>
                            <Text style={styles.routeInfo}>Preço Diário: {item.dailyPrice}</Text>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddRoute", { userId })}
            >
                <Text style={styles.addButtonText}>Adicionar Nova Rota</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    infoText: { fontSize: 16, color: '#666', textAlign: 'center' },
    routeCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    routeInfo: { fontSize: 16, color: '#333', marginBottom: 5 },
    addButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
