import { Knapsack } from '../lib/mochila.js'

const modelInputs = {
  backpack: `
  <div class="form-body">
    <div class="form-item">
      <label for="vectorWeights">Pesos: </label>
      <input type="text" name="vectorWeights" id="vectorWeights">
    </div>
    <div class="form-item">
      <label for="vectorProfit">Valores: </label>
      <input type="text" name="vectorProfit" id="vectorProfit">
    </div>
    <div class="form-item">
      <label for="maxWeight">Peso Maximo: </label>
      <input type="number" name="maxWeight" id="maxWeight">
    </div>
  </div>`,
}

function parseStringtoNumber(vectorString) {
  // Separar la cadena por comas y convertir cada elemento en un número flotante
  return vectorString.split(',').map(Number);
}

const modelFunctions = {
  backpack: (data) => {
    const weights = parseStringtoNumber(data.vectorWeights);
    const values = parseStringtoNumber(data.vectorProfit);

    const knapsack = new Knapsack(data.maxWeight, weights, values);
    const solution = knapsack.solve();
    return solution;
  }
}

const handleModel = document.getElementById("applyModel");
const EoqSelect = document.getElementById('model');
const inventoryForm = document.getElementById('inventoryForm');

function getInputValues() {
  const vectorWeights = document.getElementById("vectorWeights");
  const vectorProfit = document.getElementById("vectorProfit");
  const maxWeight = document.getElementById("maxWeight");
  const values = {
      vectorWeights: vectorWeights ? String(vectorWeights.value) : null,
      vectorProfit: vectorProfit ? String(vectorProfit.value) : null,
      maxWeight: maxWeight ? Number(maxWeight.value) : null
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
    const resultItem = document.createElement("pre");

    // Si el valor es un número, lo formateamos con .toFixed(4)
    if (typeof value === 'number') {
      resultItem.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${value.toFixed(4)}`;
    }
    // Si el valor es un objeto, lo convertimos a JSON con formato
    else if (typeof value === 'object' && value !== null) {
      resultItem.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${JSON.stringify(value, null, 2)}`;
    } 
    // Si es otro tipo de valor, simplemente lo mostramos
    else {
      resultItem.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${value}`;
    }

    solveModelDiv.appendChild(resultItem);
  }
}



