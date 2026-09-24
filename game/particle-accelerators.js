const particleAccelerator = {
  id: "basic-particle-accelerator",
  name: "Basic Particle Accelerator",
  type: "particle-accelerator",
  transferRate: 10,
  researchPerHeat: 1,
  researchPoints: 0,
  position: { x: 0, y: 0 },

  passHeat(source, destination) {
    if (!source) {
      return { heatPassed: 0, researchGained: 0 };
    }

    const availableHeat = Math.max(0, Number(source.heat) || 0);
    const heatPassed = Math.min(this.transferRate, availableHeat);
    source.heat -= heatPassed;

    if (destination) {
      destination.heat = (Number(destination.heat) || 0) + heatPassed;
    }

    const researchGained = heatPassed * this.researchPerHeat;
    this.researchPoints += researchGained;
    return { heatPassed, researchGained };
  },

  reset() {
    this.researchPoints = 0;
  }
};

function createParticleAccelerator(transferRate = 10, position = { x: 0, y: 0 }) {
  return {
    ...particleAccelerator,
    id: `particle-accelerator-${Date.now()}`,
    transferRate,
    position,
    researchPoints: 0
  };
}
