import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getExercisesFromServer, saveExercises} from '../components/api';

const ExerciseScreen = ({route}) => {
  const { dayOfWeek } = route.params;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [serverExercises, setServerExercises] = useState([]);

  const ExercisesFromServer = async () => {
    const exercises = await getExercisesFromServer();
    if (exercises) {
      setServerExercises(exercises);
    }
  };

  useEffect(() => {
    ExercisesFromServer();
  }, []);

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
      return serverExercises.filter((exercise) =>
        exercise.group === selectedCategory &&
        exercise.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return serverExercises.filter((exercise) =>
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

  const handleSaveExercise = async () => {
    try {
        const response = await saveExercises(selectedExercises, dayOfWeek);

  
        console.log('Exercícios salvos:', response);
  
        setSelectedExercises([]);
        console.log(selectedExercises)
  
        navigation.goBack();

    } catch (error) {
      console.error('Erro ao salvar exercícios:', error);
    }
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
          {Array.from(new Set(serverExercises.map(exercise => exercise.group))).map((group) => (
            <TouchableOpacity
              key={group}
              style={[
                styles.categoryContainer,
                selectedCategory === group && styles.selectedCategoryContainer,
              ]}
              onPress={() =>
                selectedCategory === group
                  ? clearCategoryFilter()
                  : filterByCategory(group)
              }
            >
              <Text
                style={[
                  styles.categoryTitle,
                  selectedCategory === group && styles.selectedCategoryTitle,
                ]}
              >
                {group}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.exercisesContainer}>
          {filterExercises().map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => handleExerciseSelection(exercise.name)}
              style={[
                styles.exerciseItem,
                selectedExercises.includes(exercise.name) && styles.selectedExercise,
              ]}
            >
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
