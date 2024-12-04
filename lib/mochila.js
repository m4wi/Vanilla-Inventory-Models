export class Knapsack {
  constructor(maxWeight, weights, values) {
      this.maxWeight = maxWeight;
      this.weights = weights;
      this.values = values;
      this.bestSolution = [];
      this.trace = [];
      this.numNodes = 0;
      this.maxValue = 0;
  }

  solve() {
      const initialNode = this.createNode();
      this.fillKnapsack(initialNode);
      this.maxValue = this.calculateMaxValue();
      return {
        bestSolution : this.bestSolution,
        numNodes: this.numNodes,
        trace: this.trace,
        maxValue: this.maxValue
      };
  }

  calculateMaxValue() {
    let acumulator = 0;
    for (let i = 0; i < this.bestSolution.length; i++) {
      acumulator = acumulator + this.values[this.bestSolution[i]];
    }
    return acumulator;
  }

  createNode() {
      return {
          index: 0,
          prevIndex: 0,
          items: [],
          remainingWeight: this.maxWeight,
      };
  }

  fillKnapsack(node, level = -1) {
      level = this.traceNode(node, level);

      if (this.isBetterSolution(node)) {
          this.saveSolution(node);
      }

      for (let i = node.index; i < this.weights.length; i++) {
          const availableWeight = this.calculateRemainingWeight(node, i);
          if (availableWeight >= 0) {
              this.tryItem(node, i);
              this.fillKnapsack(node, level);
              this.undoItem(node, i);
          }
      }
  }

  isBetterSolution(node) {
      const currentValue = node.items.reduce((sum, item) => sum + this.values[item], 0);
      const bestValue = this.bestSolution.reduce((sum, item) => sum + this.values[item], 0);
      return currentValue > bestValue;
  }

  saveSolution(node) {
      this.bestSolution = [...node.items];
  }

  calculateRemainingWeight(node, itemIndex) {
      return node.remainingWeight - this.weights[itemIndex];
  }

  tryItem(node, itemIndex) {
      node.remainingWeight -= this.weights[itemIndex];
      node.prevIndex = node.index;
      node.index = itemIndex;
      node.items.push(itemIndex);
  }

  undoItem(node, itemIndex) {
      node.remainingWeight += this.weights[itemIndex];
      node.index = node.prevIndex;
      node.items.pop();
  }

  traceNode(node, level) {
      level++;
      this.numNodes++;
      const weight = node.items.reduce((sum, item) => sum + this.weights[item], 0);
      const value = node.items.reduce((sum, item) => sum + this.values[item], 0);
      this.trace.push(`Level: ${level}, Node: [${node.items}], Weight: ${weight}, Value: ${value}`);
      return level;
  }
}

// Example usage:
// const maxWeight = 4;
// const weights = [2, 3, 1];
// const values = [31, 47, 14];

// const knapsack = new Knapsack(maxWeight, weights, values);
// const solution = knapsack.solve();
// console.log(solution);
