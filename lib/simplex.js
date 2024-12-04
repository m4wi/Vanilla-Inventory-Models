class SimplexMethod {
  // Coeficientes de la función objetivo
  objectiveFunctionCoefficients = []; // 0 = x , 1 = y

  // Matriz de restricciones (coeficientes de las variables en las restricciones)
  constraintMatrix = [];

  // Vector que indica el tipo de desigualdad en las restricciones (<=, >=, =)
  inequalitySigns = [];

  // Vector de resultados de las restricciones (lado derecho de las desigualdades)
  constraintResults = [];

  // Variables de holgura añadidas a las restricciones para convertirlas en igualdades
  slackVariables = [];

  // Vector Z (para cálculos del método simplex)
  zVector = [];

  // Método para inicializar los datos
  init (objectiveCoefficients, constraints, signs, results) {
    // Configura los coeficientes de la función objetivo
    this.objectiveFunctionCoefficients = objectiveCoefficients;
    // Configura la matriz de restricciones
    this.constraintMatrix = constraints;
    // Configura los signos de las desigualdades
    this.inequalitySigns = signs;
    // Configura los resultados del lado derecho de las restricciones
    this.constraintResults = results;
  }

  prepare () {
    this.objectiveFunctionCoefficients = this.objectiveFunctionCoefficients.map(coef => -coef);
    // Inicializa las variables de holgura
    this.addSlackVariables();
    // Calcula el vector Z inicial
    this.initializeZVector();
  }

  addSlackVariables() {
    // Reiniciar la matriz de variables de holgura
    this.slackVariables = [];
  
    // Crear una matriz identidad para las variables de holgura
    const numConstraints = this.constraintResults.length;
    for (let i = 0; i < numConstraints; i++) {
      const row = Array(numConstraints).fill(0); // Inicializa una fila de ceros
      row[i] = 1; // Establece 1 en la posición diagonal
      this.slackVariables.push(row);
    }
  }

  // Método para inicializar el vector Z
  initializeZVector() {
    // Crear un vector Z inicial vacío (dependiente de la cantidad de variables)
    this.zVector = Array(this.constraintResults.length + 1).fill(0);
    this.zVector[this.constraintResults.length + 1] = 1;
  }


  findPivotColumn() {
    let index = -1;
    let min = objectiveFunctionCoefficients[0];
    for (let i = 0; i < this.objectiveFunctionCoefficients.length ; i++) {
      if (min > objectiveFunctionCoefficients[i]) {
        min = this.objectiveFunctionCoefficients[i];
        index = i;
      }
    }
    return index;
  }
  
  findPivotRow(pivotColumn) {
    let index = -1;
    let min = +Infinity;
    for (let i = 0; i < this.constraintResults.length; i++) {
      let tmp = this.constraintResults[i] / this.constraintMatrix[i,pivotColumn]
      if (min > tmp) {
        min = tmp;
        index = i;
      }
    }
    return index;
  }

  
}
