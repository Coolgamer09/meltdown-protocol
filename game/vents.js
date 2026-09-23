const vent = {
  id: "vent",
  name: "vent",
  type: "vent",
  heat: 0,
  coolingPower: 5,

  useOneTick() {
    this.heat = this.heat - this.coolingPower;

    if (this.heat < 0) {
      this.heat = 0;
    }
  }
};
