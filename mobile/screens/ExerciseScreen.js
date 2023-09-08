import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import exercisesByCategory from '../components/exercises';

const ExerciseScreen = () => {
  return (
    <View style={styles.container}>
      {Object.keys(exercisesByCategory).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {exercisesByCategory[category].map((exercise) => (
            <Text key={exercise} style={styles.exerciseItem}>
              {exercise}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exerciseItem: {
    fontSize: 18,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
  },
});

export default ExerciseScreen;