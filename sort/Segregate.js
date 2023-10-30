// Segregate Positive and Negative Numbers 

function segregate(array, start, end) {
    if (end <= start) return;

    const mid = Math.floor((end + start) / 2);
    segregate(array, start, mid);
    segregate(array, mid + 1, end);
    merge(array, start, mid, end);
}

function merge(array, start, mid, end) {
    let i, j, k;
    const leftLength = mid - start + 1;
    const rightLength = end - mid;

    const leftArray = new Array(leftLength);
    const rightArray = new Array(rightLength);

    for (i = 0; i < leftLength; i++) {
        leftArray[i] = array[start + i];
    }

    for (j = 0; j < rightLength; j++) {
        rightArray[j] = array[mid + 1 + j];
    }

    i = 0;
    j = 0;
    k = start;

    while (i < leftLength && leftArray[i] <= 0) {
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightLength && rightArray[j] <= 0) {
        array[k] = rightArray[j];
        j++;
        k++;
    }

    while (i < leftLength) {
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightLength) {
        array[k] = rightArray[j];
        j++;
        k++;
    }
}

const array = [6, -5, 12, 10, -9, -1];

console.log(array.join(', '));
segregate(array, 0, array.length - 1);
console.log(array.join(', '));
