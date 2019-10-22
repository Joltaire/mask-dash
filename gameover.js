import { GameScene } from "/GameScene.js";
export { gameover };

var gameOver;

var setupSceneInput;
var gameover = new Phaser.Scene("SceneC");

gameover.preload = function() {
  this.load.audio("sorrow", ["assets/sorrow.ogg", "assets/sorrow.mp3"]);

  this.load.image("gameover", "assets/gameover.gif");
};
gameover.create = function() {
  //console.log("SceneA");

  this.add.image(400, 300, "gameover");

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
