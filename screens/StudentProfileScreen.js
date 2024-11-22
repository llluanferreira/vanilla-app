import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function StudentProfileScreen({ route, navigation }) {
    const initialStudent = {
      name: 'Pedro Henrique Gomes',
      age: 17,
      matricula: '20230001',
      course: 'Analise e Desenvolvimento de Sistemas',
      email: 'pedro.henriquegomes@gmail.com',
      //photo: require('../assets/profile.png'),
    };
  
    // Recebe os dados atualizados
    const updatedStudent = route.params?.updatedStudent;
    const student = updatedStudent || initialStudent;
  
    return (
      <View style={styles.container}>
        <Image source={student.photo} style={styles.profileImage} />
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.info}>Idade: {student.age} anos</Text>
        <Text style={styles.info}>Matrícula: {student.matricula}</Text>
        <Text style={styles.info}>Curso: {student.course}</Text>
        <Text style={styles.info}>Email: {student.email}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile', { student })}
        >
          <Text style={styles.editButtonText}>Editar Informações</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
