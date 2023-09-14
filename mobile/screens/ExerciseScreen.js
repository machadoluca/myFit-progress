import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, SafeAreaView } from 'react-native';
import exercisesByCategory from '../components/exercises';

const ExerciseScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const filterExercises = () => {
    if (selectedCategory) {
      return exercisesByCategory[selectedCategory].filter((exercise) =>
        exercise.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const allExercises = Object.values(exercisesByCategory).flat();
    return allExercises.filter((exercise) =>
      exercise.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleExerciseSelection = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSaveExercise = () => {
    // Implementar a lógica para salvar todos os exercícios selecionados no backend.
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerSpace} />

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar exercício..."
          onChangeText={handleSearch}
          value={searchText}
        />

        <View style={styles.categoriesContainer}>
          {Object.keys(exercisesByCategory).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryContainer,
                selectedCategory === category && styles.selectedCategoryContainer,
              ]}
              onPress={() =>
                selectedCategory === category
                  ? clearCategoryFilter()
                  : filterByCategory(category)
              }
            >
              <Text
                style={[
                  styles.categoryTitle,
                  selectedCategory === category && styles.selectedCategoryTitle,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.exercisesContainer}>
          {filterExercises().map((exercise) => (
            <View key={exercise}>
              <TouchableOpacity
                onPress={() => handleExerciseSelection(exercise)}
                style={[
                  styles.exerciseItem,
                  selectedExercises.includes(exercise) && styles.selectedExercise,
                ]}
              >
                <Text>{exercise}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={{ marginBottom: 50 }} />
        </View>
      </ScrollView>
      {selectedExercises.length > 0 && (
        <View style={styles.saveButtonContainer}>
          <Button title="Salvar" onPress={handleSaveExercise} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSpace: {
    height: 50,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  selectedCategoryContainer: {
    backgroundColor: 'blue',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedCategoryTitle: {
    color: 'white',
  },
  exercisesContainer: {
    marginTop: 10,
  },
  exerciseItem: {
    fontSize: 18,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  selectedExercise: {
    backgroundColor: 'lightgreen',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
});

export default ExerciseScreen;




