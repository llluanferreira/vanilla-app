import React, { useEffect, useState } from "react";
import{
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
}from 'react-native'
import { getFirestore,doc,getDoc,updateDoc } from "firebase/firestore";
import {auth} from '../firebaseConfig';
import { Avatar } from "react-native-gifted-chat";

export default function DriverProfile({navigation}){
    const [driverData, setDriverdata] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchDriverData = async () => {
        try{
            const userId = auth.currentUSer?.uid;
            if(!userId){
                alert("Erro: usuário não identificado!");
                navigation.navigate("DriverDashboard");
                return;
            }
            const db = getFirestore();
            const docRef = doc(db, "drivers", userId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setDriverdata(docSnap.data());
            }else{
                alert("Dados do motorista não encontrados");
            }
            setIsLoading(false);
        } catch (error){
            console.error("Erro ao buscar dados do motorista:", error);
            setIsLoading(false);
        }
    };

    useEffect(()=> {
        fetchDriverData();
    },[]);

    const handleSave = async () => {
        try {
            const userId = auth.currentUSer?.uid;
            const db = getFirestore();
            const docRef = doc(db, "drivers", userId);

            await updateDoc (docRef, driverData);

            alert ("informações atualizada com sucesso");

        } catch (error) {
            console.error ("erro ao salvar informações", error); 
            alert ("Erro ao salvar informações. Tente novamente");   
        }
    };


    if (isLoading){
        return (
            <view style = {styles.loadingContainer}>
                <text>Carregando...</text>
            </view>
        );
    }

    return (
        <ScrollView contentContainerStyle = {styles.container}>
            <text style = {styles.name}>{driverData.name|| "NOME_MOTORISTA"}</text>

            <text style = {styles.label}>TELEFONE:</text>
            <TextInput>
                style = {styles.input}
                value = {driverData.phone||''}
                onChangeText = {(text) => setDriverdata({...driverData, phone: text})}
            </TextInput>

            <text style = {styles.label}>CNPJ:</text>
            <TextInput>
                style = {styles.input}
                value = {driverData.cnpj||''}
                onChangeText = {(text) => setDriverdata({...driverData, cnpj: text})}
            </TextInput>

            <text style = {styles.label}>ORIGEM:</text>
            <TextInput>
                style = {styles.input}
                value = {driverData.route?.departure||''}
                onChangeText = {(text) =>
                    setDriverdata({
                        ...driverData, 
                        route:{...driverData, departure: text},
                    })
                }
            </TextInput>
            <text style = {styles.label}>DESTINO:</text>
            <TextInput>
                style = {styles.input}
                value = {driverData.route?.destination||''}
                onChangeText = {(text) =>
                    setDriverdata({
                        ...driverData, 
                        route:{...driverData, destination: text},
                    })
                }
            </TextInput>

            <TouchableOpacity style = {styles.saveButtom} onPress={handleSave}>
                <text style = {styles.saveButtomText}>Salvar informações</text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 20, 
        backgroundColor: '#f5f5f5'
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
