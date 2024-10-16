const modelInputs = {
    EOQmodel: `
    <div class="form-body">
        <div class="form-item">
            <label for="currentDemand">Current Demand: </label>
            <input type="number" name="currentDemand" id="currentDemand">
        </div>
        <div class="form-item">
            <label for="orderingCost">Ordering Cost: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="holdingCostRate">Holding Cost Rate: </label>
            <input type="number" name="holdingCostRate" id="holdingCostRate">
        </div>
        <div class="form-item">
            <label for="unitCost">Unit Cost</label>
            <input type="number" name="unitCost" id="unitCost">
        </div>
        <div class="form-item">
            <label for="workingDaysPerYear">Working Days</label>
            <input type="number" name="workingDaysPerYear" id="workingDaysPerYear">
        </div>
        <div class="form-item">
            <label for="leadTime">Lead Time</label>
            <input type="number" name="leadTime" id="leadTime">
        </div>
    </div>`,
    eoqBackOrder: `
    <div class="form-body">
        <div class="form-item">
            <label for="currentDemand">Current Demand: </label>
            <input type="number" name="currentDemand" id="currentDemand">
        </div>
        <div class="form-item">
            <label for="orderingCost">Ordering Cost: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="holdingCostRate">Holding Cost Rate: </label>
            <input type="number" name="holdingCostRate" id="holdingCostRate">
        </div>
        <div class="form-item">
            <label for="workingDaysPerYear">Working Days</label>
            <input type="number" name="workingDaysPerYear" id="workingDaysPerYear">
        </div>
        <div class="form-item">
            <label for="anualOrderHoldingCost">anualOrderHoldingCost</label>
            <input type="number" name="anualOrderHoldingCost" id="anualOrderHoldingCost">
        </div>
    </div>`,
    ProbabilisticReorderPoint: `
    <div class="form-body">
        <div class="form-item">
            <label for="currentDemand">Current Demand: </label>
            <input type="number" name="currentDemand" id="currentDemand">
        </div>
        <div class="form-item">
            <label for="orderingCost">Ordering Cost: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="holdingCostRate">Holding Cost Rate: </label>
            <input type="number" name="holdingCostRate" id="holdingCostRate">
        </div>
        <div class="form-item">
            <label for="unitCost">Unit Cost</label>
            <input type="number" name="unitCost" id="unitCost">
        </div>
        <div class="form-item">
            <label for="averageDemand">Average</label>
            <input type="number" name="averageDemand" id="averageDemand">
        </div>
        <div class="form-item">
            <label for="standarDesviation">Standar Desviation</label>
            <input type="number" name="standarDesviation" id="standarDesviation">
        </div>
        <div class="form-item">
            <label for="probability">Probability</label>
            <input type="number" name="probability" id="probability">
        </div>
    </div>`
}
const modelFunctions = {
    EOQmodel: function(data) {
        const cantidadEconomicaPedido = Math.round(Math.sqrt((2 * data.currentDemand * data.orderingCost) / (data.holdingCostRate / 100 * data.unitCost)));
        const costoRetencionAnual = 0.5 * cantidadEconomicaPedido * (data.holdingCostRate / 100) * data.unitCost;
        const costoAnualOrdenar = (data.currentDemand / cantidadEconomicaPedido) * data.orderingCost;
        const costoAnualTotal = costoAnualOrdenar + costoRetencionAnual;
        const nivelInventarioMaximo = cantidadEconomicaPedido;
        const nivelInventarioPromedio = nivelInventarioMaximo / 2;
        const puntoReorden = (data.currentDemand / data.workingDaysPerYear) * data.leadTime;
        const numeroPedidosPorAno = data.currentDemand / cantidadEconomicaPedido;
        const tiempoCicloDias = data.workingDaysPerYear / numeroPedidosPorAno;
        return {
            cantidadEconomicaPedido,
            costoRetencionAnual,           // Costo de retención anual del inventario
            costoAnualOrdenar,             // Costo anual de ordenar
            costoAnualTotal,               // Costo anual total
            nivelInventarioMaximo,         // Nivel de inventario máximo
            nivelInventarioPromedio,       // Nivel de inventario promedio
            puntoReorden,                  // Punto de reorden
            numeroPedidosPorAno,           // Número de pedidos por año
            tiempoCicloDias               // Tiempo de ciclo (días)
        }
    },
    ProbabilisticReorderPoint: function (data) {
        console.log(data);
        const economicOrderQuantity = Math.round(Math.sqrt((2 * data.currentDemand * data.orderingCost) / data.holdingCostRate));
        const securityInventory = jStat.normal.inv(data.probability, data.averageDemand, data.standarDesviation) - data.averageDemand;
        const anualHoldingCost = 0.5 * economicOrderQuantity * data.holdingCostRate;
        const anualOrderingCost = (data.currentDemand / economicOrderQuantity) * data.orderingCost;
        const anualHoldingSecurityCost = securityInventory * data.holdingCostRate;
        const anualTotalCost = anualHoldingCost + anualOrderingCost + anualHoldingSecurityCost;
      
        return {
          economicOrderQuantity,
          securityInventory,
          anualHoldingCost,
          anualOrderingCost,
          anualHoldingSecurityCost,
          anualTotalCost,
        }
    },
    eoqBackOrder: function (data) {
        const economicOrderQuantity = Math.sqrt((2 * data.currentDemand * data.orderingCost) * ((data.holdingCostRate + data.anualOrderHoldingCost) / data.anualOrderHoldingCost) / data.holdingCostRate);
        const holdingOrders = economicOrderQuantity * ((data.holdingCostRate) / (data.holdingCostRate + data.anualOrderHoldingCost));
        const maximumInventoryLevel = economicOrderQuantity - holdingOrders;    // Maximum inventory level
        const anualHoldingCost = Math.pow(maximumInventoryLevel,2) * data.holdingCostRate / (2 * economicOrderQuantity);
        const anualOrderingCost = data.currentDemand * data.orderingCost / economicOrderQuantity;
        const anualHoldingOrderCost = Math.pow((holdingOrders), 2) * data.anualOrderHoldingCost / (2 * economicOrderQuantity );
        const anualTotalCost = anualHoldingCost + anualOrderingCost + anualHoldingOrderCost;
        const averageInventoryLevel = Math.pow((economicOrderQuantity - holdingOrders), 2) / (2 * economicOrderQuantity ); 
        const ordersPerYear = data.currentDemand / economicOrderQuantity;               // Number of orders per year
        const cycleTimeDays =  data.workingDaysPerYear * economicOrderQuantity / data.currentDemand;
        
        return {
          economicOrderQuantity,
          holdingOrders,
          maximumInventoryLevel,
          anualHoldingCost,
          anualOrderingCost,
          anualHoldingOrderCost,
          anualTotalCost,
          averageInventoryLevel,
          ordersPerYear,
          cycleTimeDays
        }
    }

}

const handleModel = document.getElementById("applyModel");
const EoqSelect = document.getElementById('model');
const inventoryForm = document.getElementById('inventoryForm');

function getInputValues() {
    const currentDemand = document.getElementById("currentDemand");
    const orderingCost = document.getElementById("orderingCost");
    const holdingCostRate = document.getElementById("holdingCostRate");
    const unitCost = document.getElementById("unitCost");
    const workingDaysPerYear = document.getElementById("workingDaysPerYear");
    const leadTime = document.getElementById("leadTime");
    const averageDemand = document.getElementById("averageDemand");
    const standarDesviation = document.getElementById("standarDesviation");
    const anualOrderHoldingCost = document.getElementById("anualOrderHoldingCost");
    const probability = document.getElementById("probability");
    // Crea un objeto para almacenar los valores
    const values = {
        currentDemand: currentDemand ? Number(currentDemand.value) : null,
        orderingCost: orderingCost ? Number(orderingCost.value) : null,
        holdingCostRate: holdingCostRate ? Number(holdingCostRate.value) : null,
        unitCost: unitCost ? Number(unitCost.value) : null,
        workingDaysPerYear: workingDaysPerYear ? Number(workingDaysPerYear.value) : null,
        leadTime: leadTime ? Number(leadTime.value) : null,
        anualOrderHoldingCost: anualOrderHoldingCost ? Number(anualOrderHoldingCost.value) : null,
        standarDesviation: standarDesviation ? Number(standarDesviation.value) : null,
        averageDemand: averageDemand ? Number(averageDemand.value) : null,
        probability: probability ? Number(probability.value) : null,
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
        resultItem.textContent = `${key.replace(/([A-Z])/g, ' $1')}: ${value.toFixed(2)}`; // Format key to be more readable
        solveModelDiv.appendChild(resultItem);
    }
}
