const heatPipe = {
  id: "basic-heat-pipe",
  name: "Heat Pipe",
  type: "pipe",
  transferRate: 3,
  heat: 0,

  moveHeat(source, destination) {
    if (!source || !destination) {
      return 0;
    }

    const availableHeat = Number(source.heat) || 0;
    const heatToMove = Math.min(this.transferRate, availableHeat);

    if (heatToMove <= 0) {
      return 0;
    }

    source.heat = availableHeat - heatToMove;
    destination.heat = (Number(destination.heat) || 0) + heatToMove;
    this.heat = heatToMove;

    return heatToMove;
  }
};

function createHeatPipe(transferRate = 3) {
  return {
    ...heatPipe,
    id: `heat-pipe-${Date.now()}`,
    transferRate,
    heat: 0
  };
}

function moveHeatBetween(source, destination, pipe = heatPipe) {
  return pipe.moveHeat(source, destination);
}
