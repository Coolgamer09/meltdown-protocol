let tick = 0;

function gameTick() {
  tick = tick + 1;

  // The cell creates heat and power first.
  reactor.runTick();

  // The pipe moves heat from the reactor into the vent.
  const heatMoved = moveHeatBetween(reactor, vent, heatPipe);

  // The vent removes heat from itself.
  vent.useOneTick();

  console.log("Game tick:", tick);
  console.log({
    level: reactor.level,
    power: reactor.power,
    reactorHeat: reactor.heat,
    heatMoved,
    ventHeat: vent.heat,
    cellLife: reactor.life
  });
}

// One game tick happens every 2 real-life seconds.
setInterval(gameTick, 2000);
