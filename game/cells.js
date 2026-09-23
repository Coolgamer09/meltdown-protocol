const uranium = {
  id: "uranium",
  name: "uranium",
  type: "cell",
  heat: 0,
  power: 0,
  timeLeft: 15,
  active: true,

  useOneTick() {
    if (this.active === false) {
      return;
    }

    this.heat = this.heat + 1;
    this.power = this.power + 1;
    this.timeLeft = this.timeLeft - 1;

    if (this.timeLeft <= 0) {
      this.active = false;
      this.timeLeft = 0;
    }
  }
};

const reactorLevels = {
  single: {
    cellCount: 1,
    uranium: 1,
    heatPerTick: 1,
    powerPerTick: 1,
    life: 15
  },

  dual: {
    cellCount: 2,
    uranium: 2,
    heatPerTick: 2,
    powerPerTick: 2,
    life: 15
  },

  triple: {
    cellCount: 3,
    uranium: 4,
    heatPerTick: 3,
    powerPerTick: 3,
    life: 18
  },

  quad: {
    cellCount: 4,
    uranium: 7,
    heatPerTick: 4,
    powerPerTick: 4,
    life: 20
  }
};

const reactor = {
  level: "single",
  heat: 0,
  power: 0,
  life: reactorLevels.single.life,
  uranium: reactorLevels.single.uranium,

  runTick() {
    if (this.life <= 0) {
      return;
    }

    this.heat = this.heat + this.heatPerTick;
    this.power = this.power + this.powerPerTick;
    this.life = this.life - 1;

    if (this.life <= 0) {
      this.life = 0;
    }
  },

  setLevel(levelName) {
    const level = reactorLevels[levelName];

    if (!level) {
      return;
    }

    this.level = levelName;
    this.uranium = level.uranium;
    this.heatPerTick = level.heatPerTick;
    this.powerPerTick = level.powerPerTick;
    this.life = level.life;
  }
};

console.log("Reactor ready.");
console.log(reactorLevels);
