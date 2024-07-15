import { ItemManager } from "./ItemManager.js";
import { bubbleSort } from "./sorting/bubble_sort.js";
import { selectionSort } from "./sorting/selection_sort.js";
import { insertionSort } from "./sorting/insertion_sort.js";
import { getOptions } from "./util.js";

addEventListener("DOMContentLoaded", (e) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const form = document.getElementById("sort-form") as HTMLFormElement;

  const width = (canvas.width = 900);
  const height = (canvas.height = 600);

  let manager = new ItemManager(width, height, 60, ctx);
  manager.paintBackground();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { sorting, speed, mode } = getOptions(
      e.currentTarget as HTMLFormElement
    );

    switch (mode) {
      case "random":
        manager.generateItemsRandom();
        break;
      case "asc":
        manager.generateItemAscending();
        break;
      case "desc":
        manager.generateItemDescending();
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
        break;
      case "heap":
        break;
      default:
        manager.runAnimation(bubbleSort, speed);
    }
  });
});
