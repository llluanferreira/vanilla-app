import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default function EditStudentProfileScreen({ route, navigation }) {
    // Dados passados pela navegação
    const { student } = route.params;

    // Estados para edição
    const [name, setName] = useState(student.name);
    const [age, setAge] = useState(student.age.toString());
    const [matricula, setMatricula] = useState(student.matricula);
    const [email, setEmail] = useState(student.email);
    const [course, setCourse] = useState(student.course);

    // Função para salvar as informações
    const handleSave = () => {
        const updatedStudent = {
            name,
            age: parseInt(age, 10),
            matricula,
            email,
        };
        // Volta para a tela de perfil com os dados atualizados
        navigation.navigate('Profile', { updatedStudent });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Informações</Text>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Idade"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={matricula}
                onChangeText={setMatricula}
                placeholder="Matrícula"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setCourse}
                placeholder="Course"
                keyboardType="Course"/>

            

            {/* Botão para salvar as informações editadas */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Informações</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
