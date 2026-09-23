let tick = 0;

function gameTick() {
  tick = tick + 1;

  console.log("Game tick:", tick);
}

// One game tick happens every 2 real-life seconds.
setInterval(gameTick, 2000);
