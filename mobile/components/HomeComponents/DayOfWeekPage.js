import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DayOfWeekPage = ({ dayOfWeek, handleAddExercise }) => {
  
    return (
      <SafeAreaView style={styles.dayOfWeekContainer}>
                
        {dayOfWeek === 1 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Segunda-feira</Text>

            <TouchableOpacity style={styles.addButton}onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}
  
        {dayOfWeek === 2 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Terça-feira</Text>
            {/* Aqui você pode inserir uma imagem aleatória */}
            <Image source={{ uri: 'https://i.pinimg.com/236x/73/9f/84/739f84b67cdd22dac888a3fc5c6192d1.jpg' }} style={{ width: 200, height: 200, marginVertical: 20, }} />

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>
            </TouchableOpacity>
            
          </ScrollView>
        )}

        {dayOfWeek === 3 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Quarta-feira</Text>

            <TouchableOpacity style={styles.addButton}onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 4 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Quinta-feira</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 5 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Sexta-feira</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 6 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Sabado</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(dayOfWeek)}>
              <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
              <Text style={styles.addButtonText}>Adicionar Exercício</Text>

            </TouchableOpacity>
          </ScrollView>
        )}

        {dayOfWeek === 0 && (
          <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.text}>Texto aleatório para Domingo</Text>

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