import { GameScene } from "/GameScene.js";
export { gameover };

var gameOver;

var setupSceneInput;
var gameover = new Phaser.Scene("SceneC");

gameover.preload = function() {
  this.load.audio("sorrow", ["assets/sorrow.ogg", "assets/sorrow.mp3"]);

  this.load.spritesheet("gameover", "assets/gameover.png", {
    frameWidth: 1000,
    frameHeight: 600
  });
};
gameover.create = function() {
  //console.log("SceneA");

  this.add.image(400, 300, "gameover");

  this.anims.create({
    key: "gameover",
    frames: this.anims.generateFrameNumbers("gameover", {
      start: 0,
      end: 5
    }),
    frameRate: 12,
    repeat: -1
  });

  this.add.sprite(400, 300, "gameover").play("gameover");

  var sorrow = this.sound.add("sorrow");

  sorrow.play({
    loop: true
  });

  if (this.sound.locked) {
    this.sound.once(
      "unlocked",
      function(soundManager) {
        setupSceneInput.call(this, theme);
      },
      this
    );
  } else {
    setupSceneInput.call(this, theme);
  }
};

setupSceneInput = function(theme) {
  this.input.once(
    "pointerup",
    function() {
      gameOver = false;
      theme.stop();
      this.scene.start(GameScene);
    },
    this
  );
};
