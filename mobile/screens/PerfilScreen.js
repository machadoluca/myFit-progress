import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PerfilScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPerfil')}>
          <Text>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/perfil.png')}
          style={styles.profileImage}
        />
        <Text> Wesley Gonçalves </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 30
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
});

export default PerfilScreen;

