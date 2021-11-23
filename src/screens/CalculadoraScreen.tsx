import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const CalculadoraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.operacion}>1,500.00</Text>
      <Text style={styles.resultado}>1,500.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  resultado: {
    color: 'white',
    fontSize: 60,
    textAlign: 'right',
  },
  operacion: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 30,
    textAlign: 'right',
  },
});
