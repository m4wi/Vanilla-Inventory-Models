import { Cpm } from "../lib/cpm-pert.js";

const graph = new Cpm()
graph.init();


const displayTable = document.getElementById("generate-button");
const applyModel = document.getElementById("read-button");
const displayCriticalTime = (time) => document.getElementById("critical-time").innerText = time;
const displaySolutionContainer = () => document.getElementById("solve-container").style.display = "flex";
const displayGraph = document.getElementById("printGraph");

displayTable.addEventListener('click', () => {
  const numberOfRows = document.getElementById('nodeNumber').value;
  generateInputTable(numberOfRows);
});

applyModel.addEventListener('click', () => {
  const data = readInputTable();
  graph.reset()
  graph.loadNodes(data);
  graph.setEdges();
  console.log(graph.nodeList);
  graph.calculateEarly();
  graph.calculateLate();
  generateOutputTable(graph.getSolveDataMatrix())
  displayCriticalRoute(graph.getCriticalRoutes(graph.start))
  displayCriticalTime(graph.end.endLate)
  displaySolutionContainer()
});

displayGraph.addEventListener('click',() => {
  printGraph()
});

function readInputTable() {
  const tableBody = document.getElementById('data-table-body');
  const rows = tableBody.getElementsByTagName('tr'); // Obtener todas las filas
  const data = []; // Array para almacenar los datos

  // Recorrer las filas
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td'); // Obtener celdas de la fila
    const name = cells[1].textContent;
    const predecessors = cells[2].getElementsByTagName('input')[0].value; // Ciudad
    const time = cells[3].getElementsByTagName('input')[0].value; // Edad

    // Agregar los datos a un objeto
    data.push([
      name , // Generar letra A, B, C, ...
      predecessors,
      parseInt(time)
    ]);
  }
  return data;
}

const generateInputTable = (number) => {
  document.getElementById("tableForm").style.display = 'block';
  const tableBody = document.getElementById('data-table-body'); // Asegúrate de tener un tbody en tu tabla con este ID.
  tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

  for (let i = 0; i < number; i++) {
      const letter = String.fromCharCode(65 + i); // Generar letras A, B, C, ...
      const row = `
          <tr>
              <td>${i + 1}</td>
              <td>${letter}</td> <!-- Ahora muestra las letras -->
              <td><input type="text" class="tb-input-data" ></td>
              <td><input type="number" class="tb-input-data" ></td>
          </tr>
      `;
      tableBody.innerHTML += row; // Agregar la fila a la tabla
  }
}

function generateOutputTable (data) {
  const tableBody = document.getElementById('solve-data-table-body');
  tableBody.innerHTML = '';

  data.forEach( dataRow => {
    const row = `
    <tr>
        <td>1</td>
        <td>${ dataRow.name }</td>
        <td>${ dataRow.predecessors}</td>
        <td>${ dataRow.succesors }</td>
        <td>${ dataRow.time }</td>
        <td>${ dataRow.slack }</td>
        <td>${ dataRow.startEarly }</td>
        <td>${ dataRow.startLate }</td>
        <td>${ dataRow.endEarly }</td>
        <td>${ dataRow.endLate }</td>
    </tr>
  `;
  tableBody.innerHTML += row;
  })

}

function displayCriticalRoute (route) {
  const criticalRoute = route
  .map((subArray, index) => `Route ${index + 1}:  ${subArray.slice(0, -1).join(', ')}`)
  .join('\n');
  document.getElementById("critical-route").value = criticalRoute;
} 

function printGraph() {
  // create an array with nodes
  var matrix = graph.getSolveDataMatrix();
  var nodes = [];
  for (var i = 0; i < matrix.length; i++) {
    let routeColor = '#09090b'
    if (graph.nodeList[i]["slack"] === 0)
      routeColor = '#fafafa'
    nodes.push({
          id: matrix[i]["name"],
          level: 2,
          label: matrix[i]["name"] + ' (' + matrix[i]["time"] + ') '+ ' ['+ matrix[i]["slack"] + ']',
          color: { background: routeColor }
    });
  }
  /**
   * 
   *               "Activities " + matrix[i]["name"] + "\n\n" +
              "Duration: " + matrix[i]["time"] + "\n" +
              "Slack: " + matrix[i]["slack"] + "\n" +
              "Start Early: " + matrix[i]["startEarly"] + "\n" +
              "End Late:: " + matrix[i]["startLate"] + "\n" +
              "End Early: " + matrix[i]["endEarly"] + "\n" +
              "End Late: " + matrix[i]["endLate"],
   */
  let routeColor = '#fafafa'
  nodes.push({
      id: graph.start.name,
      label: graph.start.name + ' (' + graph.start.time + ') '+ ' ['+ graph.start.slack + ']',
      color: { background: routeColor },
      level: 3,
  });
  nodes.push({
      id: graph.end.name,
      label: graph.end.name + ' (' + graph.end.time + ') '+ ' ['+ graph.end.slack + ']',
      color: { background: routeColor },
      level: 1,
  });
  nodes = new vis.DataSet(nodes);

  // create an array with edges
  var edges = [];
  console.log(graph.nodeList)
  for (var i = 0; i < graph.nodeList.length; i++) {
      for (var j = 0; j < graph.nodeList[i].succesors.length; j++) {
          let routeColor = '#27272a'
          if (graph.nodeList[i]["slack"] === 0)
            routeColor = '#fafafa'
          edges.push({
              from: graph.nodeList[i]["name"],
              to: graph.nodeList[i].succesors[j].name,
              color: routeColor
          });
      }
  }

  for (var i = 0; i < graph.start.succesors.length; i++) {
      let routeColor = '#27272a'
      if (graph.nodeList[i]["slack"] === 0)
        routeColor = '#fafafa'
      edges.push({
          from: graph.start.name,
          to: graph.start.succesors[i].name,
          color: routeColor
      });
  }
  edges = new vis.DataSet(edges);

  // create a network
  //var container = $('#mynetwork');
  const container = document.getElementById('graph');

  // provide the data in the vis format
  var data = {
      nodes: nodes,
      edges: edges
  };
  var options = {
      edges: {
          arrows: {
              to: { enabled: true }
          }
      },
      nodes: {
          shape: 'dot',
          physics: false,
          color: {
              border: '#27272a',
              background: '#09090b',
          },
          font: {
              color: '#ffffff',
              bold: {
                  color: '#ffffff',
              },
          },
      },
      interaction: {
          dragNodes: true,
          dragView: true,
          hideEdgesOnDrag: false,
          hideEdgesOnZoom: false,
          hideNodesOnDrag: false,
          hover: false,
          hoverConnectedEdges: false,//
          keyboard: {
              enabled: false,
              speed: { x: 10, y: 10, zoom: 0.02 },
              bindToWindow: true
          },
          multiselect: false,
          navigationButtons: false,
          selectable: false,//
          selectConnectedEdges: false,//
          tooltipDelay: 10,
          zoomSpeed: 1,
          zoomView: true
      }
  };

  // initialize your network!
  var network = new vis.Network(container, data, options);
}



