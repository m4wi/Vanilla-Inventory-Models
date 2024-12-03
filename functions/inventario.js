const modelInputs = {
    eoqClassic: `
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
    probabilisticReorderPoint: `
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
    </div>`,
    eoqProductionLot: `
    <div class="form-body">
        <div class="form-item">
            <label for="currentDemand">Capacidad anual de producción: </label>
            <input type="number" name="annualProductionCapacity" id="annualProductionCapacity">
        </div>
        <div class="form-item">
            <label for="currentDemand">Demanda anual: </label>
            <input type="number" name="currentDemand" id="currentDemand">
        </div>
        <div class="form-item">
            <label for="orderingCost">Costo de preparar: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="holdingCostRate">Tasa de retención: </label>
            <input type="number" name="holdingCostRate" id="holdingCostRate">
        </div>
        <div class="form-item">
            <label for="unitCost">Costo unitario</label>
            <input type="number" name="unitCost" id="unitCost">
        </div>
        <div class="form-item">
            <label for="workingDaysPerYear">Dias hábiles</label>
            <input type="number" name="workingDaysPerYear" id="workingDaysPerYear">
        </div>
        <div class="form-item">
            <label for="leadTime">Lead Time</label>
            <input type="number" name="leadTime" id="leadTime">
        </div>
    </div>`,
    eoqQuantityDiscount: `
    <div class="form-body">
        <div class="form-item">
            <label for="rangeDemand">Rango de la demandas: </label>
            <input type="text" name="rangeDemand" id="rangeDemand">
        </div>
        <div class="form-item">
            <label for="discounts">Descuentos por rango: </label>
            <input type="text" name="discounts" id="discounts">
        </div>
        <div class="form-item">
            <label for="currentDemand">Demanda Anual: </label>
            <input type="number" name="currentDemand" id="currentDemand">
        </div>
        <div class="form-item">
            <label for="orderingCost">Costo de ordenar: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="holdingCostRate">Tasa de retencion: </label>
            <input type="number" name="holdingCostRate" id="holdingCostRate">
        </div>
        <div class="form-item">
            <label for="unitCost">Costo unitario</label>
            <input type="number" name="unitCost" id="unitCost">
        </div>
        <div class="form-item">
            <label for="workingDaysPerYear">Dias hábiles</label>
            <input type="number" name="workingDaysPerYear" id="workingDaysPerYear">
        </div>
        <div class="form-item">
            <label for="leadTime">Tiempo de espera</label>
            <input type="number" name="leadTime" id="leadTime">
        </div>
    </div>`,
    eoqSinglePeriod: `
    <div class="form-body">
        <div class="form-item">
            <label for="meanDemand">Demanda Media (μ): </label>
            <input type="number" name="meanDemand" id="meanDemand">
        </div>
        <div class="form-item">
            <label for="standarDesviation">Desviación estándar (σ): </label>
            <input type="number" name="standarDesviation" id="standarDesviation">
        </div>
        <div class="form-item">
            <label for="overestimationCost">Costo de sobreestimación: </label>
            <input type="number" name="overestimationCost" id="overestimationCost">
        </div>
        <div class="form-item">
            <label for="underestimationCost">Costo de subestimación: </label>
            <input type="number" name="underestimationCost" id="underestimationCost">
        </div>
    </div>
    `,
    eoqPeriodicReview: `
    <div class="form-body">
        <div class="form-item">
            <label for="initialInventory">Inventario inicial: </label>
            <input type="number" name="initialInventory" id="initialInventory">
        </div>
        <div class="form-item">
            <label for="reviewPeriod">Período de revisión: </label>
            <input type="number" name="reviewPeriod" id="reviewPeriod">
        </div>
        <div class="form-item">
            <label for="deliveryPeriod">Período de entrega: </label>
            <input type="number" name="deliveryPeriod" id="deliveryPeriod">
        </div>
        <div class="form-item">
            <label for="averageDemand">Demanda Promedio</label>
            <input type="number" name="averageDemand" id="averageDemand">
        </div>
        <div class="form-item">
            <label for="standarDesviation">Desviación estandar</label>
            <input type="number" name="standarDesviation" id="standarDesviation">
        </div>
        <div class="form-item">
            <label for="probability">Probabilidad</label>
            <input type="number" name="probability" id="probability">
        </div>
    </div>`,
    eoqDontLostSales: `
    <div class="form-body">
        <div class="form-item">
            <label for="averageDemand">Demanda Promedio</label>
            <input type="number" name="averageDemand" id="averageDemand">
        </div>
        <div class="form-item">
            <label for="standarDesviation">Desviación estandar</label>
            <input type="number" name="standarDesviation" id="standarDesviation">
        </div>
        <div class="form-item">
            <label for="orderingCost">Costo de hacer el pedido: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="averageOrderTime">Promedio tiempo de pedido</label>
            <input type="number" name="averageOrderTime" id="averageOrderTime">
        </div>
        <div class="form-item">
            <label for="dstOrderTime">Desviacion del tiempo de pedido</label>
            <input type="number" name="dstOrderTime" id="dstOrderTime">
        </div>
        <div class="form-item">
            <label for="anualOrderHoldingCost">C.c producto en inventario</label>
            <input type="number" name="anualOrderHoldingCost" id="anualOrderHoldingCost">
        </div>
        <div class="form-item">
            <label for="lostSalesCost">C. por perdida</label>
            <input type="number" name="lostSalesCost" id="lostSalesCost">
        </div>
    </div> 
    `,
    eoqLostSales: `
    <div class="form-body">
        <div class="form-item">
            <label for="averageDemand">Demanda Promedio</label>
            <input type="number" name="averageDemand" id="averageDemand">
        </div>
        <div class="form-item">
            <label for="standarDesviation">Desviación estandar</label>
            <input type="number" name="standarDesviation" id="standarDesviation">
        </div>
        <div class="form-item">
            <label for="orderingCost">Costo de hacer el pedido: </label>
            <input type="number" name="orderingCost" id="orderingCost">
        </div>
        <div class="form-item">
            <label for="averageOrderTime">Promedio tiempo de pedido</label>
            <input type="number" name="averageOrderTime" id="averageOrderTime">
        </div>
        <div class="form-item">
            <label for="profitPerItem">Ganancia por articulo</label>
            <input type="number" name="profitPerItem" id="profitPerItem">
        </div>
        <div class="form-item">
            <label for="dstOrderTime">Desviacion del tiempo de pedido</label>
            <input type="number" name="dstOrderTime" id="dstOrderTime">
        </div>
        <div class="form-item">
            <label for="anualOrderHoldingCost">C.c producto en inventario</label>
            <input type="number" name="anualOrderHoldingCost" id="anualOrderHoldingCost">
        </div>
        <div class="form-item">
            <label for="lostSalesCost">C. por perdida</label>
            <input type="number" name="lostSalesCost" id="lostSalesCost">
        </div>
    </div>    
    `
}

function parseRanges(input) {
    const ranges = input.split('|');
    const result = ranges.map(range => {
    const [min, max] = range.split(',');
    const maxValue = max === '+' ? 999999999 : parseInt(max);
    return [parseInt(min), maxValue];
    });
    return result;
}

const modelFunctions = {
    eoqClassic: function(data) {
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
    probabilisticReorderPoint: function (data) {
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
    },
    eoqProductionLot: function (data) {
        const dailyDemand = data.currentDemand / data.workingDaysPerYear;
        const dailyProduction = data.annualProductionCapacity / data.workingDaysPerYear;


        const cantidadEconomicaPedido = Math.sqrt((2 * data.currentDemand * data.orderingCost) / ((1 - (data.currentDemand/data.annualProductionCapacity))*(data.holdingCostRate * data.unitCost)));
        const faseDeProduccion = cantidadEconomicaPedido / dailyProduction;
        const nivelInventarioMaximo = (dailyProduction - dailyDemand) * faseDeProduccion;
        const nivelInventarioPromedio = nivelInventarioMaximo / 2;
        const costoRetencionAnual = nivelInventarioPromedio * data.holdingCostRate * data.unitCost;
        const numeroFasesPorAno = data.currentDemand / cantidadEconomicaPedido;
        const costoAnualPreparacion = numeroFasesPorAno * data.orderingCost;
        const costoAnualTotal = costoAnualPreparacion + costoRetencionAnual;
        const puntoReorden = (data.currentDemand / data.workingDaysPerYear) * data.leadTime;
        const tiempoCicloDias = (data.workingDaysPerYear * cantidadEconomicaPedido) / data.currentDemand;

        return {
            cantidadEconomicaPedido,
            faseDeProduccion,
            costoRetencionAnual,           // Costo de retención anual del inventario
            costoAnualPreparacion,             // Costo anual de preparar
            costoAnualTotal,               // Costo anual total
            nivelInventarioMaximo,         // Nivel de inventario máximo
            nivelInventarioPromedio,       // Nivel de inventario promedio
            puntoReorden,                  // Punto de reorden
            numeroFasesPorAno,           // Número de pedidos por año
            tiempoCicloDias
        }
    },
    eoqQuantityDiscount: function (data) {
        const deRanges = parseRanges(data.rangeDemand);
        const diRanges = data.discounts.split(',').map(item => parseFloat(item));
        const numRows = diRanges.length;

        let cCompra = [];
        let EOQ = [];
        let cRetencion = [];
        let cPedido = [];
        let cTotal = [];
        let index = 0;
        let min = +Infinity;
        for (let i = 0; i < numRows; i++) {
            EOQ[i] = Math.sqrt((2 * data.currentDemand * data.orderingCost) / (data.holdingCostRate * data.unitCost * (1 - diRanges[i])));
            if (!(EOQ[i] >= deRanges[i][0] && EOQ[i] <= deRanges[i][1])) {
                EOQ[i] = deRanges[i][0];
            }
            cRetencion[i] = 0.5 * EOQ[i] * data.holdingCostRate * data.unitCost * (1 - diRanges[i]);
            cPedido[i] = (data.currentDemand / EOQ[i]) * data.orderingCost;
            cCompra[i] = data.currentDemand * data.unitCost * (1 - diRanges[i]);
            cTotal[i] = cRetencion[i] + cPedido[i] + cCompra[i];
            if (min > cTotal[i]) {
                min = cTotal[i];
                index = i;
            }
        }
        const cantidadEconomicaPedido = EOQ[index];
        const costoRetencionAnual = cRetencion[index];
        const costoAnualOrdenar = cPedido[index];
        const costoAnualTotal = cTotal[index];
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
    eoqSinglePeriod: function (data) {
        const probabilitySurplus =  data.underestimationCost / (data.underestimationCost + data.overestimationCost);
        const probabilityStockout = 1 - probabilitySurplus; // Probability of a stockout
        const economicOrderQuantity = jStat.normal.inv(0.7143,data.meanDemand,data.standarDesviation)

        return {
            probabilitySurplus,
            probabilityStockout,
            economicOrderQuantity
        }
    },
    eoqPeriodicReview: function (data) {
        const totalStandarDesviation = Math.sqrt((data.reviewPeriod + data.deliveryPeriod) * Math.pow(data.standarDesviation, 2));
        const wantedService = jStat.normal.inv(data.probability, 0, 1);
        const economicOrderQuantity = (data.averageDemand * (data.reviewPeriod + data.deliveryPeriod)) + (wantedService * totalStandarDesviation) - data.initialInventory;
        const securityInventory = wantedService*totalStandarDesviation
      
        return {
          economicOrderQuantity,
          securityInventory
        }
    },
    eoqDontLostSales: function (data) {
        const economicOrderQuantity = Math.sqrt(2*data.averageDemand*data.orderingCost/data.anualOrderHoldingCost);
        const stockoutProbability = data.anualOrderHoldingCost*economicOrderQuantity/(data.lostSalesCost*data.averageDemand);
        const reorden = jStat.normal.inv(1 - stockoutProbability, 0, 1);
        const u_x = data.averageOrderTime * data.averageDemand;
        const o_x = Math.sqrt(data.averageOrderTime*Math.pow(data.standarDesviation,2) + Math.pow(data.averageDemand,2)*Math.pow(data.dstOrderTime,2));
        const reordenPoint = reorden*o_x+u_x;
        const securityInventory = reordenPoint - u_x;
        return{
            economicOrderQuantity,
            reordenPoint,
            securityInventory,
            stockoutProbability
        }
    },
    eoqLostSales: function (data) {
        const economicOrderQuantity = Math.sqrt(2*data.averageDemand*data.orderingCost/data.anualOrderHoldingCost);
        const stockoutProbability = data.anualOrderHoldingCost*economicOrderQuantity/(data.anualOrderHoldingCost*economicOrderQuantity + (data.lostSalesCost + data.profitPerItem)*data.averageDemand);
        const reorden = jStat.normal.inv(1 - stockoutProbability, 0, 1);
        const u_x = data.averageOrderTime * data.averageDemand;
        const o_x = Math.sqrt(data.averageOrderTime*Math.pow(data.standarDesviation,2) + Math.pow(data.averageDemand,2)*Math.pow(data.dstOrderTime,2));
        const reordenPoint = reorden*o_x+u_x;
        const securityInventory = reordenPoint - u_x;
        return{
            economicOrderQuantity,
            reordenPoint,
            securityInventory,
            stockoutProbability
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
    const annualProductionCapacity = document.getElementById("annualProductionCapacity");
    const rangeDemand = document.getElementById("rangeDemand");
    const discounts = document.getElementById("discounts");
    const meanDemand = document.getElementById('meanDemand');
    const overestimationCost = document.getElementById('overestimationCost');
    const underestimationCost = document.getElementById('underestimationCost');
    const initialInventory = document.getElementById("initialInventory");
    const reviewPeriod = document.getElementById("reviewPeriod");
    const deliveryPeriod = document.getElementById("deliveryPeriod");
    const lostSalesCost = document.getElementById("lostSalesCost");
    const averageOrderTime = document.getElementById("averageOrderTime");
    const dstOrderTime = document.getElementById("dstOrderTime");
    const profitPerItem = document.getElementById("profitPerItem");
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
        annualProductionCapacity: annualProductionCapacity ? Number(annualProductionCapacity.value) : null,
        rangeDemand: rangeDemand ? String(rangeDemand.value) : null,
        discounts: discounts ? String(discounts.value) : null,
        meanDemand: meanDemand ? Number(meanDemand.value) : null,
        overestimationCost: overestimationCost ? Number(overestimationCost.value) : null,
        underestimationCost: underestimationCost ? Number(underestimationCost.value) : null,    initialInventory: initialInventory ? Number(initialInventory.value) : null,
        reviewPeriod: reviewPeriod ? Number(reviewPeriod.value) : null,
        deliveryPeriod: deliveryPeriod ? Number(deliveryPeriod.value) : null,
        lostSalesCost: lostSalesCost ? Number(lostSalesCost.value) : null,
        averageOrderTime: averageOrderTime ? Number(averageOrderTime.value) : null,
        dstOrderTime: dstOrderTime ? Number(dstOrderTime.value) : null,
        profitPerItem: profitPerItem ? Number(profitPerItem.value) : null
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
