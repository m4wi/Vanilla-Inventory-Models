// Función para calcular el valor de la función en un punto 'x' basado en los coeficientes.
function fnx(fn, x) {
  const numCoef = fn.length;
  let acumulator = 0;
  for (let i = 0; i < numCoef; i++) {
    acumulator += fn[i] * Math.pow(x, i);
  }
  return acumulator;
}

// Función para calcular la derivada de la función en un punto 'x'.
function derivada(fn, x) {
  const h = 1e-5; // Paso pequeño para el cálculo de la derivada numérica
  return (fnx(fn, x + h) - fnx(fn, x - h)) / (2 * h);
}

// Función para calcular la segunda derivada de la función en un punto 'x'.
function segundaDerivada(fn, x) {
  const h = 1e-5; // Paso pequeño para el cálculo de la segunda derivada numérica
  return (fnx(fn, x + h) - 2 * fnx(fn, x) + fnx(fn, x - h)) / Math.pow(h, 2);
}

// Método de bisección para encontrar el punto de máximo
export function biseccion(fn, intervalo, err) {
  let max = 100;
  let k = 0;
  let prom = 0;
  
  while (k < max) {
    if ((intervalo[1] - intervalo[0]) < 2 * err) {
      break;
    }
    prom = (intervalo[0] + intervalo[1]) / 2;
    let der = derivada(fn, prom);
    
    if (der >= 0) {
      if (der !== 0) {
        intervalo[0] = prom;
      }
    } else {
      intervalo[1] = prom;
    }
    k++;
  }
  
  prom = (intervalo[0] + intervalo[1]) / 2;
  return prom;
}

// Método de Newton-Raphson para encontrar el máximo de la función
export function newtonRaphson(fn, x, err) {
  let max = 100;
  let k = 0;
  let tmp = 0;
  
  while (k < max) {
    tmp = x - (derivada(fn, x) / segundaDerivada(fn, x));
    if (Math.abs(tmp - x) <= err) {
      break;
    }
    k++;
    x = tmp;
  }
  
  return tmp;
}