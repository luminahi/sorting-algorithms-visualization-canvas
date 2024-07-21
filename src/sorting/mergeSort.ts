import { Item } from "../Item.js";
import { ItemManager } from "../ItemManager.js";
import { delay } from "../util.js";

async function merge(
  array: Item[],
  start: number,
  mid: number,
  end: number,
  manager: ItemManager,
  animationSpeed: number
) {
  const size = end - start + 1;
  let indexStart = start;
  let indexMid = mid + 1;
  let indexAux = 0;

  const arrayAux = new Array(size);

  while (indexStart <= mid && indexMid <= end) {
    if (array[indexStart].getValue() < array[indexMid].getValue()) {
      arrayAux[indexAux] = array[indexStart].getValue();
      indexStart++;
    } else {
      arrayAux[indexAux] = array[indexMid].getValue();
      indexMid++;
    }

    indexAux++;
  }

  while (indexStart <= mid) {
    arrayAux[indexAux] = array[indexStart].getValue();
    indexAux++;
    indexStart++;
  }

  while (indexMid <= end) {
    arrayAux[indexAux] = array[indexMid].getValue();
    indexAux++;
    indexMid++;
  }

  for (indexAux = start; indexAux <= end; indexAux++) {
    array[indexAux].setValue(arrayAux[indexAux - start]);

    array[indexAux].setColor("blue");
    manager.paintItems();

    await delay(animationSpeed);

    array[indexAux].setColor("white");
    manager.paintItems();

    if (!manager.isAnimationRunning()) {
      manager.paintBackground();
      return;
    }
  }
}

async function mergeSort(
  array: Item[],
  start: number,
  end: number,
  manager: ItemManager,
  animationSpeed: number
) {
  if (start < end && manager.isAnimationRunning()) {
    const mid = ((end + start) / 2) | 0;

    await mergeSort(array, start, mid, manager, animationSpeed);
    await mergeSort(array, mid + 1, end, manager, animationSpeed);

    await merge(array, start, mid, end, manager, animationSpeed);
  }
}

async function main(manager: ItemManager, animationSpeed: number) {
  const array = manager.getItems();

  await mergeSort(array, 0, array.length - 1, manager, animationSpeed);
  // manager.paintBackground();
  manager.stopAnimation();
}

export { main as mergeSort };
