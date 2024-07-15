import { Item } from "./Item.js";
import { delay } from "./util.js";

function swap(array: Item[], i: number, j: number) {
  let aux = array[i].getValue();
  array[i].setValue(array[j].getValue());
  array[j].setValue(aux);
}

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
