import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data atual
  const [daysOfWeek, setDaysOfWeek] = useState([]); // Lista de dias do mês

  // Função para lidar com a seleção de um dia
  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  const handleAddExercise = () => {
    navigation.navigate('Exercise');
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // Dia da semana atual (0 = Domingo, 1 = Segunda, ...)

    // Se o dia atual for domingo (0), atualize a lista de dias da semana
    if (currentDayOfWeek === 0) {
      const updatedDaysOfWeek = [];
      const startDate = addDays(currentDate, -currentDate.getDay()); // Dia atual da semana
      for (let i = 0; i < 7; i++) {
        updatedDaysOfWeek.push(addDays(startDate, i));
      }
      setDaysOfWeek(updatedDaysOfWeek);
    } else {
      const updatedDaysOfWeek = [];
      const startDate = addDays(currentDate, -currentDayOfWeek + 1); // Primeiro dia da semana
      for (let i = 0; i < 7; i++) {
        updatedDaysOfWeek.push(addDays(startDate, i));
      }
      setDaysOfWeek(updatedDaysOfWeek);
    }
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.subtitle}>Hoje é dia de Treino!</Text>
        <View style={styles.dateContainer}>
          {daysOfWeek.map((date, index) => {
            return (
              <TouchableOpacity
              key={index}
              style={styles.dayButton}
              onPress={() => handleDayPress(date)}
              >
                <Text style={styles.dayText}>
                  {format(date, 'EEE', { locale: ptBR }).slice(0, 1).toUpperCase() +
                    format(date, 'EEE', { locale: ptBR }).slice(1, 3)}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    selectedDate.getDate() === date.getDate() && styles.selectedDayButton,
                  ]}
                  >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>+ Adicionar Exercício</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAEBD7',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFE4C4',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  dayButton: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  todayButton: {
    borderColor: 'blue',
  },
  selectedDayButton: {
    borderColor: 'lightgreen',
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addButton: {
    marginTop: '100%',
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'green',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
