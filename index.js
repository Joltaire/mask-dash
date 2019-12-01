import { GameScene } from "./GameScene.js";
import { start } from "./start.js";
import { gameover } from "./gameover.js";
import { victory } from "./victory.js";

var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1100 },
      debug: true
    }
  },
  // Suporte a tela cheia
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  // Várias cenas, em sequência
  scene: [start, GameScene, gameover, victory]
};

var game = new Phaser.Game(config);
