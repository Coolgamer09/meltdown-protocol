let tick = 0;
let cells = [];

const componentLayout = {
  cells: [{ x: 0, y: 0 }],
  heatExchanger: { x: 1, y: 0 },
  vent: { x: 2, y: 0 }
};

function setupCells() {
  const count = reactor.uranium;
  const heatPerCell = reactor.heatPerTick / count;
  cells = createCells(count, heatPerCell, componentLayout.cells);
}

function gameTick() {
  tick += 1;

  if (reactor.exploded || heatExchanger.exploded) {
    updateDisplay();
    return;
  }

  cells.forEach((cell) => cell.useOneTick());

  let uncontainedHeat = 0;
  cells.forEach((cell) => {
    if (isCardinallyAdjacent(cell, heatExchanger)) {
      heatExchanger.receiveHeat(cell);
    } else {
      uncontainedHeat += cell.heat;
      cell.heat = 0;
    }
  });

  reactor.runTick({ heat: uncontainedHeat });

  const heatMoved = moveHeatBetween(heatExchanger, vent, heatExchanger);
  vent.useOneTick();

  updateDisplay();
  console.log("Game tick:", tick, {
    reactorHeat: reactor.heat,
    heatMoved,
    exchangerHeat: heatExchanger.heat,
    ventHeat: vent.heat
  });
}

function updateDisplay() {
  window.dispatchEvent(new CustomEvent("reactor:update", {
    detail: { tick, cells, reactor, heatExchanger, vent }
  }));
}

window.addEventListener("reactor:level-changed", setupCells);
setupCells();
updateDisplay();
setInterval(gameTick, 2000);
