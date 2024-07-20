import { ItemManager } from "../ItemManager.js";
import { delay, swap } from "../util.js";

async function insertionSort(manager: ItemManager, animationSpeed: number) {
  const array = manager.getItems();

  let i = 1;

  while (i < array.length) {
    let j = i;
    array[i].setColor("blue");

    manager.paintItems();
    await delay(animationSpeed);
    if (!manager.isAnimationRunning()) return;

    while (j > 0 && array[j - 1].getValue() > array[j].getValue()) {
      swap(array, j, j - 1);
      j--;

      array[j].setColor("red");

      manager.paintItems();
      await delay(animationSpeed);
      if (!manager.isAnimationRunning()) return;

      array[j].setColor("white");
    }
    array[i].setColor("white");
    i++;
  }

  manager.paintItems();
  manager.stopAnimation();
}

export { insertionSort };
