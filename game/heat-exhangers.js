const heatExchanger = {
  id: "basic-heat-exchanger",
  name: "Heat Exchanger",
  type: "heat-exchanger",
  transferRate: 5,
  heatTransferRatio: 0.95,
  maxHeat: 25,
  heat: 0,
  exploded: false,
  position: { x: 0, y: 0 },

  receiveHeat(source) {
    if (this.exploded || !source) {
      return 0;
    }

    const availableHeat = Math.max(0, Number(source.heat) || 0);
    const remainingCapacity = Math.max(0, this.maxHeat - this.heat);
    const heatReceived = Math.min(this.transferRate, availableHeat, remainingCapacity);

    source.heat -= heatReceived;
    this.heat += heatReceived;

    if (this.heat >= this.maxHeat) {
      this.explode();
    }

    return heatReceived;
  },

  sendHeat(destination) {
    if (this.exploded || !destination) {
      return 0;
    }

    const heatSent = this.heat * this.heatTransferRatio;
    this.heat -= heatSent;
    destination.heat = (Number(destination.heat) || 0) + heatSent;
    return heatSent;
  },

  explode() {
    this.exploded = true;
    this.heat = 0;
  },

  repair() {
    this.exploded = false;
    this.heat = 0;
  }
};

function createHeatExchanger(transferRate = 3, maxHeat = 25, position = { x: 0, y: 0 }) {
  return {
    ...heatExchanger,
    id: `heat-exchanger-${Date.now()}`,
    transferRate,
    maxHeat,
    position,
    heat: 0,
    exploded: false
  };
}

function isCardinallyAdjacent(first, second) {
  if (!first?.position || !second?.position) {
    return false;
  }

  const horizontalDistance = Math.abs(first.position.x - second.position.x);
  const verticalDistance = Math.abs(first.position.y - second.position.y);

  return horizontalDistance + verticalDistance === 1;
}

function transferFromExchanger(exchanger, destination) {
  if (!isCardinallyAdjacent(exchanger, destination)) {
    return { sent: 0, connected: false, remaining: exchanger.heat };
  }

  return {
    sent: exchanger.sendHeat(destination),
    connected: true,
    remaining: exchanger.heat
  };
}
