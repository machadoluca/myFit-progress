import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginUser } from '../components/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      console.log(data);

      if (data && data.token) {
        console.log('Token recebido:', data.token);
        navigation.navigate('HomeTab');
      } else {
        console.error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {' '}
        Fit<Text style={styles.orangeText}>App</Text>
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail:</Text>
        <View style={styles.inputIconContainer}>
          <Icon name="user" size={20} color="white" style={styles.icon} />
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <Text style={styles.inputLabel}>Senha:</Text>
        <View style={styles.inputIconContainer}>
          <Icon name="lock" size={20} color="white" style={styles.icon} />
          <TextInput
            placeholder="**********"
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordToggle}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterNavigation}>
        <Text style={styles.registerText}>
          É novo(a)?{' '}
          <Text style={styles.registerLink}>Registre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  orangeText: {
    color: 'orange',
  },
  inputContainer: {
    width: '80%',
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  input: {
    color: 'white',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5,
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    color: 'white',
    marginTop: 10,
  },
  registerLink: {
    color: 'orange',
    textDecorationLine: 'underline',
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 2, 
  },
});
