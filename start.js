import { GameScene } from "./GameScene.js";
export { start };

var setupSceneInput;
var start = new Phaser.Scene("SceneA");

start.preload = function() {
  this.load.audio("theme", ["assets/theme.ogg"]);

  this.load.spritesheet("start", "assets/begin.png", {
    frameWidth: 840,
    frameHeight: 600
  });
};
start.create = function() {
  //console.log("SceneA");

  this.anims.create({
    key: "begin",
    frames: this.anims.generateFrameNumbers("start", {
      start: 0,
      end: 2
    }),
    frameRate: 8,
    repeat: -1
  });

  this.add.sprite(360, 240, "start").play("begin");

  var theme = this.sound.add("theme");

  theme.play({
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
        setupSceneInput.call(this, theme);
      },
      this
    );
  } else {
    setupSceneInput.call(this, theme);
  }
};
/*
start.update = function() {
  start.anims.play("start", true);
};*/

setupSceneInput = function(theme) {
  this.input.once(
    "pointerup",
    function() {
      theme.stop();
      this.scene.start(GameScene);
    },
    this
  );
};
