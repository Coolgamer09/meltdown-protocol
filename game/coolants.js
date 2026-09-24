const coolant = {
  id: "basic-coolant-tank",
  name: "Coolant Buffer",
  type: "coolant",
  maxHeat: 100,
  heat: 0,
  transferRate: 10,
  position: { x: 2, y: 0 },

  receiveHeat(source) {
    if (!source) {
      return 0;
    }

    const availableHeat = Math.max(0, Number(source.heat) || 0);
    const remainingCapacity = Math.max(0, this.maxHeat - this.heat);
    const heatReceived = Math.min(this.transferRate, availableHeat, remainingCapacity);

    source.heat -= heatReceived;
    this.heat += heatReceived;
    return heatReceived;
  },

  sendHeat(destination) {
    if (!destination) {
      return 0;
    }

    const heatSent = Math.min(this.transferRate, this.heat);
    this.heat -= heatSent;
    destination.heat = (Number(destination.heat) || 0) + heatSent;
    return heatSent;
  },

  // The coolant remains a buffer: it holds heat instead of deleting it.
  // It only releases heat when a nearby destination is explicitly provided.
  balanceWith(source, destination) {
    const received = this.receiveHeat(source);
    const sent = this.sendHeat(destination);

    return {
      received,
      sent,
      heat: this.heat,
      full: this.heat >= this.maxHeat
    };
  },

  reset() {
    this.heat = 0;
  }
};

function createCoolant(maxHeat = 100, transferRate = 10, position = { x: 0, y: 0 }) {
  return {
    ...coolant,
    id: `coolant-${Date.now()}`,
    maxHeat,
    transferRate,
    position,
    heat: 0
  };
}
