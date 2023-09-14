import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Switch} from 'react-native';
import { registerUser } from '../components/api';
import {Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTrainer, setIsTrainer] = useState(false);
  const [cpf, setCpf] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [formacao, setFormacao] = useState('');
  const [anosExperiencia, setAnosExperiencia] = useState('');

  const handleRegister = async () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSpace} />
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.rowContainer}>
        <Switch value={isTrainer} onValueChange={setIsTrainer} />
        <Text>Personal Trainer</Text>
      </View>
      {isTrainer && (
        <View style={styles.trainerContainer}>
          <TextInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            style={styles.inputTrainer}
            keyboardType="numeric"
          />
          <View style={styles.pickerContainer}>
            <Text>Escolaridade:</Text>
            <Picker
              selectedValue={escolaridade}
              onValueChange={setEscolaridade}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Ensino Fundamental Completo" value="Ensino Fundamental Completo" />
              <Picker.Item label="Ensino Fundamental Incompleto" value="Ensino Fundamental Incompleto" />
              <Picker.Item label="Ensino Médio Completo" value="Ensino Médio Completo" />
              <Picker.Item label="Ensino Médio Incompleto" value="Ensino Médio Incompleto" />
              <Picker.Item label="Ensino Superior Completo" value="Ensino Superior Completo" />
              <Picker.Item label="Ensino Superior Incompleto" value="Ensino Superior Incompleto" />
              </Picker>
          </View>
          <TextInput
            placeholder="Formação"
            value={formacao}
            onChangeText={setFormacao}
            style={styles.inputTrainer}
          />
          <TextInput
            placeholder="Anos de Experiência"
            value={anosExperiencia}
            onChangeText={setAnosExperiencia}
            style={styles.inputTrainer}
            keyboardType="numeric"
          />
        </View>
      )}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpace: {
    height: 50,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%'
  },
  trainerContainer: {
    marginBottom: 20,
    width: '80%'
  },
  inputTrainer: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  picker: {
    flex: 1,
    height: 40,
  },
});