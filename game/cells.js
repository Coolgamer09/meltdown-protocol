const uranium = {
  id: "uranium",
  name: "Uranium Cell",
  type: "cell",
  heat: 0,
  power: 0,
  heatPerTick: 1,
  timeLeft: 15,
  active: true,
  position: { x: 0, y: 0 },

  useOneTick() {
    if (!this.active) {
      return;
    }

    this.heat += this.heatPerTick;
    this.power += 1;
    this.timeLeft -= 1;

    if (this.timeLeft <= 0) {
      this.active = false;
      this.timeLeft = 0;
    }
  }
};

function createCells(count, heatPerTick, positions = []) {
  return Array.from({ length: count }, (_, index) => ({
    ...uranium,
    id: `uranium-${index + 1}`,
    heat: 0,
    power: 0,
    heatPerTick,
    timeLeft: 15,
    active: true,
    position: positions[index] || { x: index, y: 0 }
  }));
}
