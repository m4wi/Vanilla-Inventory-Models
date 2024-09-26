export class Node {
  name; //String
  startEarly; //int up left
  startLate; //int down left
  endEarly; //int up right
  endLate; //int down right
  time;
  slack;

  succesors = []; // Node[]
  predecessors = []; // Node[]
  precesorChars; // by example : [A, B, C]

  constructor() {
    this.name = "";
    this.time = 0;
    this.startEarly = 0;
    this.startLate = 0;
    this.endEarly = 0;
    this.endLate = 0;
    this.slack = 0;
  }

  addNode(name, precesorChars, time) {
    this.name = name;
    this.precesorChars = precesorChars;
    this.time = time;
    return this; // Devuelve el objeto para permitir encadenamiento si es necesario
  }
};



export class Cpm {
  // Atributtes
  start // Node []
  end // Node []
  nodeList // Node []

  constructor() {}

  init () {
    this.start = new Node().addNode("Initial", [], 0)
    this.end = new Node().addNode("Finish", [], 0)
    this.nodeList = [];
  }

  loadNodes (data) {
    data.forEach(([ name, predecessors, time ]) => {
      const predecessorsArray = predecessors ? predecessors.split(",").filter(Boolean) : [];
      const newActivity = new Node().addNode(name, predecessorsArray, time);
      this.nodeList.push(newActivity);
    });
  }

  setEdges () {
    // Crear un mapa para buscar nodos por nombre rápidamente
    const nodeMap = new Map(this.nodeList.map(node => [node.name, node]));

    // Asignar predecesores y sucesores
    this.nodeList.forEach(node => {
      if (node.precesorChars == "") {
          node.predecessors.push(this.start);
          this.start.succesors.push(node);
      } else {
          node.precesorChars.forEach(precesorChar => {
              const precesorNode = nodeMap.get(precesorChar);
              if (precesorNode) {
                  node.predecessors.push(precesorNode);
                  precesorNode.succesors.push(node);
              }
          });
      }
    });

    // Añadir el nodo final para aquellos que no tienen sucesores
    this.nodeList.forEach(node => {
        if (node.succesors.length === 0) {
            node.succesors.push(this.end);
            this.end.predecessors.push(node);
        }
    });
  }

  calculateEarly() {
    this.nodeList.forEach(node => {
        if (node.predecessors.length === 1) {
            const precesor = node.predecessors[0];
            node.startEarly = precesor.endEarly;
            node.endEarly = node.startEarly + node.time;
        } else {
            const maxEndEarly = Math.max(...node.predecessors.map(precesor => precesor.endEarly));
            node.startEarly = maxEndEarly;
            node.endEarly = node.startEarly + node.time;
        }
    });

    // Calcular para el nodo "end"
    if (this.end.predecessors.length === 1) {
        const precesor = this.end.predecessors[0];
        this.end.endLate = this.end.startLate = this.end.endEarly = this.end.startEarly = precesor.endEarly;
    } else {
        const maxEndEarly = Math.max(...this.end.predecessors.map(precesor => precesor.endEarly));
        this.end.endLate = this.end.startLate = this.end.endEarly = this.end.startEarly = maxEndEarly;
    }
  }

  calculateLate() {
    // Iterar en orden inverso
    for (let i = this.nodeList.length - 1; i >= 0; i--) {
        const node = this.nodeList[i];

        if (node.succesors.length === 1) {
            const sucesor = node.succesors[0];
            node.endLate = sucesor.startLate;
            node.startLate = node.endLate - node.time;
            node.slack = node.endLate - node.endEarly;
        } else {
            const minStartLate = Math.min(...node.succesors.map(sucesor => sucesor.startLate));
            node.endLate = minStartLate;
            node.startLate = node.endLate - node.time;
            node.slack = node.endLate - node.endEarly;
        }
    }
  }

  getSolveDataMatrix() {
    return this.nodeList.map(node => {
        const predecessorsTemp = node.predecessors.map(precesor => precesor.name).join(",");
        const succesorsTemp = node.succesors.map(sucesor => sucesor.name).join(",");

        return {
            name: node.name,
            predecessors: predecessorsTemp,
            succesors: succesorsTemp,
            time: node.time,
            slack: node.slack,
            startEarly: node.startEarly,
            startLate: node.startLate,
            endEarly: node.endEarly,
            endLate: node.endLate,
        };
    });
  }

  getCriticalRoutes(node, route = [], routes = []) {
    if (node === this.end) {
      routes.push([...route]);
      return;
    }
    for (const sucesor of node.succesors) {
      if (sucesor.slack === 0) {
        route.push(sucesor.name); // Agregar el sucesor a la ruta
        this.getCriticalRoutes(sucesor, route, routes); // Llamada recursiva
        route.pop(); // Retirar el sucesor al retroceder
      }
    }
    return routes; // Devolver todas las rutas críticas encontradas
  }

  reset () {
    this.start = this.start.addNode("Initial", [], 0);
    this.end = this.end.addNode("Finish", [], 0);
    this.nodeList = [];
  }

};

export class PertNode extends Node {
  optimisticTime
  mostProbableTime
  pessimisticTime
  variance

  constructor() {
    super();
    this.optimisticTime = 0;
    this.mostProbableTime = 0;
    this.pessimisticTime = 0;
    this.variance = 0;
  }

  init () {
    this.start = new PertNode().addNode("Initial", [], 0,0,0)
    this.end = new PertNode().addNode("Finish", [], 0,0,0)
    this.nodeList = [];
  }

  addNode(name, precesorChars, optimisticTime, mostProbableTime, pessimisticTime) {
    this.name = name;
    this.precesorChars = precesorChars;
    this.time = Math.round((optimisticTime + 4 * mostProbableTime + pessimisticTime) / 6);
    this.optimisticTime = optimisticTime;
    this.mostProbableTime = mostProbableTime;
    this.pessimisticTime = pessimisticTime;
    this.variance = parseFloat(Math.pow(((pessimisticTime - optimisticTime) / 6), 2).toFixed(3));
    return this; // Devuelve el objeto para permitir encadenamiento si es necesario
  }
};

export class PertCpm extends Cpm {

  standardDeviation

  constructor() { super() }

  init () {
    this.start = new PertNode().addNode("Initial", [], 0,0,0)
    this.end = new PertNode().addNode("Finish", [], 0,0,0)
    this.nodeList = [];
  }

  loadNodes (data) {
    data.forEach(([ name, predecessors, optimisticTime, mostProbableTime, pessimisticTime]) => {
      const predecessorsArray = predecessors ? predecessors.split(",").filter(Boolean) : [];
      const newActivity = new PertNode().addNode(name, predecessorsArray, optimisticTime, mostProbableTime, pessimisticTime)
      this.nodeList.push(newActivity);
    });
  }
  
  calculateStandardDeviation () {
    sum = 0;
    this.nodeList.forEach((node) => {
      sum += node.variance
    })
    return sum;
  }

  getSolveDataMatrix() {
    return this.nodeList.map(node => {
        const predecessorsTemp = node.predecessors.map(precesor => precesor.name).join(",");
        const succesorsTemp = node.succesors.map(sucesor => sucesor.name).join(",");

        return {
            name: node.name,
            predecessors: predecessorsTemp,
            succesors: succesorsTemp,
            optimisticTime: node.optimisticTime,
            mostProbableTime: node.mostProbableTime,
            pessimisticTime: node.pessimisticTime,
            variance: node.variance,
            time: node.time,
            slack: node.slack,
            startEarly: node.startEarly,
            startLate: node.startLate,
            endEarly: node.endEarly,
            endLate: node.endLate,
        };
    });
  }

  reset () {
    this.start = this.start.addNode("Initial", [], 0,0,0);
    this.end = this.end.addNode("Finish", [], 0,0,0);
    this.nodeList = [];
  }

};
