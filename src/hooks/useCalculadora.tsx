import {useRef, useState} from 'react';

enum Operadores {
  sum,
  res,
  mul,
  div,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numOperacion, setNumOperacion] = useState('0');

  const ultimoOperador = useRef<Operadores>();

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
          ultimoOperador.current = undefined;
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
  return {
    numOperacion,
    numero,
    limpiar,
    cambiaSigno,
    borrar,
    opDiv,
    armaNumero,
    opMul,
    opRes,
    opSum,
    calcular,
  };
};
