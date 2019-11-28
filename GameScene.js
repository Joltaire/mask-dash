import { gameover } from "./gameover.js";
import { victory } from "./victory.js";
export { GameScene };

var player; //personagem
var player2; //personagem secundário
var player2_x;
var player2_y;
var ground; //chão principal
var platform; //plataformas
var platformsmall; //plataformas pequenas
var cursors;
var spike;
var finish;
//var keyW;
//var keyA;
//var keyS;
//var keyD;
var song;
var jump;
var stun;
var pointer;
//var touchX;
//var touchY;
var scoreText;
var score = 50000;
var timedEvent;
var graphics;
var gameOver = false;
var moveCam = false;
var velocidade = 600;
var velocidadeY = 700;

var GameScene = new Phaser.Scene("gamescene");

GameScene.preload = function() {
  this.load.audio("song", ["assets/furretwalk.ogg", "assets/furretwalk.mp3"]);
  this.load.audio("jump", "assets/mjump.mp3");
  this.load.image("background", "assets/background.png"); //plano de fundo
  this.load.image("spike", "assets/spikes_1.png");
  this.load.image("tileset", "assets/tileset.png");
  this.load.image("caverna", "assets/caverna.png");
  this.load.image("decor", "assets/decor.png");
  this.load.spritesheet("player", "assets/Bunny.png", {
    frameWidth: 40,
    frameHeight: 96
  });
  this.load.spritesheet("player2", "assets/Oni.png", {
    frameWidth: 40,
    frameHeight: 96
  });
  this.load.spritesheet("finish", "assets/muse.png", {
    frameWidth: 166,
    frameHeight: 210
  });
  this.load.spritesheet("stun", "assets/Stun.png", {
    frameWidth: 34,
    frameHeight: 36
  });
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.spritesheet("esquerda", "assets/esquerda.png", {
    frameWidth: 120,
    frameHeight: 120
  });
  this.load.spritesheet("direita", "assets/direita.png", {
    frameWidth: 120,
    frameHeight: 120
  });
  this.load.spritesheet("cima", "assets/cima.png", {
    frameWidth: 120,
    frameHeight: 120
  });
  this.load.tilemapTiledJSON("mapadois", "assets/mapadois.json");
};

GameScene.create = function() {
  // Websocket
  this.socket = io();

  this.socket.on("connect", () => {
    console.log("Jogador %s conectado ao servidor.", this.socket.id);
    this.socket.emit("notify", this.socket.id);
  });

  this.socket.on("publish", msg => {
    console.log(msg);
  });

  this.add.image(600, 620, "background"); //fundo
  this.add.image(2990, 620, "background");
  song = this.sound.add("song");
  jump = this.sound.add("jump");

  song.play({
    loop: true
  });

  var orientation = GameScene.scale.orientation;
  GameScene.scale.on("orientationchange", function(orientation) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      // ...
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      // ...
    }
  });

  this.physics.world.setBounds(0, 0, 27000, 3000);

  //timedEvent = this.time.delayedCall(300, reduzirScore, [], this);
  timedEvent = this.time.addEvent({
    delay: 1,
    callback: reduzirScore,
    callbackScope: this,
    repeat: -1
  });

  var map = this.add.tilemap("mapadois");
  var terrain = map.addTilesetImage("tileset", "tileset");
  var terrain2 = map.addTilesetImage("decor", "decor");
  var terrain3 = map.addTilesetImage("caverna", "caverna");

  //var camadatile4 = map.createStaticLayer("sky", [terrain3], 0, -25);
  var camadatile3 = map.createStaticLayer("caverna", [terrain3], -2, -90);
  var camadatile = map.createStaticLayer("mapa", [terrain], 0, 0);
  var camadatile2 = map.createStaticLayer("decor", [terrain2], 0, -34);

  ground = this.physics.add.staticGroup();
  platform = this.physics.add.staticGroup();
  platformsmall = this.physics.add.staticGroup();
  spike = this.physics.add.staticGroup();
  finish = this.physics.add.staticGroup();

  spike.create(2500, 1910, "spike");
  spike.create(2575, 1910, "spike");

  finish = this.physics.add.sprite(1200, 500, "finish").setScale(1.2);
  stun = this.physics.add.sprite(500, 840, "stun");
  player = this.physics.add.sprite(500, 700, "player"); //você :)

  player.setBounce(0);
  player.setCollideWorldBounds(true);

  player2 = this.add.sprite(50, 515, "player2");
  this.socket.on("renderPlayer", ({ x, y }) => {
    console.log({ x, y });
    player2_x = x;
    player2_y = y;
  });

  //animações
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", {
      start: 2,
      end: 6
    }),
    frameRate: 16,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("player", {
      start: 0,
      end: 1
    }),
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", {
      start: 7,
      end: 11
    }),
    frameRate: 16,
    repeat: -1
  });

  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 2,
      end: 6
    }),
    frameRate: 16,
    repeat: -1
  });

  this.anims.create({
    key: "turn2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 1
    }),
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 7,
      end: 11
    }),
    frameRate: 16,
    repeat: -1
  });

  this.anims.create({
    key: "stun",
    frames: this.anims.generateFrameNumbers("stun", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "finish",
    frames: this.anims.generateFrameNumbers("finish", { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  scoreText = this.add
    .text(-175, -150, "score: 50000", {
      fontSize: "32px",
      fill: "#000"
    })
    .setScrollFactor(0);

  //timedEvent = this.time.delayedCall(300, reduzirScore, [], this);
  //colisões: "objeto [x] colide com [x]"
  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, platformsmall);
  this.physics.add.collider(player2, ground);
  this.physics.add.collider(player2, platform);
  this.physics.add.collider(player2, platformsmall);

  this.physics.add.collider(player, spike, hitSpike, null, this);
  this.physics.add.collider(player2, spike, hitSpike, null, this);
  this.physics.add.collider(player, finish, hitFinish, null, this);
  this.physics.add.collider(player2, finish, hitFinish, null, this);

  this.physics.add.collider(stun, platform);
  this.physics.add.collider(stun, platformsmall);
  this.physics.add.overlap(player, stun, collectTrap, null, this);
  this.physics.add.overlap(player2, stun, collectTrap, null, this);

  cursors = this.input.keyboard.createCursorKeys(); //pros botão funcionar
  //keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  //keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  //keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  //keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  pointer = this.input.addPointer(1);

  this.cameras.main.setBounds(0, 0, 27000, 3000);

  this.cameras.main.startFollow(player, true);
  this.cameras.main.setZoom(0.65);

  this.physics.add.collider(player, camadatile);
  this.physics.add.collider(player2, camadatile);
  this.physics.add.collider(stun, camadatile);
  this.physics.add.collider(finish, camadatile);

  camadatile.setCollisionByProperty({ colliders: true });

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
  // Para a esquerda: correr
  var esquerda = this.add
    .image(-120, 670, "esquerda", 0)
    .setScale(1.5)
    .setInteractive()
    .setScrollFactor(0);
  esquerda.on("pointerover", () => {
    esquerda.setFrame(1);
    player.setVelocityX(-velocidade);
    player.anims.play("left", true);
  });
  esquerda.on("pointerout", () => {
    esquerda.setFrame(0);
    player.setVelocityX(0);
    player.anims.play("turn", true);
  });
  //
  // Para a direita: correr
  var direita = this.add
    .image(75, 670, "direita", 0)
    .setScale(1.5)
    .setInteractive()
    .setScrollFactor(0);
  direita.on("pointerover", () => {
    direita.setFrame(1);
    player.setVelocityX(velocidade);
    player.anims.play("right", true);
  });
  direita.on("pointerout", () => {
    direita.setFrame(0);
    player.setVelocityX(0);
    player.anims.play("turn", true);
  });
  //
  // Para cima: pular
  var cima = this.add
    .image(950, 670, "cima", 0)
    .setScale(1.5)
    .setInteractive()
    .setScrollFactor(0);
  cima.on("pointerover", () => {
    cima.setFrame(1);
    if (player.body.blocked.down) {
      player.setVelocityY(-velocidadeY);
    }
  });
  cima.on("pointerout", () => {
    cima.setFrame(0);
  });
};

GameScene.update = function() {
  this.socket.emit("movement", { x: player.body.x, y: player.body.y });
  player2.x = player2_x;
  player2.y = player2_y;

  //teclas pra andar e tal
  stun.anims.play("stun", true);
  finish.anims.play("finish", true);

  if (gameOver) {
    return;
  }
  /*
  if (cursors.left.isDown) {
    player.setVelocityX(-velocidade);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(velocidade);

    player.anims.play("right", true);
  } else if (cursors.right.isUp) {
    player.setVelocityX(0);
    player.anims.play("turn", true);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-700);
    jump.play({
      loop: false
    });
  } */
  /*
  if (keyA.isDown) {
    player2.setVelocityX(-velocidade);

    player2.anims.play("left2", true);
  } else if (keyD.isDown) {
    player2.setVelocityX(velocidade);

    player2.anims.play("right2", true);
  } else {
    player2.setVelocityX(0);

    player2.anims.play("turn2", true);
  }

  if (keyW.isDown && player2.body.blocked.down) {
    player2.setVelocityY(-700);
    jump.play({
      loop: false
    });
  }*/
  /*
  if (keyS.isDown) {
    player2.setVelocityY(1500);
  }*/
};

function collectTrap(player, stun) {
  //  Add and update the score
  stun.disableBody(true, true);
  score += 10000;
  scoreText.setText("score: " + score);
}

function reduzirScore() {
  score -= 1;
  scoreText.setText("score: " + score);
  if (velocidade < 600) {
    velocidade += 2;
  }
  if (700 < velocidadeY > 100) {
    velocidadeY -= 2;
  }
}

function hitFinish(player, finish) {
  //this.physics.pause();
  this.physics.pause();

  player.anims.play("turn");

  gameOver = true;
  song.stop();
  this.scene.start(gameover);
}

function hitSpike(player, spike) {
  //this.physics.pause();

  player.anims.play("turn");

  player.setVelocityY(-600);
  if (velocidade > 199) {
    velocidade -= 200;
  }
  console.log(velocidade);
}
