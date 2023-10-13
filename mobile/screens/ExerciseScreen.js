import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, SafeAreaView, Image } from 'react-native';
import exercisesByCategory from '../components/exercises';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExerciseScreen = () => {
  const navigation = useNavigation();
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
        exercise.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    const allExercises = Object.values(exercisesByCategory).flat();
    return allExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleExerciseSelection = (exerciseName) => {
    if (selectedExercises.includes(exerciseName)) {
      setSelectedExercises(selectedExercises.filter((ex) => ex !== exerciseName));
    } else {
      setSelectedExercises([...selectedExercises, exerciseName]);
    }
  };

  const handleSaveExercise = () => {
    // Implementar a lógica para salvar todos os exercícios selecionados no backend.
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSpace} />

      <View style={styles.searchInputContainer}>
        <Icon name="search" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar exercício..."
          onChangeText={handleSearch}
          value={searchText}
          placeholderTextColor="white"
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity
              key={exercise.name}
              onPress={() => handleExerciseSelection(exercise.name)}
              style={[
                styles.exerciseItem,
                selectedExercises.includes(exercise.name) && styles.selectedExercise,
              ]}
            >
              <Image
                source={exercise.image}
                style={styles.exerciseImage}
              />
              <Text style={styles.exerciseName}>{exercise.name}</Text>
            </TouchableOpacity>
          ))}
          <View style={{ marginBottom: 50 }} />
        </View>
      </ScrollView>

      {selectedExercises.length > 0 && (
        <View style={styles.saveButtonContainer}>
          <Button title="Salvar" onPress={handleSaveExercise} color="orange" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  headerSpace: {
    height: 80,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  selectedCategoryContainer: {
    backgroundColor: 'orange',
    borderColor: 'orange',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  selectedExercise: {
    borderColor: 'orange',
    borderBottomWidth: 2,
  },
  exerciseImage: {
    width: 45,
    height: 55,
    marginRight: 10,
    borderRadius: 2,
  },
  exerciseName: {
    flex: 1, 
    fontSize: 18,
    color: 'white',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
});

export default ExerciseScreen;
