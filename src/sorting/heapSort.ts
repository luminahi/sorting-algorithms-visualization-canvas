import { ItemManager } from "../ItemManager.js";
import { delay } from "../util.js";

class MinHeap {
  private array: number[];
  private size: number;
  private maxSize: number;

  public constructor(maxSize: number) {
    this.array = new Array(maxSize);
    this.maxSize = maxSize;
    this.size = 0;
  }

  public insert(item: number) {
    if (this.size >= this.maxSize) {
      console.log("heap is full");
      return;
    }

    this.size++;
    this.array[this.size - 1] = item;
    this.heapifyUp(this.size - 1);
  }

  public extractMin() {
    if (this.size <= 0) {
      console.log("heap is empty");
      return -1;
    }

    let value = this.array[0];

    this.array[0] = this.array[this.size - 1];
    this.array[this.size - 1] = 0;
    this.size--;

    this.heapifyDown(0);

    return value;
  }

  private heapifyDown(index: number) {
    let smallest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < this.size && this.array[left] < this.array[smallest])
      smallest = left;

    if (right < this.size && this.array[right] < this.array[smallest])
      smallest = right;

    if (smallest != index) {
      this.swap(smallest, index);
      this.heapifyDown(smallest);
    }
  }

  private heapifyUp(index: number) {
    let parent: number = ((index - 1) / 2) | 0;

    if (parent >= 0 && this.array[index] < this.array[parent]) {
      this.swap(index, parent);
      this.heapifyUp(parent);
    }
  }

  private swap(a: number, b: number) {
    if (!this.array[a] || !this.array[b]) return;

    let aux = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = aux;
  }

  public getSize() {
    return this.size;
  }

  public getArray() {
    return this.array;
  }

  public async sort(manager: ItemManager, animationSpeed: number) {
    const array = manager.getItems();

    for (let i = 0; i < array.length; i++) {
      array[i].setValue(this.extractMin());

      array[i].setColor("red");

      manager.paintItems();
      await delay(animationSpeed);
      if (!manager.isAnimationRunning()) return;

      array[i].setColor("white");
    }

    manager.paintItems();
    manager.stopAnimation();
  }
}

async function heapSort(manager: ItemManager, animationSpeed: number) {
  const array = manager.getItems();

  const heap = new MinHeap(array.length);

  array.forEach((item) => heap.insert(item.getValue()));

  await new Promise<void>(async (resolve, _reject) => {
    const heapArray = heap.getArray();
    for (let i = 0; i < array.length; i++) {
      array[i].setValue(heapArray[i]);

      array[i].setColor("blue");

      manager.paintItems();
      await delay(animationSpeed);
      if (!manager.isAnimationRunning()) return;

      array[i].setColor("white");
    }

    resolve();
  });

  heap.sort(manager, animationSpeed);
}

export { heapSort };
