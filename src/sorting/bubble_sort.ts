import { Item } from "../Item.js";
import { delay, swap } from "../util.js";

export async function bubbleSort(
  array: Item[],
  fn: Function,
  animationSpeed: number
) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      array[i].setColor("blue");
      array[j].setColor("red");
      let canContinue: boolean = fn(array);
      await delay(animationSpeed);

      array[i].setColor("white");
      array[j].setColor("white");

      if (!canContinue) return;

      if (array[i].getValue() > array[j].getValue()) {
        swap(array, i, j);
      }
    }
  }

  fn(array);
}
