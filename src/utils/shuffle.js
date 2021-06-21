function shuffle(array) {
  // Shuffling the array
  for (let i = array.length - 1; i > 0; i--) {
    // pickup a random element
    const j = Math.floor(Math.random() * i);
    const tmp = array[i];

    // swap it with the current element
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

export default shuffle;
