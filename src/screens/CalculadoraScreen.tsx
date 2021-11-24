import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BotonCalc} from '../components/BotonCalc';

enum Operadores {
  sum,
  res,
  mul,
  div,
}

export const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [numOperacion, setNumOperacion] = useState('0');

  const ultimoOperador = useRef<Operadores>();
  console.log('ultimoOperador: ');
  console.log(ultimoOperador.current);

  const limpiar = () => {
    setNumero('0');
    setNumOperacion('0');
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

  /** Calcula operacion */
  const calcular = () => {
    if (numOperacion.startsWith('Error')) {
      setNumOperacion('0');
      setNumero('0');
      return;
    }
    const num1 = Number(numOperacion);
    const num2 = Number(numero);
    let ant = '0';
    switch (ultimoOperador.current) {
      case Operadores.sum:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.res:
        setNumero(`${num1 - num2}`);
        break;
      case Operadores.mul:
        setNumero(`${num1 * num2}`);
        break;
      case Operadores.div:
        if (num2) {
          setNumero(`${num1 / num2}`);
        } else {
          ant = 'Error div 0';
          setNumero('0');
        }
        break;
    }
    setNumOperacion(ant);
  };

  /** Asigna numero pequeño */
  const numAnterior = () => {
    setNumOperacion(numero.endsWith('.') ? numero.slice(0, -1) : numero);
    setNumero('0');
  };

  /** Operadores */
  const opDiv = () => {
    numAnterior();
    ultimoOperador.current = Operadores.div;
  };

  const opMul = () => {
    numAnterior();
    ultimoOperador.current = Operadores.mul;
  };

  const opRes = () => {
    numAnterior();
    ultimoOperador.current = Operadores.res;
  };

  const opSum = () => {
    numAnterior();
    ultimoOperador.current = Operadores.sum;
  };

  return (
    <View style={styles.container}>
      {numOperacion !== '0' && (
        <Text style={styles.operacion}>{numOperacion}</Text>
      )}
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      {/** BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={cambiaSigno} />
        <BotonCalc texto="del" color="#9B9B9B" accion={borrar} />
        <BotonCalc texto="&divide;" color="#FF9427" accion={opDiv} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armaNumero} />
        <BotonCalc texto="8" accion={armaNumero} />
        <BotonCalc texto="9" accion={armaNumero} />
        <BotonCalc texto="&times;" color="#FF9427" accion={opMul} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armaNumero} />
        <BotonCalc texto="5" accion={armaNumero} />
        <BotonCalc texto="6" accion={armaNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={opRes} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armaNumero} />
        <BotonCalc texto="2" accion={armaNumero} />
        <BotonCalc texto="3" accion={armaNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={opSum} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armaNumero} />
        <BotonCalc texto="." accion={armaNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={calcular} />
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
