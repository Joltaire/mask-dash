import { GameScene } from "./GameScene.js";
export { start };

var setupSceneInput;
var start = new Phaser.Scene("SceneA");

start.preload = function() {
  this.load.audio("theme", ["assets/theme.ogg", "assets/theme.mp3"]);

  this.load.image("Start", "assets/start.gif");
};
start.create = function() {
  //console.log("SceneA");

  this.add.image(400, 300, "Start");

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
