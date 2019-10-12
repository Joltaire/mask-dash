import { gameover } from "/gameover.js";
export { GameScene };

var player; //personagem
var ground; //chão principal
var platform; //plataformas
var platformsmall; //plataformas pequenas
var cursors;
var spike;
var song;
var jump;
var pointer;
//var touchX;
//var touchY;
//var scoreText;
var graphics;
var gameOver = false;
var moveCam = false;
var GameScene = new Phaser.Scene("gamescene");

GameScene.preload = function() {
  this.load.audio("song", ["assets/furretwalk.ogg", "assets/furretwalk.mp3"]);
  this.load.audio("jump", "assets/mjump.mp3");
  this.load.image("background", "assets/background.png"); //plano de fundo
  this.load.image("spike", "assets/spikes_1.png");
  this.load.image("ground", "assets/ground.png"); //chão principal
  this.load.image("platform", "assets/platform.png"); //plataformas
  this.load.image("platformsmall", "assets/platformsmall.png"); //plataformas pequenas
  this.load.spritesheet("player", "assets/Bunny.png", {
    frameWidth: 40,
    frameHeight: 96
  });
  this.load.spritesheet("stun", "assets/Stun.png", {
    frameWidth: 34,
    frameHeight: 36
  });
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });
};

GameScene.create = function() {
  this.add.image(600, 620, "background"); //fundo
  this.add.image(2990, 620, "background");
  song = this.sound.add("song");
  jump = this.sound.add("jump");

  song.play({
    loop: true
  });

  ground = this.physics.add.staticGroup();
  platform = this.physics.add.staticGroup();
  platformsmall = this.physics.add.staticGroup();
  spike = this.physics.add.staticGroup();

  ground.create(600, 1270, "ground"); //chão
  ground.create(1800, 1270, "ground");
  platformsmall.create(500, 900, "platformsmall");
  platform.create(1000, 650, "platform");
  spike.create(800, 1050, "spike");

  //powerupstun = this.add.sprite(350, 470, "stun");
  player = this.physics.add.sprite(200, 1000, "player"); //você :)

  player.setBounce(0);
  player.setCollideWorldBounds(false);

  //animações
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 2, end: 6 }),
    frameRate: 13,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 7, end: 11 }),
    frameRate: 13,
    repeat: -1
  });
  /*
  this.anims.create({
    key: "powerupstun",
    frames: this.anims.generateFrameNumbers("stun", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });*/

  //colisões: "objeto [x] colide com [x]"
  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, platformsmall);

  this.physics.add.collider(player, spike, hitSpike, null, this);

  cursors = this.input.keyboard.createCursorKeys(); //pros botão funcionar
  pointer = this.input.addPointer(1);

  this.cameras.main.setBounds(0, 0);

  this.cameras.main.startFollow(player, true);
  this.cameras.main.setZoom(0.65);

  if (this.cameras.main.deadzone) {
    graphics = this.add.graphics().setScrollFactor(0);
    graphics.strokeRect(
      200,
      200,
      this.cameras.main.deadzone.width,
      this.cameras.main.deadzone.height
    );
  }

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
};

GameScene.update = function() {
  //teclas pra andar e tal
  //powerupstun.anims.play("powerupstun", true);

  if (gameOver) {
    return;
  }

  // First touch
  /*if (this.input.pointer1.isDown) {
    touchX = this.input.pointer1.x;
    touchY = this.input.pointer1.x;
    scoreText.setText("X1: " + touchX + " / Y1: " + touchY);
  }
  // Second touch
  if (this.input.pointer2.isDown) {
    touchX = this.input.pointer2.x;
    touchY = this.input.pointer2.x;
    scoreText.setText("X2: " + touchX + " / Y2: " + touchY);
  }*/

  if (cursors.left.isDown) {
    player.setVelocityX(-600);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(600);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-800);
    jump.play({
      loop: false
    });
  }

  if (cursors.down.isDown) {
    player.setVelocityY(1500);
  }
};

function hitSpike(player, spike) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
  if (gameOver === true) {
    song.stop();
    this.scene.start(gameover);
  }
}
