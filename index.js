import { GameScene } from "./GameScene.js";
import { start } from "./start.js";
//import { gameover } from "./gameover.js";
import { victory } from "./victory.js";

var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1100 },
      debug: false
    }
  },
  // Suporte a tela cheia
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 720,
    height: 480
  },

  // Várias cenas, em sequência
  scene: [start, GameScene, victory]
};

var game = new Phaser.Game(config);
