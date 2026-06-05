const times = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM", "12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM"];
const numPoints = 80;
const interval = (numPoints - 1) / (times.length - 1);

let amz = 75, wal = 40, bb = 30, tgt = 25, eby = 8;
const data = [];

// seeded random to be deterministic but look random
let seed = 12345;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

for (let i = 0; i < numPoints; i++) {
  let time = "";
  for (let j = 0; j < times.length; j++) {
    if (Math.abs(i - j * interval) < 0.5) {
      time = times[j];
    }
  }

  amz = Math.min(95, Math.max(65, amz + (random() * 8 - 4)));
  wal = Math.min(65, Math.max(35, wal + (random() * 6 - 3)));
  bb = Math.min(50, Math.max(25, bb + (random() * 5 - 2.5)));
  tgt = Math.min(40, Math.max(15, tgt + (random() * 4 - 2)));
  eby = Math.min(20, Math.max(2, eby + (random() * 3 - 1.5)));

  data.push({
    time,
    amazon: Number(amz.toFixed(1)),
    walmart: Number(wal.toFixed(1)),
    bestBuy: Number(bb.toFixed(1)),
    target: Number(tgt.toFixed(1)),
    ebay: Number(eby.toFixed(1)),
  });
}

console.log("const usageData = " + JSON.stringify(data, null, 2) + ";");
