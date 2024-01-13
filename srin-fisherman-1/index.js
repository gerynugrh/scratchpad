/**
 * Description
 * @param {number} salary
 * @param {number} dryTime
 * @param {number[]} fishesPrice
 * @returns {any}
 */
function solve(salary, dryTime, fishesPrice) {
  const maxFisherman = Math.ceil(fishesPrice.length / dryTime);
  let maxProfit = 0;
  let maxProfitConfiguration;
  for (
    let fishermanCount = 1;
    fishermanCount <= maxFisherman;
    fishermanCount++
  ) {
    // Will create array of starting fisherman location
    // fisherman-0 will always assume the 0th index
    // example array = [1]
    // e.g. [0, 1, 5] where N = 10 In this case:
    // fisherman-0 is from 0-0
    // fisherman-1 is from 1-4
    // fisherman-2 is from 5-10
    const fishermanLocation = [
      0,
      ...Array.from({ length: fishermanCount - 1 }).map((_, i) => i + 1),
    ];
    for (let i = fishermanLocation.length - 1; i > 0; i--) {
      for (
        ;
        fishermanLocation[i] < (fishermanLocation[i + 1] || fishesPrice.length);
        fishermanLocation[i]++
      ) {
        let totalProfit = 0;
        for (
          let fishermanIdx = 0;
          fishermanIdx < fishermanCount;
          fishermanIdx++
        ) {
          // Calculate slices to determine fisherman zone
          // and sort the fishes in that zone to determine the price
          // then slice based on number of days fisherman was allowed to fish
          // then reduce to retrieve the profit for that fisherman
          const fishermanProfit = fishesPrice
            .slice(
              fishermanLocation[fishermanIdx],
              fishermanLocation[fishermanIdx + 1] || fishesPrice.length
            )
            .sort((a, b) => b - a)
            .slice(0, dryTime)
            .reduce((a, b) => a + b, 0);

          totalProfit += fishermanProfit - salary;
        }

        if (totalProfit > maxProfit) {
          maxProfit = totalProfit;
          maxProfitConfiguration = {
            fishermanLocation: fishermanLocation.join(","),
            fishermanCount,
          };
        }
      }
      fishermanLocation[i] = fishermanLocation[i - 1];
    }
  }

  return {
    maxFisherman,
    maxProfit,
    ...maxProfitConfiguration,
  };
}

// [1, 2]
// [1, 3]
// [1. 4]
// [1, 5]
// [1. 6]
// [1, 7]
// [1, 8]
// [1, 9]
// [1, 10]
// [1, 11]
// [1, 12]

console.info(solve(10, 2, [5, 0, 8, 0, 0, 2, 4, 8, 0, 6, 9, 4]));
console.info(solve(20, 1, [4, 8, 3, 2, 8]));
console.info(solve(5, 5, [4, 8, 3, 6, 8, 4, 10, 2]));
