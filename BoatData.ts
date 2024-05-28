import { Display } from './Display';

export class BoatData extends Display {
  public movementSpeed: number;

  constructor(imagePath: string, x: number, y: number, width: number, height: number, movementSpeed: number) {
    super(imagePath, x, y, width, height);
    this.movementSpeed = movementSpeed;
  }
}
