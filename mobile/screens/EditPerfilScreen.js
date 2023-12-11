import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../components/api'; 
import blankPhoto from '../assets/perfil.png';

const EditPerfilScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState(blankPhoto);

  const handleEscolherImagem = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'É preciso permissão para acessar a galeria de imagens.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
        setSelectedImage(result.assets[0]);

    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
    }
  };

  const handleSalvar = async () => {
    try {
      const imageToSend = typeof selectedImage === 'object' ? selectedImage.uri : selectedImage;

      await updateProfile(name, weight, imageToSend);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSpace} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.text}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSalvar}>
          <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>

        <TouchableOpacity onPress={handleEscolherImagem}>
          <Image source={selectedImage} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.text}>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.text}>Peso Corporal (kg):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            if (/^\d+$/.test(text) || text === '') {
              setWeight(text);
            }
          }}
          value={weight}
          keyboardType="numeric"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    padding: 20,
  },
  headerSpace: {
    height: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 30
  },
  profileInfo: {
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default EditPerfilScreen;
