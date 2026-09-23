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

const coolant = {
  id: "coolant",
  name: "coolant",
  type: "cell",
  heat: 0,
  power: 0,
  timeLeft: 15,
  active: true,

  useOneTick() {
    if (this.active === false) {
      return;
    }

    this.heat = this.heat - 1;
    this.power = this.power + 1;
    this.timeLeft = this.timeLeft - 1;

    if (this.timeLeft <= 0) {
      this.active = false;
      this.timeLeft = 0;
    }
  }
};

const reactorLevels = {
  single: [uranium],
  dual: [uranium, coolant],
  triple: [uranium, coolant, uranium],
  quad: [uranium, coolant, uranium, coolant]
};

const reactor = {
  level: "single",
  cells: reactorLevels.single
};

function runReactorTick() {
  for (const cell of reactor.cells) {
    cell.useOneTick();
  }
}

console.log("Reactor ready.");
console.log(reactor.cells);
