function generarTablaConInputs(n, m) {
  // Crear el elemento <table>
  const tabla = document.createElement('table');

  // Generar las filas y columnas
  for (let i = 0; i < n; i++) {
      const fila = document.createElement('tr');
      for (let j = 0; j < m; j++) {
          const celda = document.createElement('td');

          // Crear un input para cada celda
          const input = document.createElement('input');
          input.type = 'text'; // Tipo de input
          input.placeholder = `Dato (${i + 1}, ${j + 1})`; // Texto de ejemplo

          // Añadir el input a la celda
          celda.appendChild(input);
          fila.appendChild(celda);
      }
      tabla.appendChild(fila);
  }

  // Insertar la tabla en el contenedor
  document.getElementById('table-container').appendChild(tabla);
}

function leerTabla() {
  const tabla = document.querySelector('table');
  const datos = [];

  // Recorrer cada fila
  for (let i = 0; i < tabla.rows.length; i++) {
      const fila = tabla.rows[i];
      const filaDatos = [];

      // Recorrer cada celda de la fila
      for (let j = 0; j < fila.cells.length; j++) {
          const input = fila.cells[j].querySelector('input');

          // Obtener el valor del input y añadirlo al array
          filaDatos.push(input.value);
      }
      datos.push(filaDatos);
  }

  // Mostrar los datos en la consola o usarlos según necesites
  console.log(datos);
  return datos;
}


const generateTable = document.getElementById('generate-button');

generateTable.addEventListener('click', (desciciones, estado) => {
  const options = document.getElementById('ndesciciones').value;
  const status = document.getElementById('nestados').value;
  generarTablaConInputs(options, status);
})

document.getElementById('optimista').addEventListener('click', () => {
  document.getElementById('displayAlpha').style.display = 'none';
  const data = leerTabla()

  let maxValor = data[0][0];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        maxValor = Math.max(maxValor, data[i][j]);
    }
  }
  const result = document.getElementById('result_quest')
  result.innerText = `Criterio Optimista: Elegir la opción con el valor máximo (${maxValor}).`;
})
document.getElementById('pesimista').addEventListener('click', () => {
  document.getElementById('displayAlpha').style.display = 'none';
  const data = leerTabla()

  let maxMinimoFila = -Infinity;
  let mejorFila;

  for (let i = 0; i < data.length; i++) {
      const minimoFila = Math.min(...data[i]);

      if (minimoFila > maxMinimoFila) {
          maxMinimoFila = minimoFila;
          mejorFila = i;
      }
  }
  const result = document.getElementById('result_quest')
  result.innerText = `Criterio Pesimista: Elegir la opción con el valor mínimo más grande en la fila ${mejorFila + 1} (${maxMinimoFila}).`;
})
document.getElementById('hurwicks').addEventListener('click', () => {
  document.getElementById('displayAlpha').style.display = 'block';

  document.getElementById('calAlfa').addEventListener('click', () => {
    const alfa = document.getElementById('alfa').value;
    const data = leerTabla()
    const filas = data.length;
    const columnas = data[0].length;
  
    let maxValorHurwicz = -Infinity;
    let mejorFila;
  
    for (let i = 0; i < filas; i++) {
        let maxValor = -Infinity;
        let minValor = Infinity;
  
        for (let j = 0; j < columnas; j++) {
            maxValor = Math.max(maxValor, data[i][j]);
            minValor = Math.min(minValor, data[i][j]);
        }
  
        const valorHurwicz = alfa * maxValor + (1 - alfa) * minValor;
  
        if (valorHurwicz > maxValorHurwicz) {
            maxValorHurwicz = valorHurwicz;
            mejorFila = i + 1;
        }
    }
  
    const result = document.getElementById('result_quest')
    result.innerText = `Criterio de Hurwicz: Elegir la opción con el valor combinado máximo en la fila ${mejorFila} (${maxValorHurwicz}).`;
  })
})
document.getElementById('laplace').addEventListener('click', () => {
  document.getElementById('displayAlpha').style.display = 'none';
  const data = leerTabla()
  const filas = data.length;
  const columnas = data[0].length;

  const sumasPorFila = [];
  const resultados = new Array(filas).fill(0); // Matriz de una columna para almacenar resultados.

  for (let i = 0; i < filas; i++) {
      let sumaFila = 0;

      for (let j = 0; j < columnas; j++) {
          sumaFila += data[i][j] / filas;
      }

      sumasPorFila.push(sumaFila);
      resultados[i] = sumaFila; // Almacenar el resultado en la matriz.
  }

  const maxSumaFila = Math.max(...sumasPorFila);
  const mejorFila = sumasPorFila.indexOf(maxSumaFila) + 1;

  // Mostrar el resultado como un número.
  const resultadoNumerico = parseFloat(maxSumaFila.toFixed(2));

  const result = document.getElementById('result_quest')
  result.innerText = `Criterio de Laplace: Elegir la opción con la suma máxima de valores promedio por fila (Fila ${mejorFila}). Resultado: ${resultadoNumerico}.`;
})
document.getElementById('savage').addEventListener('click', () => {
  document.getElementById('displayAlpha').style.display = 'none';
  const data = leerTabla()

  const filas = data.length;
  const columnas = data[0].length;

  // Transponer la matriz original.
  const transpuesta = data[0].map((_, i) => data.map(row => row[i]));

  // Calcular las pérdidas para cada fila.
  const perdidasFilas = transpuesta.map(column => {
      const maxValor = Math.max(...column);
      return column.map(valor => maxValor - valor);
  });

  // Transponer nuevamente la matriz de pérdidas.
  const perdidasColumnas = perdidasFilas[0].map((_, i) => perdidasFilas.map(row => row[i]));

  // Calcular la suma de pérdidas para cada columna.
  const sumasPerdidas = perdidasColumnas.map(row => row.reduce((acc, val) => acc + val, 0));

  // Encontrar la fila con la menor pérdida total.
  const mejorFilaIndex = sumasPerdidas.indexOf(Math.min(...sumasPerdidas)) + 1;

  const minPerdidaTotal = Math.min(...sumasPerdidas);

  const result = document.getElementById('result_quest')
  result.innerText = `Criterio de Savage: Elegir la opción que minimiza la pérdida esperada (${minPerdidaTotal}), tomando la decisión en la fila ${mejorFilaIndex}.`;
})
