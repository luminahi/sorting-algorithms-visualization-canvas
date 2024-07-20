import { ItemManager } from "../ItemManager.js";
import { delay, swap } from "../util.js";

async function bubbleSort(manager: ItemManager, animationSpeed: number) {
  const array = manager.getItems();

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      array[i].setColor("blue");
      array[j].setColor("red");

      manager.paintItems();
      await delay(animationSpeed);
      if (!manager.isAnimationRunning()) return;

      array[i].setColor("white");
      array[j].setColor("white");

      if (array[i].getValue() > array[j].getValue()) {
        swap(array, i, j);
      }
    }
  }

  manager.paintItems();
  manager.stopAnimation();
}

export { bubbleSort };
