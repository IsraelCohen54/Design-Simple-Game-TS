"use strict";

import { Display } from './Display';
import { AirplaneActions } from './AirplaneActions';
import { AirplaneData } from './AirplaneData';
import { BoatActions } from './BoatActions';
import { BoatData } from './BoatData';
import { ParachuteData } from './ParachuteData';
import { ParachuteActions } from './ParachuteActions';
import { UserMovementChoice } from './UserMovementChoice';

// Magic numbers:
const SEA_IMAGE_HEIGHT: number = 242;
const START_X_AXIS: number = 0;
const START_Y_AXIS: number = 0;
const AIRPLANE_WIDTH: number = 145;
const AIRPLANE_HEIGHT: number = 113;
const AIRPLANE_SPEED: number = 20;
const BOAT_WIDTH: number = 244;
const BOAT_HEIGHT: number = 153;
const BOAT_SPEED: number = 10;
const PARACHUTE_WIDTH: number = 77;
const PARACHUTE_HEIGHT: number = 113;
const PARACHUTE_SPEED: number = 8;
const LOWER_THAN_BOAT_LEVEL: number = 1;

class Game {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _staticImages: Display[];
    private _boat: BoatActions;
    private _airplane: AirplaneActions;
    private _parachuteQueue: ParachuteActions[] = []; // Queue to store parachutes
    private _userMovChoice: UserMovementChoice; // UserInput class instance
    private _score: number = 0;
    private _lives: number = 3;

    constructor() {
        this._canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this._staticImages = [];
        this._staticImages.push(new Display("resources/background.png", START_X_AXIS, START_Y_AXIS, this._canvas.height, this._canvas.width));
        this._staticImages.push(new Display("resources/sea.png", START_X_AXIS, START_Y_AXIS, this._canvas.height - SEA_IMAGE_HEIGHT, this._canvas.width)); 
	this._airplane = new AirplaneActions(new AirplaneData("resources/plane.png", (this._canvas.width / 2) - (AIRPLANE_WIDTH / 2), START_Y_AXIS, AIRPLANE_HEIGHT, AIRPLANE_WIDTH, AIRPLANE_SPEED), this._canvas.width);
	this._boat = new BoatActions(new BoatData("resources/boat.png", (this._canvas.width / 2) - (BOAT_WIDTH / 2) , START_Y_AXIS, BOAT_HEIGHT, BOAT_WIDTH, BOAT_SPEED));
	this._userMovChoice = new UserMovementChoice();
    }
    
    public setDisplay(): void {
        for (let i = 0; i < this._staticImages.length; i++) {
            this._staticImages[i].draw(this._ctx);
	}
	this._boat.draw(this._ctx);
	this._airplane.draw(this._ctx);
    }

    public startGameLoop(): void {
	window.requestAnimationFrame(() => this._gameLoop());
    }

    private _gameLoop(): void {
	// Parachute handle:
	this._addParachute();

	// Objects movements:
	this._objectsMovement(this._userMovChoice.getUserChoice());
	
        // Collision detection & Parashute removal & Score updates:
  	for (let i = this._parachuteQueue.length - 1; i >= 0; i--) { //backward as higher chance for event...
  	  const currentParachute = this._parachuteQueue[i];
	   
	   // handle collision event (parashute catch):
 	   if (this._isCollision(currentParachute)) {
		this._score++;
		this._parachuteQueue.splice(i, 1); // Remove parachute from queue at index i
		this._drawScore();
	   
	   // Handle miss event:
           } else if (currentParachute.isDrown(this._canvas.height - BOAT_HEIGHT + LOWER_THAN_BOAT_LEVEL)) { // + 1 so it would be lower than the boat
  	        this._lives--;
  	        this._parachuteQueue.splice(i, 1);
		this._drawScore();
  	        
		// Check for game over (lives reach 0)
  	        if (this._lives === 0) {
   	         // Implement game over etc
   	        }
  	   }
  	}
        window.requestAnimationFrame(() => this._gameLoop());
    }

    private _addParachute(): void {
	var parashuteGeneratedIdx = this._airplane.isParashuteJumpedAtLocation();
        if (parashuteGeneratedIdx > 0) {
          const newParachute = new ParachuteActions(new ParachuteData("resources/parachutist.png", parashuteGeneratedIdx, AIRPLANE_HEIGHT, PARACHUTE_HEIGHT, PARACHUTE_WIDTH, PARACHUTE_SPEED));
	newParachute.draw(this._ctx);
	this._parachuteQueue.push(newParachute);
    	}
    }

    private _objectsMovement(userChoice: number): void {
	this._airplane.move();
	for (let i = 0; i < this._parachuteQueue.length; i++) {
		this._parachuteQueue[i].move(this._canvas.width);
    	}
	this._boat.move(userChoice);
    }
    
    private _drawScore(): void {
	// Draw score and lives text
  	this._ctx.font = "16px Arial";
 	this._ctx.fillStyle = "black";
	this._ctx.fillText("Score: " + this._score, 10, 20);
 	this._ctx.fillText("Lives: " + this._lives, 10, 40);
    }
    
    // Is parashute buttom (left down or right down points) collide with boat (IS within boat area)
    private _isCollision(currentParachute): boolean {
	  // Check if parachute's bottom-left corner is within boat's area
	  if (currentParachute._parahuteData.y + PARACHUTE_HEIGHT >= this._boat.y &&
	      currentParachute._parahuteData.x >= this._boat.x &&
	      currentParachute._parahuteData.x <= this._boat.x + BOAT_WIDTH) {
	    return true;
  	    }

	  // Check if parachute's bottom-right corner is within boat's area
	  if (currentParachute._parahuteData.y + PARACHUTE_HEIGHT >= this._boat.y &&
	      currentParachute._parahuteData.x + PARACHUTE_WIDTH <= this._boat.x + BOAT_WIDTH &&
	      currentParachute._parahuteData.x + PARACHUTE_WIDTH >= this._boat.x) {
	    return true;
	  }
	  return false;
	}
}

const game = new Game();
game.setDisplay();
game.startGameLoop();