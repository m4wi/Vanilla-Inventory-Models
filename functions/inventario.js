const handleModel = document.getElementById("applyModel")

function getInputValues() {
    const currentDemand = document.getElementById("currentDemand").value;
    const orderingCost = document.getElementById("orderingCost").value;
    const holdingCostRate = document.getElementById("holdingCostRate").value;
    const unitCost = document.getElementById("unitCost").value;
    const workingDaysPerYear = document.getElementById("workingDaysPerYear").value;
    const leadTime = document.getElementById("leadTime").value;

    // Convert the values to numbers, as they will be strings by default
    return {
        currentDemand: Number(currentDemand),
        orderingCost: Number(orderingCost),
        holdingCostRate: Number(holdingCostRate),
        unitCost: Number(unitCost),
        workingDaysPerYear: Number(workingDaysPerYear),
        leadTime: Number(leadTime)
    };
}

handleModel.addEventListener('click', () => {
    const data = getInputValues();
    const modelData = EOQmodel(data);
    displayResults(modelData);
})


const EOQmodel = (data) => {    

    // operaciones basicas EOQ
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
}

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

