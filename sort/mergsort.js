// Merge Sort 

function mergeSort(array, start, end) {
    if (end <= start) return;

    const midpoint = Math.floor((end + start) / 2);
    mergeSort(array, start, midpoint);
    mergeSort(array, midpoint + 1, end);
    merge(array, start, midpoint, end);
}

function merge(array, start, midpoint, end) {
    const leftLength = midpoint - start + 1;
    const rightLength = end - midpoint;

    const leftArray = new Array(leftLength);
    const rightArray = new Array(rightLength);

    for (let i = 0; i < leftLength; i++) {
        leftArray[i] = array[start + i];
    }

    for (let j = 0; j < rightLength; j++) {
        rightArray[j] = array[midpoint + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = start;

    while (i < leftLength && j < rightLength) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
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

const array = [8, 65, 9, 7, 3, 5, 54];

console.log(array.join(', '));
mergeSort(array, 0, array.length - 1);
console.log(array.join(', '));
