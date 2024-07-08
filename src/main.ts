import { Item } from "./Item.js";
import { bubbleSort } from "./Sorting.js";

addEventListener("DOMContentLoaded", (e) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  function generateItems(size: number) {
    const items: Item[] = new Array(size);

    for (let i = 0; i < items.length; i++) {
      const value = Math.ceil(Math.random() * 255);

      items[i] = new Item(30 * i, height / 2, 20, value, ctx, "white");
    }

    return items;
  }

  function printToScreen(items: Item[]) {
    ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    ctx.fillRect(0, 0, width, height);

    for (const item of items) {
      item.draw();
    }
  }

  const items = generateItems(32);

  bubbleSort(items, printToScreen);
});
