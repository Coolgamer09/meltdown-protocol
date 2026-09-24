let tick = 0;
let running = true;

const byId = (id) => document.getElementById(id);

function setText(id, value) {
  const element = byId(id);
  if (element) element.textContent = value;
}

function updateInterface() {
  const heat = Math.max(0, Number(reactor.heat) || 0);
  const maxHeat = Math.max(1, Number(reactor.maxHeat) || 1);
  const power = Math.max(0, Number(reactor.power) || 0);
  const status = reactor.exploded ? "exploded" : reactor.getHeatStatus();
  const statusElement = byId("status");
  const meter = byId("heat-meter");

  setText("level-value", reactor.level.toUpperCase());
  setText("life-value", reactor.life);
  setText("tick-value", tick);
  setText("heat-value", `${Math.round(heat)} / ${Math.round(maxHeat)}`);
  setText("power-value", `${Math.round(power)} / ${Math.round(reactor.maxStoredPower)}`);
  setText("production-value", `${reactor.heatPerTick} / tick`);
  setText("plates-value", typeof heatPlateBank === "undefined" ? 0 : heatPlateBank.items.length);
  setText("capacitor-value", typeof capacitorBank === "undefined" ? 0 : capacitorBank.items.length);
  setText("inlet-value", typeof inlet === "undefined" ? 0 : Math.round(inlet.heat));
  setText("outlet-value", typeof outlet === "undefined" ? 0 : Math.round(outlet.heat));
  setText("event-value", reactor.exploded ? "MELTDOWN — reset required" : reactor.lastEvent);

  if (statusElement) {
    statusElement.textContent = status.toUpperCase();
    statusElement.className = `status-badge status-${status.replaceAll(" ", "-")}`;
  }
  if (meter) {
    meter.style.width = `${Math.min(100, (heat / maxHeat) * 100)}%`;
    meter.style.background = status === "normal" ? "#58d68d" : "#ff4d5e";
  }
  const core = byId("core");
  if (core) core.classList.toggle("exploded", reactor.exploded);
}

function gameTick() {
  if (!running || reactor.exploded) {
    updateInterface();
    return;
  }

  tick += 1;
  reactor.runTick();

  if (typeof outlet !== "undefined") outlet.extractFromReactor(reactor);
  if (typeof capacitorBank !== "undefined") {
    reactor.power = Math.max(0, reactor.power * (1 - capacitorBank.currentSellRate()));
  }
  updateInterface();
}

function resetGame() {
  tick = 0;
  running = true;
  reactor.reset();
  if (typeof heatPlateBank !== "undefined") heatPlateBank.reset();
  if (typeof capacitorBank !== "undefined") {
    capacitorBank.items = [];
    reactor.maxStoredPower = 100;
  }
  if (typeof inlet !== "undefined") inlet.heat = 0;
  if (typeof outlet !== "undefined") outlet.heat = 0;
  const pauseButton = byId("pause-button");
  if (pauseButton) pauseButton.textContent = "Pause simulation";
  updateInterface();
}

byId("pause-button")?.addEventListener("click", () => {
  running = !running;
  byId("pause-button").textContent = running ? "Pause simulation" : "Resume simulation";
  updateInterface();
});
byId("reset-button")?.addEventListener("click", resetGame);
byId("plate-button")?.addEventListener("click", () => {
  if (typeof installHeatPlate !== "undefined") installHeatPlate();
  updateInterface();
});
byId("capacitor-button")?.addEventListener("click", () => {
  if (typeof installCapacitor !== "undefined") installCapacitor();
  updateInterface();
});
byId("level-select")?.addEventListener("change", (event) => {
  reactor.setLevel(event.target.value);
  updateInterface();
});

updateInterface();
setInterval(gameTick, 2000);
