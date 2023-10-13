import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBusinesTimer from 'react-native-vector-icons/FontAwesome5';
import IconBusines from 'react-native-vector-icons/MaterialIcons';
import IconDocument from 'react-native-vector-icons/Entypo';


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [cpf, setCpf] = useState('');
  const [formacao, setFormacao] = useState('');
  const [professionTime, setProfessionTime] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    // Lógica de registro aqui
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Registre-
        <Text style={styles.orangeText}>se</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Insira seu Nome"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={16} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Insira seu Email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Insira sua Senha"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordToggle}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {isProfessional && (
        <>
          <View style={styles.inputContainer}>
            <IconDocument name="text-document" size={20} color="white" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu CPF"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>
          <View style={styles.inputContainer}>
            <IconBusines name="business-center" size={20} color="white" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Insira Formação"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formacao}
              onChangeText={setFormacao}
            />
          </View>
          <View style={styles.inputContainer}>
            <IconBusinesTimer name="business-time" size={16} color="white" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Insira seu tempo como profissional"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={professionTime}
              onChangeText={setProfessionTime}
            />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsProfessional(!isProfessional)}>
        <Text style={styles.isProfessionalText}>
          É profissional? {' '}
          <Text style={styles.ProfessionalLink}>Clique aqui</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: 'orange',
    marginBottom: 50,
  },
  orangeText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    position: 'relative',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
  },
  registerButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  isProfessionalText: {
    color: 'white',
    marginTop: 10,
  },
  ProfessionalLink: {
    color: 'orange',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
