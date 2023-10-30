//  fractional  knapsack 

function knapsack(items, capacity) {
    const n = items.length;
    const dp = new Array(n + 1).fill().map(() => new Array(capacity + 1).fill(0));
  
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        const item = items[i - 1];
        if (item.weight <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.value);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    const selectedItems = [];
    let w = capacity;
  
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        const item = items[i - 1];
        selectedItems.push(item);
        w -= item.weight;
      }
    }
  
    return {
      maxValue: dp[n][capacity],
      selectedItems: selectedItems,
    };
  }
  
  // Example usage:
  const items = [
    { weight: 2, value: 10 },
    { weight: 3, value: 5 },
    { weight: 5, value: 15 },
    { weight: 7, value: 7 },
    { weight: 1, value: 6 },
  ];
  
  const capacity = 10;
  
  const result = knapsack(items, capacity);
  
  console.log('Max Value:', result.maxValue);
  console.log('Selected Items:', result.selectedItems);
  