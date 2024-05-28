import { Display } from './Display';

export class ParachuteData extends Display {
  private _movementSpeed: number;

  constructor(imagePath: string, x: number, y: number, width: number, height: number, movementSpeed: number) {
    super(imagePath, x, y, width, height);
    this._movementSpeed = movementSpeed;
  }

  public get movementSpeed(): number {
    return this._movementSpeed;
  }
}
