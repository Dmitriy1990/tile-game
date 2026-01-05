import { GameObject } from './gameObject.js';
import { DOWN, RIGHT, UP, LEFT } from './input.js';
import { TILE_SIZE } from './main.js';

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({
      game,
      sprite: {
        image: document.getElementById('hero1'),
        x: 0,
        y: 4,
        width: TILE_SIZE * 2,
        height: TILE_SIZE * 2,
      },
      position,
      scale,
    });
    this.speed = 100;
    this.maxFrame = 8;
    this.moving = false;
  }

  update(deltaTime) {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const scaledSpped = this.speed * (deltaTime / 1000);

    const distance = this.moveTowards(this.destinationPosition, scaledSpped);

    const arrived = distance <= scaledSpped;

    if (arrived) {
      if (this.game.input.lastKey === UP) {
        nextY -= TILE_SIZE;
        this.sprite.y = 8;
        // this.position.y--;
      }
      if (this.game.input.lastKey === DOWN) {
        nextY += TILE_SIZE;
        this.sprite.y = 10;
        // this.position.y++;
      }
      if (this.game.input.lastKey === RIGHT) {
        nextX += TILE_SIZE;
        this.sprite.y = 11;
        // this.position.x++;
      }
      if (this.game.input.lastKey === LEFT) {
        nextX -= TILE_SIZE;
        this.sprite.y = 9;
        // this.position.x--;
      }

      const col = nextX / TILE_SIZE;
      const row = nextY / TILE_SIZE;
      if (this.game.world.getTile(this.game.world.level1.collisionLayer, row, col) !== 1) {
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      }
    }

    if (this.game.input.keys.length > 0 || !arrived) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    if (this.game.eventUpdate && this.moving) {
      this.sprite.x < this.maxFrame ? this.sprite.x++ : (this.sprite.x = 1);
    } else if (!this.moving) {
      this.sprite.x = 0;
    }
  }
}
