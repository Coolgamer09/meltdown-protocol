let tick = 0;
let cells = [];

const componentLayout = {
  cells: [{ x: 0, y: 0 }],
  heatExchanger: { x: 1, y: 0 },
  coolant: { x: 2, y: 0 },
  vent: { x: 3, y: 0 }
};

heatExchanger.position = componentLayout.heatExchanger;
coolant.position = componentLayout.coolant;
vent.position = componentLayout.vent;

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
      // Heat from an unconnected cell enters the reactor; it is not deleted.
      uncontainedHeat += cell.heat;
      cell.heat = 0;
    }
  });

  reactor.runTick({ heat: uncontainedHeat });

  // Exchanger -> coolant is allowed only across one cardinal slot.
  transferFromExchanger(heatExchanger, coolant);

  // Coolant -> vent is also restricted to one cardinal slot. The coolant
  // retains any heat that cannot be accepted by a nearby destination.
  if (isCardinallyAdjacent(coolant, vent)) {
    coolant.sendHeat(vent);
  }

  vent.useOneTick();
  updateDisplay();

  console.log("Game tick:", tick, {
    reactorHeat: reactor.heat,
    exchangerHeat: heatExchanger.heat,
    coolantHeat: coolant.heat,
    ventHeat: vent.heat
  });
}

function updateDisplay() {
  window.dispatchEvent(new CustomEvent("reactor:update", {
    detail: { tick, cells, reactor, heatExchanger, coolant, vent }
  }));
}

window.addEventListener("reactor:level-changed", setupCells);
setupCells();
updateDisplay();
setInterval(gameTick, 2000);
