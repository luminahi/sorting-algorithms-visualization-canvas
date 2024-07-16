import { Item } from "../Item.js";
import { delay, swap } from "../util.js";

export async function selectionSort(
  array: Item[],
  fn: Function,
  animationSpeed: number
) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    array[i].setColor("blue");

    for (let j = i + 1; j < array.length; j++) {
      array[j].setColor("red");
      let canContinue: boolean = fn(array);
      await delay(animationSpeed);
      if (!canContinue) return;

      if (array[j].getValue() < array[minIndex].getValue()) {
        minIndex = j;
      }

      array[j].setColor("white");
    }

    swap(array, i, minIndex);

    array[i].setColor("white");
    array[minIndex].setColor("white");
  }

  fn(array);
}
