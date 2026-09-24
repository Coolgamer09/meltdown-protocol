const MAX_REACTOR_HEAT = 100;

const reactorLevels = {
  single: { levelName: "single", uranium: 1, heatPerTick: 1, powerPerTick: 1, life: 15 },
  dual: { levelName: "dual", uranium: 2, heatPerTick: 4, powerPerTick: 4, life: 20 },
  triple: { levelName: "triple", uranium: 4, heatPerTick: 6, powerPerTick: 6, life: 30 },
  quad: { levelName: "quad", uranium: 7, heatPerTick: 8, powerPerTick: 8, life: 50 }
};

function getReactorHeatStatus(heatValue) {
  if (heatValue >= MAX_REACTOR_HEAT) return "exploded";
  if (heatValue >= 76) return "critical";
  if (heatValue >= 51) return "highly dangerous";
  if (heatValue >= 26) return "concerning";
  return "normal";
}

const reactor = {
  level: "single",
  heat: 0,
  power: 0,
  life: reactorLevels.single.life,
  uranium: reactorLevels.single.uranium,
  heatPerTick: reactorLevels.single.heatPerTick,
  powerPerTick: reactorLevels.single.powerPerTick,
  maxHeat: MAX_REACTOR_HEAT,
  lastEvent: "ready",
  exploded: false,

  getHeatStatus() {
    return getReactorHeatStatus(this.heat);
  },

  setLevel(levelName) {
    const level = reactorLevels[levelName];
    if (!level) return;

    this.level = levelName;
    this.uranium = level.uranium;
    this.heatPerTick = level.heatPerTick;
    this.powerPerTick = level.powerPerTick;
    this.life = level.life;
    this.lastEvent = "level changed";
    window.dispatchEvent(new CustomEvent("reactor:level-changed"));
  },

  runTick({ heat = this.heatPerTick } = {}) {
    if (this.exploded || this.life <= 0) return false;

    this.heat += heat;
    this.power += this.powerPerTick;
    this.life = Math.max(0, this.life - 1);

    if (this.heat >= this.maxHeat) {
      this.explode();
      return false;
    }

    this.lastEvent = this.getHeatStatus();
    return true;
  },

  explode() {
    this.exploded = true;
    this.lastEvent = "exploded";
    this.heat = 0;
    this.power = 0;
    this.life = 0;
  },

  reset() {
    this.exploded = false;
    this.lastEvent = "ready";
    this.heat = 0;
    this.power = 0;
    this.level = "single";
    this.uranium = reactorLevels.single.uranium;
    this.heatPerTick = reactorLevels.single.heatPerTick;
    this.powerPerTick = reactorLevels.single.powerPerTick;
    this.life = reactorLevels.single.life;
    window.dispatchEvent(new CustomEvent("reactor:level-changed"));
  }
};
