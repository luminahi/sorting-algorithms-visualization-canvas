import { Item } from "./Item.js";

export class ItemManager {
  private items: Item[];
  private screenWidth: number;
  private screenHeight: number;
  private arraySize: number;
  private ctx: CanvasRenderingContext2D;
  private isRunning: boolean;

  public constructor(
    screenWidth: number,
    screenHeight: number,
    arraySize: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.arraySize = arraySize;
    this.ctx = ctx;
    this.isRunning = false;
  }

  public printToScreen() {
    this.ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    for (const item of this.items) item.draw();
  }

  public generateItems() {
    this.items = new Array(this.arraySize);

    for (let i = 0; i < this.arraySize; i++) {
      const value = Math.ceil(Math.random() * 512);

      this.items[i] = new Item(
        15 * i + 2,
        this.screenHeight,
        10,
        value,
        this.ctx,
        "white"
      );
    }
  }

  public runAnimation(sortingAlgorithm: Function, animationSpeed: number) {
    this.isRunning = true;
    sortingAlgorithm(
      this.items,
      () => {
        this.printToScreen();
        return this.isRunning;
      },
      animationSpeed
    );
  }

  public stopAnimation() {
    this.isRunning = false;
  }

  public isAnimationRunning() {
    return this.isRunning;
  }
}
