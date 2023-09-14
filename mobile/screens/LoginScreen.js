import React, { useState } from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import { loginUser } from '../components/api';
import { useNavigation } from '@react-navigation/native';
import {Button} from 'react-native-elements';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()

  const handleLogin = async () => {
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register')
  }

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
      <View style={styles.containerButton}>
        <Button  buttonStyle={{borderColor: "lightblue"}} raised type= "outline" titleStyle={{color: "black", fontWeight: 'bold'}} containerStyle={{marginHorizontal: 10}} title="Login" onPress={handleLogin} />
        <Button  title="Register" onPress={handleRegisterNavigation}/>
      </View>
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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  containerButton:{
    flexDirection: 'row',
  },
});
