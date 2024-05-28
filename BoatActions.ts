// import { DrawableMovableObject } from './DrawableMovableObject';
import { BoatData } from './BoatData';

const NO_MOVEMENT_INIT_STATE: number = 0;
const NO_MOVEMENT: number = 0;

export class BoatActions {
  private _boatData: BoatData;
  private _moveDirection: number = NO_MOVEMENT_INIT_STATE;

  constructor(boatData: BoatData) {
    this._boatData = boatData;
  }

  public move(directionTo: number): void {
    // Movement logic using _boatData properties
    if (directionTo > NO_MOVEMENT) {
      this._boatData.x -= this._boatData.movementSpeed; // Move left
    } else if (directionTo < NO_MOVEMENT) {
      this._boatData.x += this._boatData.movementSpeed; // Move right
    }
  }

  public get x(): number {
    return this._boatData.x;
  }

  public get y(): number {
    return this._boatData.y;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this._boatData.draw(ctx);
  }
}
