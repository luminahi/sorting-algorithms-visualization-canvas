import { Item } from "./Item.js";
import { delay } from "./util.js";

export async function bubbleSort(
  array: Item[],
  fn: Function,
  animationSpeed: number
) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].getValue() > array[j].getValue()) {
        let aux = array[i].getValue();
        array[i].setValue(array[j].getValue());
        array[j].setValue(aux);

        await delay(animationSpeed);

        array[j].setColor("red");
        array[i].setColor("blue");

        let canContinue: boolean = fn(array);

        array[j].setColor("white");
        array[i].setColor("white");

        if (!canContinue) return;
      }
    }
  }

  fn(array);
}

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
      await delay(animationSpeed / 10);
      if (!canContinue) return;

      if (array[j].getValue() < array[minIndex].getValue()) {
        minIndex = j;
      }

      array[j].setColor("white");
    }

    let aux = array[i].getValue();
    array[i].setValue(array[minIndex].getValue());
    array[minIndex].setValue(aux);

    array[i].setColor("white");
    array[minIndex].setColor("white");
  }

  fn(array);
}
