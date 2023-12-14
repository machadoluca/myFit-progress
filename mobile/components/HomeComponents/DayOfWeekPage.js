import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getScheduleByDayOfWeek } from '../api';

const DayOfWeekPage = ({ dayOfWeek, handleAddExercise }) => {
  const [scheduleExercises, setScheduleExercises] = useState([]);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const exercises = await getScheduleByDayOfWeek(dayOfWeek);
        setScheduleExercises(exercises);
      } catch (error) {
        console.error('Erro ao buscar agenda de exercícios:', error);
      }
    }

    fetchSchedule();
  }, [dayOfWeek]);

  
    return (
      <SafeAreaView style={styles.dayOfWeekContainer}>
                
        {dayOfWeek === 1 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton}onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}
  
        {dayOfWeek === 2 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>
            </TouchableOpacity>
            
          </ScrollView>
        )}

        {dayOfWeek === 3 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton}onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 4 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 5 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 6 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 0 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {scheduleExercises && scheduleExercises.map((exercise, index) => (
            <View key={index}>
              <Text>{exercise.name}</Text>
            </View>
          ))}
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

      </SafeAreaView>
    );
  };
const styles = StyleSheet.create({

  dayOfWeekContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  dayOfWeekText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },   
  addButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  plusIcon: {
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DayOfWeekPage