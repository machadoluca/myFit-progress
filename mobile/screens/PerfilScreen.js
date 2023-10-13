import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { format, addMonths, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PerfilScreen = ({ navigation }) => {

  const currentDate = new Date();

  const months = [];
  for (let i = 0; i < 6; i++) {
    const month = addMonths(currentDate, i);
    const formattedMonth = format(month, 'MMM', { locale: ptBR });
    months.push(formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1).toLowerCase());
  }

  const data = {
    labels: months,
    datasets: [
      {
        data: [65, 67, 68, 66, 70, 68], 
      },
    ],
  };

  // estado para controlar o índice inicial
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prevIndex) =>
        prevIndex === months.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('EditPerfil')}>
          <Text style={styles.editProfileText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/perfil.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Wesley Gonçalves</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Peso</Text>
        <LineChart
          data={data} 
          width={320}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#0E153A',
            backgroundGradientFrom: '#0E153A',
            backgroundGradientTo: '#0E153A',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E153A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: 40,
  },
  editProfileText: {
    color: 'white',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: '12%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 14,
    alignItems: 'center',
    flex: 1,
  },
  chartTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
  },
});

export default PerfilScreen;
