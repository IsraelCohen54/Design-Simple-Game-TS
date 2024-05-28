import { Display } from './Display';

export class AirplaneData extends Display {
  private _movementSpeed: number;

  constructor(imagePath: string, x: number, y: number, width: number, height: number, movementSpeed: number) {
    super(imagePath, x, y, width, height); // Display ctor
    this._movementSpeed = movementSpeed;
  }

  public get movementSpeed(): number {
    return this._movementSpeed;
  }
}
