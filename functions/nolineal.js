import { biseccion, newtonRaphson} from '../lib/binew.js'

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
}

const handleModel = document.getElementById("applyModel");
const EoqSelect = document.getElementById('model');
const inventoryForm = document.getElementById('inventoryForm');

function getInputValues() {
  const coefficients = document.getElementById("coefficients");
  const searchInterval = document.getElementById("searchInterval");
  const errorTolerance = document.getElementById("errorTolerance");
  const initialGuess = document.getElementById("initialGuess");
  const values = {
      coefficients: coefficients ? String(coefficients.value) : null,
      searchInterval: searchInterval ? String(searchInterval.value) : null,
      errorTolerance: errorTolerance ? Number(errorTolerance.value) : null,
      initialGuess: initialGuess ? Number(initialGuess.value) : null
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