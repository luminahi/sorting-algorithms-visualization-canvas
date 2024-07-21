import { ItemManager } from "./ItemManager.js";
import { bubbleSort } from "./sorting/bubbleSort.js";
import { selectionSort } from "./sorting/selectionSort.js";
import { insertionSort } from "./sorting/insertionSort.js";
import { getOptions } from "./util.js";
import { heapSort } from "./sorting/heapSort.js";
import { mergeSort } from "./sorting/mergeSort.js";

addEventListener("DOMContentLoaded", (e) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const form = document.getElementById("sort-form") as HTMLFormElement;
  const sortBtn = document.getElementById("sort-btn") as HTMLButtonElement;

  const width = (canvas.width = 900);
  const height = (canvas.height = 600);

  let manager = new ItemManager(width, height, 60, ctx, sortBtn);
  manager.paintBackground();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (manager.isAnimationRunning()) {
      manager.stopAnimation();
      manager.paintBackground();
      return;
    }

    const { sorting, speed, mode } = getOptions(
      e.currentTarget as HTMLFormElement
    );

    switch (mode) {
      case "random":
        manager.generateItemsRandom();
        break;
      case "asc":
        manager.generateItemsAscending();
        break;
      case "desc":
        manager.generateItemsDescending();
        break;
      default:
        manager.generateItemsRandom();
    }

    switch (sorting) {
      case "bubble":
        manager.runAnimation(bubbleSort, speed);
        break;
      case "selection":
        manager.runAnimation(selectionSort, speed);
        break;
      case "insertion":
        manager.runAnimation(insertionSort, speed);
        break;
      case "merge":
        manager.runAnimation(mergeSort, speed);
        break;
      case "heap":
        manager.runAnimation(heapSort, speed);
        break;
      default:
        manager.runAnimation(bubbleSort, speed);
    }
  });
});
