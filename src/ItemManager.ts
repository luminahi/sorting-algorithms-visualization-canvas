import { Item } from "./Item.js";

export class ItemManager {
  private items: Item[];
  private screenWidth: number;
  private screenHeight: number;
  private arraySize: number;
  private ctx: CanvasRenderingContext2D;
  private isRunning: boolean;
  private sortBtn: HTMLButtonElement;

  public constructor(
    screenWidth: number,
    screenHeight: number,
    arraySize: number,
    ctx: CanvasRenderingContext2D,
    sortBtn: HTMLButtonElement
  ) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.arraySize = arraySize;
    this.ctx = ctx;
    this.isRunning = false;
    this.sortBtn = sortBtn;
  }

  public paintBackground() {
    this.ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
  }

  public paintItems() {
    this.paintBackground();
    for (const item of this.items) item.draw();
  }

  public async generateItemsRandom() {
    if (this.isRunning) this.stopAnimation();

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

  public generateItemsDescending() {
    if (this.isRunning) this.stopAnimation();

    this.items = new Array(this.arraySize);

    let max = this.arraySize * 10 - 5;
    for (let i = 0; i < this.arraySize; i++) {
      const value = max;
      max -= 10;

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

  public generateItemsAscending() {
    if (this.isRunning) this.stopAnimation();

    this.items = new Array(this.arraySize);

    for (let i = 0; i < this.arraySize; i++) {
      const value = i * 10 + 5;

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

  public getItems() {
    return this.items;
  }

  public runAnimation(sortingAlgorithm: Function, animationSpeed: number) {
    this.isRunning = true;
    this.sortBtn.innerHTML = "Stop";
    sortingAlgorithm(this, animationSpeed);
  }

  public stopAnimation() {
    this.sortBtn.innerHTML = "Start";
    this.isRunning = false;
  }

  public isAnimationRunning() {
    return this.isRunning;
  }
}
