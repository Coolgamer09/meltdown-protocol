const inlet = {
  id: "basic-heat-inlet",
  name: "Heat Inlet",
  type: "inlet",
  activationHeat: 50,
  transferRate: 50,
  heat: 0,
  position: { x: 0, y: 0 },

  receiveHeat(source) {
    if (!source) return 0;
    const received = Math.min(this.transferRate, Math.max(0, Number(source.heat) || 0));
    source.heat -= received;
    this.heat += received;
    return received;
  },

  injectIntoReactor(target) {
    if (!target || this.heat < this.activationHeat) return 0;
    const injected = Math.min(this.transferRate, this.heat);
    this.heat -= injected;
    target.heat += injected;
    return injected;
  }
};

const outlet = {
  id: "basic-heat-outlet",
  name: "Heat Outlet",
  type: "outlet",
  activationHeat: 55,
  transferRate: 55,
  heat: 0,
  position: { x: 0, y: 0 },

  extractFromReactor(source) {
    if (!source || source.heat < this.activationHeat) return 0;
    const extracted = Math.min(this.transferRate, source.heat);
    source.heat -= extracted;
    this.heat += extracted;
    return extracted;
  },

  sendHeat(destination) {
    if (!destination) return 0;
    const sent = Math.min(this.transferRate, this.heat);
    this.heat -= sent;
    destination.heat = (Number(destination.heat) || 0) + sent;
    return sent;
  }
};
