const assert = require('assert');

function countBatteriesByHealth(presentCapacities) {
  let healthy = 0;
  let exchange = 0;
  let failed = 0;
  const ratedCapacity = 120;

  for (let capacity of presentCapacities) {
    const soh = (capacity / ratedCapacity) * 100;
    if (soh > 83) {
      healthy++;
    } else if (soh >= 63) {
      exchange++;
    } else {
      failed++;
    }
  }

  return {
    healthy: healthy,
    exchange: exchange,
    failed: failed
  };
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);
  console.log("Done counting :)");

  // Additional tests for boundary conditions
  console.log('Testing boundary conditions...');
  // soh = 83: 100*83/120 = 69.166 -> exchange
  counts = countBatteriesByHealth([83]);
  assert(counts["healthy"] == 0);
  assert(counts["exchange"] == 1);
  assert(counts["failed"] == 0);

  // soh = 84: 100*84/120 = 70 -> exchange
  counts = countBatteriesByHealth([84]);
  assert(counts["healthy"] == 0);
  assert(counts["exchange"] == 1);
  assert(counts["failed"] == 0);

  // soh >83: 100*101/120 = 84.166 -> healthy
  counts = countBatteriesByHealth([101]);
  assert(counts["healthy"] == 1);
  assert(counts["exchange"] == 0);
  assert(counts["failed"] == 0);

  // soh = 63: 100*63/120 = 52.5 -> failed
  counts = countBatteriesByHealth([63]);
  assert(counts["healthy"] == 0);
  assert(counts["exchange"] == 0);
  assert(counts["failed"] == 1);

  // soh = 75.6: 100*75.6/120 = 63 -> exchange
  counts = countBatteriesByHealth([75.6]);
  assert(counts["healthy"] == 0);
  assert(counts["exchange"] == 1);
  assert(counts["failed"] == 0);

  // soh = 62.9: 100*62.9/120 ≈52.416 -> failed
  counts = countBatteriesByHealth([62.9]);
  assert(counts["healthy"] == 0);
  assert(counts["exchange"] == 0);
  assert(counts["failed"] == 1);

  console.log("All boundary tests passed!");
}

testBucketingByHealth();
