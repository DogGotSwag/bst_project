function removeDupe(arr) {
  let inside = [];
  for (let i = 0; i < arr.length; i++) {
    if (!inside.includes(arr[i])) inside.push(arr[i]);
  }
  return inside;
}

export default removeDupe;
