const reflector = {
  id: "basic-reflector",
  name: "Basic Reflector",
  type: "reflector",
  heatShare: 0.05,
  powerMultiplier: 1,
  position: { x: 0, y: 0 },

  reflectCellHeat(cell) {
    if (!cell || !cell.active) {
      return { heatTaken: 0, powerGained: 0 };
    }

    const heatTaken = Math.min(cell.heat, cell.heat * this.heatShare);
    cell.heat -= heatTaken;
    const powerGained = heatTaken * this.powerMultiplier;
    return { heatTaken, powerGained };
  }
};

function createReflector(position = { x: 0, y: 0 }) {
  return { ...reflector, id: `reflector-${Date.now()}`, position };
}
