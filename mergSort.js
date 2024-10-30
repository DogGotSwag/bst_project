function mergeSort(arr) {
  if (arr.length === 1) return arr;
  if (arr.length === 0) return [];
  let sortedArray = [];
  let leftHalf;
  let rightHalf;
  if (arr.length % 2 === 0) {
    leftHalf = mergeSort(arr.splice(0, arr.length / 2));
  } else {
    leftHalf = mergeSort(arr.splice(0, arr.length / 2 + 0.5));
  }
  rightHalf = mergeSort(arr);
  while ((leftHalf.length !== 0) & (rightHalf.length !== 0)) {
    leftHalf[0] <= rightHalf[0]
      ? sortedArray.push(leftHalf.shift())
      : sortedArray.push(rightHalf.shift());
  }
  if (leftHalf.length > 0) sortedArray = sortedArray.concat(leftHalf);
  if (rightHalf.length > 0) sortedArray = sortedArray.concat(rightHalf);

  return sortedArray;
}

export default mergeSort;
