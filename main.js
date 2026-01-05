import { Hero } from './hero.js';
import { Input } from './input.js';
import { World } from './world.js';

export const TILE_SIZE = 32;
export const COLS = 15;
export const ROWS = 20;
const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE / 2;

console.log(GAME_WIDTH, GAME_HEIGHT);

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;

  class Game {
    constructor() {
      this.world = new World();
      this.hero = new Hero({ game: this, position: { x: 1 * TILE_SIZE, y: 2 * TILE_SIZE } });
      this.input = new Input();

      this.eventUpdate = this.eventTimer = 0;
      this.eventInterval = 60;
    }
    render(ctx, deltaTime) {
      this.hero.update(deltaTime);
      this.world.drawBackground(ctx);

      this.world.drawGrid(ctx);
      this.hero.draw(ctx);
      this.world.drawForeground(ctx);
      this.world.drawCollisionMap(ctx);
      if (this.eventTimer < this.eventInterval) {
        this.eventTimer += deltaTime;
        this.eventUpdate = false;
      } else {
        this.eventTimer = 0;
        this.eventUpdate = true;
      }
    }
  }

  const game = new Game();
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.render(ctx, deltaTime);
  }
  requestAnimationFrame(animate);
});
