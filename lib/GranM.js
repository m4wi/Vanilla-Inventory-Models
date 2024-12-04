export class GranM {
  constructor(c, A, b, signs) {
      this.c = c; // Coeficientes de la función objetivo
      this.A = A; // Matriz de restricciones
      this.b = b; // Lado derecho de las restricciones
      this.signs = signs; // Array de signos para las restricciones
      this.M = 1e6; // Valor grande para la Gran M
      this.tableau = []; // Tabla simplex
      this.variables = []; // Variables básicas y no básicas
  }

  initialize() {
      const m = this.A.length;
      const n = this.A[0].length;
      let artificialVars = [];
      let slackAndSurplusVars = [];
      
      // Procesamos las restricciones
      for (let i = 0; i < m; i++) {
          const sign = this.signs[i];
          if (sign === 0) { // Restricción de igualdad: agregar variable artificial
              artificialVars.push(n + slackAndSurplusVars.length);
              this.A[i].push(1); // Variable artificial
              this.c.push(this.M); // Gran M
          } else if (sign === 1) { // Restricción de tipo >=: agregar variable artificial
              artificialVars.push(n + slackAndSurplusVars.length);
              this.A[i].push(-1); // Variable artificial
              this.c.push(this.M); // Gran M
          } else { // Restricción de tipo <=: agregar variable de holgura
              slackAndSurplusVars.push(n + slackAndSurplusVars.length);
              this.A[i].push(0); // Variable de holgura
              this.c.push(0); // Coeficiente cero en la función objetivo
          }
      }

      // Agregar variables no básicas (variables de decisión originales)
      this.variables = [...Array(n).keys(), ...slackAndSurplusVars, ...artificialVars];
      this.tableau = this.A.map((row, i) => [...row, this.b[i]]);
      this.tableau.push([...this.c, 0]);
  }

  optimize() {
      while (true) {
          const lastRow = this.tableau[this.tableau.length - 1];
          const pivotCol = this.findPivotColumn(lastRow);
          if (pivotCol === -1) break; // Óptimo alcanzado

          const pivotRow = this.findPivotRow(pivotCol);
          if (pivotRow === -1) throw new Error("El problema no tiene solución óptima.");

          this.pivot(pivotRow, pivotCol);
      }
      return this.getSolution();
  }

  findPivotColumn(lastRow) {
      let min = 0;
      let pivotCol = -1;
      for (let j = 0; j < lastRow.length - 1; j++) {
          if (lastRow[j] < min) {
              min = lastRow[j];
              pivotCol = j;
          }
      }
      return pivotCol;
  }

  findPivotRow(pivotCol) {
      let minRatio = Infinity;
      let pivotRow = -1;
      for (let i = 0; i < this.tableau.length - 1; i++) {
          const value = this.tableau[i][pivotCol];
          if (value > 0) {
              const ratio = this.tableau[i][this.tableau[i].length - 1] / value;
              if (ratio < minRatio) {
                  minRatio = ratio;
                  pivotRow = i;
              }
          }
      }
      return pivotRow;
  }

  pivot(pivotRow, pivotCol) {
      const pivotValue = this.tableau[pivotRow][pivotCol];
      this.tableau[pivotRow] = this.tableau[pivotRow].map(val => val / pivotValue);

      for (let i = 0; i < this.tableau.length; i++) {
          if (i !== pivotRow) {
              const factor = this.tableau[i][pivotCol];
              this.tableau[i] = this.tableau[i].map((val, j) =>
                  val - factor * this.tableau[pivotRow][j]
              );
          }
      }
  }

  getSolution() {
      const m = this.A.length;
      const n = this.variables.length - m;
      const solution = Array(n).fill(0);

      for (let i = 0; i < this.tableau.length - 1; i++) {
          const basicVarIndex = this.variables.findIndex(varIndex => this.tableau[i][varIndex] === 1);
          if (basicVarIndex < n) {
              solution[basicVarIndex] = this.tableau[i][this.tableau[i].length - 1];
          }
      }
      return { solution, objective: -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1] };
  }
}