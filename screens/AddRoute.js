import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default function AddRoute({ route, navigation }) {
    const [departure, setDeparture] = useState('');
    const [reference, setReference] = useState('');
    const [destination, setDestination] = useState('');
    const [monthlyPrice, setMonthlyPrice] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const userId = route.params?.userId; // Recebe o UID

    useEffect(() => {
        if (!userId) {
            console.error("Erro: UID não foi passado para AddRoute.");
            alert("Erro: UID não encontrado. Redirecionando...");
            navigation.navigate("DriverDashboard");
        }
    }, []);

    const handleSave = async () => {
        if (!departure || !destination || !monthlyPrice || !dailyPrice) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            console.log("Salvando rota para o motorista com UID:", userId);

            const docRef = doc(db, "drivers", userId);

            // Verifica se o documento já existe
            const docSnap = await getDoc(docRef);

            const newRoute = {
                departure,
                reference,
                destination,
                monthlyPrice,
                dailyPrice,
            };

            if (!docSnap.exists()) {
                // Cria um novo documento se não existir
                await setDoc(docRef, { routes: [newRoute] });
                console.log("Novo documento criado com a rota:", newRoute);
            } else {
                // Atualiza o documento existente
                await updateDoc(docRef, {
                    routes: arrayUnion(newRoute),
                });
                console.log("Rota adicionada ao documento existente:", newRoute);
            }

            alert("Rota adicionada com sucesso!");
            navigation.navigate("DriverDashboard", { userId });
        } catch (error) {
            console.error("Erro ao salvar rota:", error.message);
            alert("Erro ao salvar rota. Tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Rota</Text>

            <TextInput
                style={styles.input}
                value={departure}
                onChangeText={setDeparture}
                placeholder="Local de Partida"
            />
            <TextInput
                style={styles.input}
                value={reference}
                onChangeText={setReference}
                placeholder="Ponto de Referência"
            />
            <TextInput
                style={styles.input}
                value={destination}
                onChangeText={setDestination}
                placeholder="Destino"
            />
            <TextInput
                style={styles.input}
                value={monthlyPrice}
                onChangeText={setMonthlyPrice}
                placeholder="Preço Mensal"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={dailyPrice}
                onChangeText={setDailyPrice}
                placeholder="Preço Diário"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
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
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
