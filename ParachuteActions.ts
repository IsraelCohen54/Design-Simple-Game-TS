import { ParachuteData } from './ParachuteData';

export class ParachuteActions {
  private _parachuteData: ParachuteData;

  constructor(parachuteData: ParachuteData) {
    this._parachuteData = parachuteData;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this._parachuteData.draw(ctx); 
    }

  public move(canvasWidth: number): void {
    this._parachuteData.y += this._parachuteData.movementSpeed; // Downward movement
    
    // Update X position with random movement and boundary checks
    // Random left/right movement (fixed to +/- 3 pixels)
    const randomMovement = Math.random() < 0.5 ? -3 : 3; // Randomly choose -3 or 3

    /**
    Border check logic:
    too much left (negative) - don't move
    too much right, stay at right border at max (not beyond)
    else move in between by +-3 randomally pixels
    */
    this._parachuteData.x = Math.max(0,
    // Minimum X (left edge of canvas)
    Math.min(this._parachuteData.x + randomMovement,
      // Maximum X (right edge minus parachute width)
      canvasWidth - this._parachuteData.width
    )
  );
  }

  public isDrown(canvasHeight: number): boolean {
    if (this._parachuteData.y >= canvasHeight) { // >= as a + 1 for under ship level and collision has already been checked
	return true;	
    }	
	return false;
  }
}