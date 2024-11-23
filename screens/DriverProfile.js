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
}