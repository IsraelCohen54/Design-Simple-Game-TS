const LEFT: number = -1;
const RIGHT: number = 1;
const NO_MOVEMENT = 0;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

export class UserMovementChoice {
  private _keyPressed: number | null = null; // Stores the key code of the pressed key

  constructor() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this)); // Bind 'this' to the class instance within the event handler
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this._keyPressed = event.keyCode; // Store the key code of the pressed key
  }

  public getUserChoice(): number {
    const keyPressed = this._keyPressed;
    this._keyPressed = null; // Reset key state for future inputs

    if (keyPressed === LEFT_ARROW_KEY) {
      return LEFT; 	// Returning -1 for left arrow
    } else if (keyPressed === RIGHT_ARROW_KEY) {
      return RIGHT; 	// Returning 1 for right arrow
    } else {
      return NO_MOVEMENT; // Return zero for any other key
    }
  }
}