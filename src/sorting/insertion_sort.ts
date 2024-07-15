import { Item } from "../Item.js";
import { delay, swap } from "../util.js";

export async function insertionSort(
  array: Item[],
  fn: Function,
  animationSpeed: number
) {
  let i = 1;

  while (i < array.length) {
    let j = i;
    array[i].setColor("blue");
    let canContinue = fn(array);
    await delay(animationSpeed / 2);
    if (!canContinue) return;

    while (j > 0 && array[j - 1].getValue() > array[j].getValue()) {
      swap(array, j, j - 1);
      j--;

      array[j].setColor("red");
      let canContinue = fn(array);
      await delay(animationSpeed / 2);
      if (!canContinue) return;

      array[j].setColor("white");
    }
    array[i].setColor("white");
    i++;
  }

  fn(array);
}
