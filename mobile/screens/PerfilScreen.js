import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSpace} />
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text>Nome: Wesley Gonçalves</Text>
      <Text>Email: wesley@example.com</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PerfilScreen;
