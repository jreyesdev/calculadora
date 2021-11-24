import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BotonCalc} from '../components/BotonCalc';

export const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [numOperacion, setNumOperacion] = useState('0');

  const limpiar = () => {
    setNumero('0');
  };

  const armaNumero = (numTex: string) => {
    // Solo un punto
    if (numero.includes('.') && numTex === '.') return;
    // Si inicia con 0 o -
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Evita muchos ceros al inicio o muchos puntos
      if (numTex === '0' && !numero.includes('.')) return;
      // Sustituye a solo 0 o -0
      if (numTex !== '.') {
        if (numero.startsWith('-0.') || numero.startsWith('0.')) {
          setNumero(numero + numTex);
          return;
        }
        setNumero(numero.startsWith('-') ? '-' + numTex : numTex);
        return;
      }
    }
    setNumero(numero + numTex);
  };

  /** Cambia signo a resultado o numero actual */
  const cambiaSigno = () => {
    setNumero(numero.includes('-') ? numero.replace('-', '') : '-' + numero);
  };

  /** Borra ultimo digito */
  const borrar = () => {
    if (numero.length < 3) {
      if (numero.startsWith('-') || numero.length === 1) {
        setNumero('0');
        return;
      }
    }
    setNumero(numero.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.operacion}>{numOperacion}</Text>
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      {/** BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={cambiaSigno} />
        <BotonCalc texto="del" color="#9B9B9B" accion={borrar} />
        <BotonCalc texto="&divide;" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armaNumero} />
        <BotonCalc texto="8" accion={armaNumero} />
        <BotonCalc texto="9" accion={armaNumero} />
        <BotonCalc texto="&times;" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armaNumero} />
        <BotonCalc texto="5" accion={armaNumero} />
        <BotonCalc texto="6" accion={armaNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armaNumero} />
        <BotonCalc texto="2" accion={armaNumero} />
        <BotonCalc texto="3" accion={armaNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={limpiar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armaNumero} />
        <BotonCalc texto="." accion={armaNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={limpiar} />
      </View>
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
    marginBottom: 10,
  },
  operacion: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 30,
    textAlign: 'right',
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
