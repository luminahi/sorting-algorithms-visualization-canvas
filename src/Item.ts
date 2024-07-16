export class Item {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private color: string;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    color: string = "black"
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height * -1;
    this.ctx = ctx;
    this.color = color;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
  }

  public getValue() {
    return this.height * -1;
  }

  public setValue(value: number) {
    this.height = value * -1;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public toString() {
    return `X: ${this.x} Y: ${this.y} ::: Value: ${this.getValue()}`;
  }
}
