import { biseccion, newtonRaphson} from '../lib/binew.js'
import { GranM } from '../lib/GranM.js'

const modelInputs = {
  bisection: `
  <div class="form-body">
    <div class="form-item">
        <label for="coefficients">Vector de coeficientes: </label>
        <input type="text" name="coefficients" id="coefficients">
    </div>
    <div class="form-item">
        <label for="searchInterval">Intervalo de búsqueda: </label>
        <input type="text" name="searchInterval" id="searchInterval">
    </div>
    <div class="form-item">
        <label for="errorTolerance">Error Permisible: </label>
        <input type="number" name="errorTolerance" id="errorTolerance">
    </div>
  </div>`,
  
  newtonRaphson:  `
  <div class="form-body">
    <div class="form-item">
        <label for="coefficients">Vector de coeficientes: </label>
        <input type="text" name="coefficients" id="coefficients">
    </div>
    <div class="form-item">
        <label for="initialGuess">Disparo inicial: </label>
        <input type="number" name="initialGuess" id="initialGuess">
    </div>
    <div class="form-item">
        <label for="errorTolerance">Error Permisible: </label>
        <input type="number" name="errorTolerance" id="errorTolerance">
    </div>
  </div>`,
  fractional: `
  <div class="form-body">
      <div class="form-item">
          <label for="numeratorCoefficients">Vector de coeficientes numerador: </label>
          <input type="text" name="numeratorCoefficients" id="numeratorCoefficients">
      </div>
      <div class="form-item">
          <label for="denominatorCoefficients">Vector de coeficientes denominador: </label>
          <input type="text" name="denominatorCoefficients" id="denominatorCoefficients">
      </div>
      <div class="form-item">
          <label for="restrictionMatrix">Matriz de coeficientes de restricciones: </label>
          <input type="text" name="restrictionMatrix" id="restrictionMatrix">
      </div>
      <div class="form-item">
          <label for="resultsVector">Vector de resultados: </label>
          <input type="text" name="resultsVector" id="resultsVector">
      </div>
  </div>`
}
function parseStringtoNumber(vectorString) {
  // Separar la cadena por comas y convertir cada elemento en un número flotante
  return vectorString.split(',').map(Number);
}


const modelFunctions = {
  bisection: (data) => {
    const fn = parseStringtoNumber(data.coefficients);
    const interval = parseStringtoNumber(data.searchInterval);
    const res = biseccion(fn, interval, data.errorTolerance);
    return {
      ElPuntoBuscado : res
    }
  },
  newtonRaphson: (data) => {
    const fn = parseStringtoNumber(data.coefficients);
    const res = newtonRaphson(fn, data.initialGuess, data.errorTolerance);
    return {
      ElPuntoBuscado : res
    }
  },
  fractional: (data) => {
    const coeffnumerador = parseStringtoNumber(data.numeratorCoefficients); // [2,-2,1]
    const coeffdenominador = parseStringtoNumber(data.denominatorCoefficients); //[4,1,3];
    const matrizRestricciones = data.restrictionMatrix.split(";").map(row => row.split(",").map(Number))
    const vectorTerIndependientes = parseStringtoNumber(data.resultsVector);
  
    const eNum = coeffnumerador.shift();
    coeffnumerador.push(eNum);

    const eDen = coeffdenominador.shift();
    coeffdenominador.push(eDen);

    const nuevaMatrizRestricciones = matrizRestricciones.map((fila, index) => {
      // Agregar el valor negativo del término independiente correspondiente a la fila
      return [...fila, -vectorTerIndependientes[index]];
    });
    nuevaMatrizRestricciones.push(coeffdenominador)

    const numRes = nuevaMatrizRestricciones.length;
    const vIndependientes = Array(numRes).fill(0);
    vIndependientes[numRes - 1] = 1;

    const signs = Array(numRes).fill(-1);
    signs[numRes - 1] = 0;

    const granM = new GranM(coeffnumerador, nuevaMatrizRestricciones, vIndependientes, signs);
    granM.initialize();
    const result = granM.optimize();
    const rlength = result.solution.length
    return{
      x1: result.solution[0]/result.solution[rlength - 1],
      x2: result.solution[1]/result.solution[rlength - 1]
    }
  }
}

const handleModel = document.getElementById("applyModel");
const EoqSelect = document.getElementById('model');
const inventoryForm = document.getElementById('inventoryForm');

function getInputValues() {
  const coefficients = document.getElementById("coefficients");
  const searchInterval = document.getElementById("searchInterval");
  const errorTolerance = document.getElementById("errorTolerance");
  const initialGuess = document.getElementById("initialGuess");
  const numeratorCoefficients = document.getElementById("numeratorCoefficients");
  const denominatorCoefficients = document.getElementById("denominatorCoefficients");
  const restrictionMatrix = document.getElementById("restrictionMatrix");
  const inequalitiesVector = document.getElementById("inequalitiesVector");
  const resultsVector = document.getElementById("resultsVector");

  const values = {
      coefficients: coefficients ? String(coefficients.value) : null,
      searchInterval: searchInterval ? String(searchInterval.value) : null,
      errorTolerance: errorTolerance ? Number(errorTolerance.value) : null,
      initialGuess: initialGuess ? Number(initialGuess.value) : null,
      numeratorCoefficients: numeratorCoefficients ? String(numeratorCoefficients.value) : null,
      denominatorCoefficients: denominatorCoefficients ? String(denominatorCoefficients.value) : null,
      restrictionMatrix: restrictionMatrix ? String(restrictionMatrix.value) : null,
      inequalitiesVector: inequalitiesVector ? String(inequalitiesVector.value) : null,
      resultsVector: resultsVector ? String(resultsVector.value) : null,
  };

  // Filtra los valores nulos
  return Object.fromEntries(Object.entries(values).filter(([key, value]) => value !== null));
}


handleModel.addEventListener('click', () => {
  const data = getInputValues();
  const selectedModel = EoqSelect.value;
  const modelFunction = modelFunctions[selectedModel];
  const modelData = modelFunction ? modelFunction(data) : {};
  displayResults(modelData);
})



EoqSelect.addEventListener('change', () => {
  const selectedValue = EoqSelect.value;
  inventoryForm.innerHTML = modelInputs[selectedValue];
})


function displayResults(results) {
  const solveModelDiv = document.getElementById("solve-model");
  
  // Clear any previous results
  solveModelDiv.innerHTML = '';

  // Create and append each data point as a paragraph
  for (const [key, value] of Object.entries(results)) {
      const resultItem = document.createElement("p");
      resultItem.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${value.toFixed(4)}`; // Format key to be more readable
      solveModelDiv.appendChild(resultItem);
  }
}