let tick = 0;

function gameTick() {
  tick += 1;

  reactor.runTick();

  const heatMoved = moveHeatBetween(reactor, vent, heatExchanger);

  vent.useOneTick();

  console.log("Game tick:", tick);
  console.log({
    level: reactor.level,
    power: reactor.power,
    reactorHeat: reactor.heat,
    heatMoved,
    exchangerHeat: heatExchanger.heat,
    ventHeat: vent.heat,
    cellLife: reactor.life
  });
}

// One game tick happens every 2 real-life seconds.
setInterval(gameTick, 2000);
