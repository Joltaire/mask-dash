import { GameScene } from "./GameScene.js";
export { victory };

var victory;

var setupSceneInput;
var victory = new Phaser.Scene("SceneD");

victory.preload = function() {
  this.load.audio("sorrow", "assets/the wind.ogg");

  this.load.spritesheet("victory", "assets/victory.png", {
    frameWidth: 420,
    frameHeight: 300
  });
};
victory.create = function() {
  //console.log("SceneA");

  this.anims.create({
    key: "victory",
    frames: this.anims.generateFrameNumbers("victory", {
      start: 0,
      end: 10
    }),
    frameRate: 12,
    repeat: -1
  });

  this.add
    .sprite(360, 240, "victory")
    .setScale(1.75)
    .play("victory");

  var sorrow = this.sound.add("sorrow");

  sorrow.play({
    loop: true
  });

  var button = this.add
    .image()
    .setOrigin(1, 0)
    .setInteractive();

  button.on(
    "pointerup",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);

        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);

        this.scale.startFullscreen();
      }
    },
    this
  );

  var FKey = this.input.keyboard.addKey("F");

  FKey.on(
    "down",
    function() {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  if (this.sound.locked) {
    this.sound.once(
      "unlocked",
      function(soundManager) {
        setupSceneInput.call(this, sorrow);
      },
      this
    );
  } else {
    setupSceneInput.call(this, sorrow);
  }
};

setupSceneInput = function(sorrow) {
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
