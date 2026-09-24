const heatPlateDefs = {
  basic: {
    id: "basic-heat-plate",
    name: "Basic Heat Plate",
    type: "heat-plate",
    capacityBoost: 100,
    removalPercent: 0.01
  }
};

const heatPlateBank = {
  items: [],

  addBasicHeatPlate() {
    const plate = {
      ...heatPlateDefs.basic,
      id: `basic-heat-plate-${Date.now()}-${this.items.length + 1}`
    };

    this.items.push(plate);
    reactor.maxHeat += plate.capacityBoost;
    return plate;
  },

  currentRemovalRate() {
    return Math.min(
      1,
      this.items.reduce((total, plate) => total + plate.removalPercent, 0)
    );
  },

  reduceHeat(target) {
    if (!target || target.heat <= 0) {
      return 0;
    }

    const heatRemoved = Math.min(
      target.heat,
      target.heat * this.currentRemovalRate()
    );

    target.heat -= heatRemoved;
    return heatRemoved;
  },

  reset() {
    this.items = [];
    reactor.maxHeat = reactor.baseMaxHeat;
  }
};

function installHeatPlate() {
  return heatPlateBank.addBasicHeatPlate();
}
