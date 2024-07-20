import { ItemManager } from "../ItemManager.js";
import { delay, swap } from "../util.js";

async function selectionSort(manager: ItemManager, animationSpeed: number) {
  const array = manager.getItems();

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    array[i].setColor("blue");

    for (let j = i + 1; j < array.length; j++) {
      array[j].setColor("red");

      manager.paintItems();
      await delay(animationSpeed);
      if (!manager.isAnimationRunning()) return;

      if (array[j].getValue() < array[minIndex].getValue()) {
        minIndex = j;
      }

      array[j].setColor("white");
    }

    swap(array, i, minIndex);

    array[i].setColor("white");
    array[minIndex].setColor("white");
  }

  manager.paintItems();
  manager.stopAnimation();
}

export { selectionSort };
