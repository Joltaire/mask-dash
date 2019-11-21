import { GameScene } from "./GameScene.js";
export { start };

var setupSceneInput;
var start = new Phaser.Scene("SceneA");

start.preload = function() {
  this.load.audio("theme", ["assets/theme.ogg", "assets/theme.mp3"]);

  this.load.spritesheet("start", "assets/Intro.png", {
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

  this.add.sprite(420, 300, "start").play("begin");

  var theme = this.sound.add("theme");

  theme.play({
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
