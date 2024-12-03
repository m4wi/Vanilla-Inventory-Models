const modelInputs = {
  modeloMM1: `
  <div class="form-body">
    <div class="form-item">
        <label for="arrivalRate">Arrival Rate (λ): </label>
        <input type="number" name="arrivalRate" id="arrivalRate">
    </div>
    <div class="form-item">
        <label for="serviceRate">Service Rate (μ): </label>
        <input type="number" name="serviceRate" id="serviceRate">
    </div>
  </div>`,
  modeloMMK: `
  <div class="form-body">
      <div class="form-item">
          <label for="arrivalRate">Arrival Rate (λ): </label>
          <input type="number" name="arrivalRate" id="arrivalRate">
      </div>
      <div class="form-item">
          <label for="serviceRate">Service Rate (μ): </label>
          <input type="number" name="serviceRate" id="serviceRate">
      </div>
      <div class="form-item">
          <label for="numServers">Number of Servers (k): </label>
          <input type="number" name="numServers" id="numServers">
      </div>
  </div>`,

  // teoremaLittle: `
  // <div class="form-body">
  //     <div class="form-item">
  //         <label for="arrivalRate">Arrival Rate (λ): </label>
  //         <input type="number" name="arrivalRate" id="arrivalRate">
  //     </div>
  //     <div class="form-item">
  //         <label for="serviceRate">Service Rate (μ): </label>
  //         <input type="number" name="serviceRate" id="serviceRate">
  //     </div>
  //     <div class="form-item">
  //         <label for="avgQueueLength">Average Queue Length (Lq): </label>
  //         <input type="number" name="avgQueueLength" id="avgQueueLength">
  //     </div>
  //     <div class="form-item">
  //         <label for="avgWaitTime">Average Wait Time (Wq): </label>
  //         <input type="number" name="avgWaitTime" id="avgWaitTime">
  //     </div>
  // </div>`,

  modeloMG1: `
  <div class="form-body">
      <div class="form-item">
          <label for="arrivalRate">Arrival Rate (λ): </label>
          <input type="number" name="arrivalRate" id="arrivalRate">
      </div>
      <div class="form-item">
          <label for="serviceRate">Average Service Rate (μ): </label>
          <input type="number" name="serviceRate" id="serviceRate">
      </div>
      <div class="form-item">
          <label for="serviceTimeDistribution">Service Time Distribution (σ): </label>
          <input type="text" name="serviceTimeDistribution" id="serviceTimeDistribution">
      </div>
  </div>`,

  modeloMGKsinEspera: `
  <div class="form-body">
      <div class="form-item">
          <label for="arrivalRate">Arrival Rate (λ): </label>
          <input type="number" name="arrivalRate" id="arrivalRate">
      </div>
      <div class="form-item">
          <label for="serviceRate">Average Service Rate (μ): </label>
          <input type="number" name="serviceRate" id="serviceRate">
      </div>
      <div class="form-item">
          <label for="numServers">Number of Servers (k): </label>
          <input type="number" name="numServers" id="numServers">
      </div>
      <div class="form-item">
          <label for="probabilityBusyChannels">Probability: </label>
          <input type="number" name="probabilityBusyChannels" id="probabilityBusyChannels">
      </div>
  </div>`,

  modeloFuenteFinita: `
  <div class="form-body">
      <div class="form-item">
          <label for="arrivalRate">Arrival Rate (λ): </label>
          <input type="number" name="arrivalRate" id="arrivalRate">
      </div>
      <div class="form-item">
          <label for="serviceRate">Service Rate (μ): </label>
          <input type="number" name="serviceRate" id="serviceRate">
      </div>
      <div class="form-item">
          <label for="numSources">Number of Sources: </label>
          <input type="number" name="numSources" id="numSources" value="1" readonly>
      </div>
      <div class="form-item">
          <label for="totalCapacity">Total System Capacity: </label>
          <input type="number" name="totalCapacity" id="totalCapacity">
      </div>
  </div>`
}

function fac(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i; // Multiply the result by i at each iteration
  }
  return result;
}


const modelFunctions = {
  modeloMM1: function(data) {
    const probabilityNoUnits = 1 - (data.lambda/data.mu); // The probability that there are no units in the system
    const avgUnitsInQueue = Math.pow(data.lambda,2)/(data.mu*( data.mu - data.lambda ));// The average number of units in the queue
    const avgUnitsInSystem = avgUnitsInQueue + (data.lambda/data.mu);// The average number of units in the system
    const avgWaitTime = avgUnitsInQueue/data.lambda;// The average time a unit spends in the queue
    const avgTimeInSystem = avgWaitTime + (1/data.mu);// The average time a unit spends in the system
    const probabilityNoWait = (data.lambda/data.mu);// The probability that a unit arriving does not have to wait to be served
    return {
      probabilityNoUnits,
      avgUnitsInQueue,
      avgUnitsInSystem,
      avgWaitTime,
      avgTimeInSystem,
      probabilityNoWait
    };
  },
  modeloMMK: function(data) {
    const tmp = (data.lambda/data.mu);
    let acumulator = 0;
    for (let j = 0; j <= data.channels - 1; j++) {
      acumulator = acumulator + Math.pow(tmp, j) / fac(j);
    }
    acumulator = acumulator + (Math.pow(tmp, data.channels)/fac(data.channels))*((data.channels*data.mu)/(data.channels*data.mu - data.lambda))

    const probabilityNoUnits = 1 / acumulator;
    const avgUnitsInQueue = ((Math.pow(tmp, data.channels)*data.lambda*data.mu) *probabilityNoUnits)/(fac(data.channels - 1) * Math.pow(data.channels*data.mu - data.lambda, 2));
    const avgUnitsInSystem = avgUnitsInQueue + tmp;
    const avgWaitTime = avgUnitsInQueue / data.lambda;
    const avgTimeInSystem = avgWaitTime + (1/data.mu);
    const probabilityNoWait = Math.pow(tmp, data.channels)*((data.channels*data.mu)/(data.channels*data.mu - data.lambda))*probabilityNoUnits/fac(data.channels);
    return {
      probabilityNoUnits,
      avgUnitsInQueue,
      avgUnitsInSystem,
      avgWaitTime,
      avgTimeInSystem,
      probabilityNoWait
    };
  },
  //teoremaLittle: function(data) {},
  modeloMG1: function(data) {
    const tmp = (data.lambda/data.mu);
    const probabilityNoUnits = 1 - (tmp);
    const avgUnitsInQueue = (Math.pow(data.lambda,2)*Math.pow(data.sigma,2) + Math.pow(tmp,2))/(2*(1 - tmp));
    const avgUnitsInSystem = avgUnitsInQueue + tmp;
    const avgWaitTime = avgUnitsInQueue/data.lambda;
    const avgTimeInSystem = avgWaitTime + (1/data.mu);
    const probabilityNoWait = tmp;
    return {
      probabilityNoUnits,
      avgUnitsInQueue,
      avgUnitsInSystem,
      avgWaitTime,
      avgTimeInSystem,
      probabilityNoWait
    };
  },
  modeloMGKsinEspera: function(data) {
    const tmp = (data.lambda/data.mu);
    let busyChannels = [];
    let avgUnitsInSystem = [];
    let j = 0;
    do {
      let acumulator = 0;
      for (let i = 0; i <= data.channels; i++) {
        acumulator = acumulator + Math.pow(tmp, i)/fac(i);
      }
      busyChannels[j] = (Math.pow(tmp,j)/fac(j))/acumulator;
      avgUnitsInSystem[j] = tmp*(1 - busyChannels[j]);
      j++;
    } while (1 - data.probabilityBusyChannels < busyChannels[j - 1])

    const result = {};
    busyChannels.forEach((value, index) => {
      result[`Probabilidad[${index}]`] = value;
    });
    avgUnitsInSystem.forEach((value, index) => {
      result[`UnidadesPromedioSistema[${index}]`] = value;
    });
    return result;
  },
  modeloFuenteFinita: function(data) {
    let acumulator = 0;
    const tmp = (data.lambda/data.mu);
    const tmp2 = fac(data.totalCapacity);
    for (let i = 0; i <= data.totalCapacity; i++) {
      acumulator = acumulator + ((tmp2 * Math.pow(tmp,i))/fac(data.totalCapacity - i));
    }
    const probabilityNoUnits = 1 / acumulator;
    const avgUnitsInQueue = data.totalCapacity - ((data.lambda + data.mu)/data.lambda)*(1 - probabilityNoUnits);
    const avgUnitsInSystem = avgUnitsInQueue + (1 - probabilityNoUnits);
    const avgWaitTime = avgUnitsInQueue/((data.totalCapacity - avgUnitsInSystem)*data.lambda);
    const avgTimeInSystem = avgWaitTime + (1/data.mu);
    const probabilityNoWait = 1 - probabilityNoUnits;
    return {
      probabilityNoUnits,
      avgUnitsInQueue,
      avgUnitsInSystem,
      avgWaitTime,
      avgTimeInSystem,
      probabilityNoWait
    };

  },
}


const handleModel = document.getElementById("applyModel");
const EoqSelect = document.getElementById('model');
const inventoryForm = document.getElementById('inventoryForm');

function getInputValues() {
  const lambda = document.getElementById("arrivalRate");
  const mu = document.getElementById("serviceRate");
  const channels = document.getElementById("numServers");
  const sigma = document.getElementById("serviceTimeDistribution");
  const probabilityBusyChannels = document.getElementById("probabilityBusyChannels");
  const totalCapacity = document.getElementById("totalCapacity");
  // const averageDemand = document.getElementById("averageDemand");
  // const standarDesviation = document.getElementById("standarDesviation");
  // const anualOrderHoldingCost = document.getElementById("anualOrderHoldingCost");
  // const probability = document.getElementById("probability"); 
  // Crea un objeto para almacenar los valores
  const values = {
      lambda: lambda ? Number(lambda.value) : null,
      mu: mu ? Number(mu.value) : null,
      channels: channels ? Number(channels.value) : null,
      sigma: sigma ? Number(sigma.value) : null,
      probabilityBusyChannels: probabilityBusyChannels ? Number(probabilityBusyChannels.value) : null,
      totalCapacity: totalCapacity ? Number(totalCapacity.value) : null,
      // anualOrderHoldingCost: anualOrderHoldingCost ? Number(anualOrderHoldingCost.value) : null,
      // standarDesviation: standarDesviation ? Number(standarDesviation.value) : null,
      // averageDemand: averageDemand ? Number(averageDemand.value) : null,
      // probability: probability ? Number(probability.value) : null,
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
