const capacitorDefs = {
  basic: {
    id: "basic-capacitor",
    name: "Basic Capacitor",
    type: "capacitor",
    capacityBoost: 100,
    sellPercent: 0.01,
    powerStored: 0,
    count: 1
  }
};

const capacitorBank = {
  items: [],

  addBasicCapacitor() {
    const definition = capacitorDefs.basic;
    const capacitor = {
      ...definition,
      id: `basic-capacitor-${Date.now()}`,
      powerStored: 0
    };

    this.items.push(capacitor);
    reactor.maxStoredPower += capacitor.capacityBoost;
    return capacitor;
  },

  currentSellRate() {
    return this.items.reduce((total, capacitor) => total + capacitor.sellPercent, 0);
  },

  currentCapacityBoost() {
    return this.items.reduce((total, capacitor) => total + capacitor.capacityBoost, 0);
  }
};

function installCapacitor() {
  return capacitorBank.addBasicCapacitor();
}
