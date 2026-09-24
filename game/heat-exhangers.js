const heatPipe = {
  id: "basic-heat-pipe",
  name: "Heat Exchanger",
  type: "pipe",
  transferRate: 5,
  heatTransferRatio: 0.95,
  maxHeat: 25,
  heat: 0,
  exploded: false,

  receiveHeat(source) {
    if (this.exploded || !source) {
      return 0;
    }

    const availableHeat = Math.max(0, Number(source.heat) || 0);
    const remainingCapacity = this.maxHeat - this.heat;
    const heatReceived = Math.min(this.transferRate, availableHeat, remainingCapacity);

    source.heat = availableHeat - heatReceived;
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

    // Exchangers discharge 95% of their stored heat each tick. The remaining
    // 5% represents transfer loss and keeps future coolant destinations
    // compatible with the same interface.
    const heatSent = this.heat * this.heatTransferRatio;

    this.heat -= heatSent;
    destination.heat = (Number(destination.heat) || 0) + heatSent;

    return heatSent;
  },

  moveHeat(source, destination) {
    const heatReceived = this.receiveHeat(source);

    if (this.exploded) {
      return {
        received: heatReceived,
        sent: 0,
        exploded: true
      };
    }

    const heatSent = this.sendHeat(destination);

    return {
      received: heatReceived,
      sent: heatSent,
      remaining: this.heat,
      exploded: false
    };
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

function createHeatPipe(transferRate = 3, maxHeat = 25) {
  return {
    ...heatPipe,
    id: `heat-pipe-${Date.now()}`,
    transferRate,
    maxHeat,
    heat: 0,
    exploded: false
  };
}

function moveHeatBetween(source, destination, pipe = heatPipe) {
  return pipe.moveHeat(source, destination);
}
