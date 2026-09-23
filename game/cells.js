const uranium = {
  name: "uranium",
  type: "cell",

  heat: 0,
  power: 0,

  active: true,
  timeLeft: 15,

  produceHeatAndPower() {
    if (this.active === false) {
      return;
    }

    this.heat += 1;
    this.power += 1;
  },

  useTime() {
    this.timeLeft -= 1;

    if (this.timeLeft <= 0) {
      this.active = false;
      this.timeLeft = 0;
    }
  }
};
