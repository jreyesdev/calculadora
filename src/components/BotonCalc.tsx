import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');
// boton = 80 + 10 + 10 + 10 + 10
const largo = width - 120 - 120;

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
    <TouchableOpacity activeOpacity={0.7} onPress={() => accion(texto)}>
      <View
        style={{
          ...styles.boton,
          backgroundColor: color,
          width: ancho ? largo : 80,
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
