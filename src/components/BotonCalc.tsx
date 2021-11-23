import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  texto: string;
  color?: string;
  ancho?: boolean;
  accion: (typeTexto: string) => void;
}

export const BotonCalc = ({
  texto,
  color = '#2D2D2D',
  ancho = false,
  accion,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => accion(texto)}>
      <View
        style={{
          ...styles.boton,
          backgroundColor: color,
          width: ancho ? 160 : 80,
        }}>
        <Text
          style={{
            ...styles.botonText,
            color: color === '#9B9B9B' ? 'black' : 'white',
          }}>
          {texto}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    height: 80,
    width: 80,
    backgroundColor: '#2D2D2D',
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  botonText: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '300',
  },
});
