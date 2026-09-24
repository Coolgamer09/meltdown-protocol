let tick = 0;

function gameTick() {
  tick += 1;

  if (!reactor.exploded) {
    reactor.runTick();

    if (typeof capacitorBank !== "undefined") {
      const soldPower = reactor.power * capacitorBank.currentSellRate();
      reactor.power -= soldPower;
    }
  }

  console.log("Game tick:", tick, {
    reactorHeat: reactor.heat,
    maxHeat: reactor.maxHeat,
    reactorPower: reactor.power,
    maxStoredPower: reactor.maxStoredPower,
    heatPlates: typeof heatPlateBank === "undefined" ? 0 : heatPlateBank.items.length
  });
}

setInterval(gameTick, 2000);
