import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  const handleAddExercise = () => {
    navigation.navigate('Exercise');
  };

  useEffect(() => {
    setCurrentMonth(
      format(selectedDate, 'MMMM yyyy', { locale: ptBR }).charAt(0).toUpperCase() +
        format(selectedDate, 'MMMM yyyy', { locale: ptBR }).slice(1).toLowerCase()
    );
  }, [selectedDate]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    if (currentDayOfWeek === 0) {
      const updatedDaysOfWeek = [];
      const startDate = addDays(currentDate, -currentDate.getDay());
      for (let i = 0; i < 7; i++) {
        updatedDaysOfWeek.push(addDays(startDate, i));
      }
      setDaysOfWeek(updatedDaysOfWeek);
    } else {
      const updatedDaysOfWeek = [];
      const startDate = addDays(currentDate, -currentDayOfWeek + 1);
      for (let i = 0; i < 7; i++) {
        updatedDaysOfWeek.push(addDays(startDate, i));
      }
      setDaysOfWeek(updatedDaysOfWeek);
    }
  }, []);

  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header, { bottom: screenHeight * 0.1 }]}>
        <Text style={styles.title}>Bem Vindo!</Text>
        <Text style={styles.subtitle}>Hoje é dia de Treino!</Text>
        <View style={styles.dateContainerWrapper}>
          <Text style={styles.currentMonth}>{currentMonth}</Text>
          <View style={styles.dateContainer}>
            {daysOfWeek.map((date, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dayButton}
                  onPress={() => handleDayPress(date)}
                >
                  <Text style={styles.dayText}>
                    {format(date, 'EEE', { locale: ptBR }).charAt(0).toUpperCase() +
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
        </View>
      </SafeAreaView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Icon name="plus-circle" size={20} color="white" style={styles.plusIcon} />
        <Text style={styles.addButtonText}>Adicionar Exercício</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    color: 'white',
  },
  dateContainerWrapper: {
    backgroundColor: 'orange',
    paddingVertical: 20,
    marginTop: 20,
  },
  currentMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
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
    borderColor: '#00BFFF',
    backgroundColor: '#00BFFF',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
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
    marginTop: '50%',
  },
  plusIcon: {
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
