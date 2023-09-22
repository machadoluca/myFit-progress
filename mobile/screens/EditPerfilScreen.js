import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const EditPerfilScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  // Adicionar estados para outras medidas

  const handleSalvar = () => {
    // Logica para salvar o perfil
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSpace} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSalvar}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/perfil.png')}
          style={styles.profileImage}
        />
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
        />
        <Text>Peso Corporal (kg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === '') {
              setPeso(text);
            }
          }}
          value={peso}
          keyboardType="numeric" 
        />
        {/* Adicionar campos para outras medidas */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerSpace: {
    height: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default EditPerfilScreen;
