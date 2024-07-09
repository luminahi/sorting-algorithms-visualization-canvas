import { ItemManager } from "./ItemManager.js";
import { bubbleSort } from "./Sorting.js";

function getOptions(form: HTMLFormElement) {
  const formData = new FormData(form);

  const formSpeed = formData.get("speed") ?? 1;
  const formSorting = formData.get("sorting") ?? "bubble";

  const speed = 100 / Number.parseInt(formSpeed.toString());
  const sorting = formSorting.valueOf();

  return { speed, sorting };
}

addEventListener("DOMContentLoaded", (e) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const form = document.getElementById("sort-form") as HTMLFormElement;

  // const width = (canvas.width = window.innerWidth);
  // const height = (canvas.height = window.innerHeight);
  const width = (canvas.width = 900);
  const height = (canvas.height = 600);

  let manager = new ItemManager(width, height, 60, ctx);
  manager.generateItems();
  manager.printToScreen();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (manager.isAnimationRunning()) {
      manager.stopAnimation();
      manager = new ItemManager(width, height, 60, ctx);
      manager.generateItems();
    }

    const { sorting, speed } = getOptions(e.currentTarget as HTMLFormElement);

    switch (sorting) {
      case "bubble":
        manager.runAnimation(bubbleSort, speed);
        break;
      case "selection":
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
