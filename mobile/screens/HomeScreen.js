import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import '../components/CalendarPT-BR';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setExerciseModalVisible(true);
  };

  const formatSelectedDate = () => {
    if (selectedDate) {
      const dateParts = selectedDate.split('-');
      return `${dateParts[2]}/${dateParts[1]}`;
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onDayPress={handleDayPress} />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isExerciseModalVisible}
        onRequestClose={() => setExerciseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setExerciseModalVisible(false)}
              style={styles.closeButton}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Exercise')}
              style={styles.addButton}
            >
              <Text>Adicionar Exercícios</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>
            Exercícios para {formatSelectedDate()}
          </Text>
          {/*futura exibição de exercícios */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendarContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
  addButton: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
});

export default HomeScreen;