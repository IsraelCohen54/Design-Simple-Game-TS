export class Display {
  private _image: HTMLImageElement;
  private _x: number; 
  private _y: number;
  private _width: number;
  private _height: number;
  private _drawn: boolean = false; // Flag if image is drawn

  constructor(imagePath: string, x: number, y: number, width: number, height: number) {
    this._image = new Image();
    this._image.src = imagePath;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get width(): number {
    return this._width;
  }

  public set x(value: number) {
    this._x = value;
  }

  public set y(value: number) {
    this._y = value;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this._image.complete && !this._drawn) {
      ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
      this._drawn = true;
    }
  }
}
