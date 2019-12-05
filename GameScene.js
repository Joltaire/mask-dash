//import { gameover } from "./gameover.js";
import { victory } from "./victory.js";
export { GameScene };

var player; //personagem
var player2; //personagem secundário
var ground; //chão principal
var platform; //plataformas
var platformsmall; //plataformas pequenas
var cursors;
var spike;
var bat1;
var bat2;
var bat3;
var yellowbutt1;
var yellowbutt2;
var yellowbutt3;
var bluebutt1;
var bluebutt2;
var bluebutt3;
var orangebutt1;
var orangebutt2;
var orangebutt3;
var pinkbutt1;
var pinkbutt2;
var pinkbutt3;
var battwo1;
var battwo2;
var battwo3;
var finish;
var keyW;
var keyA;
var keyD;
var song;
var jump;
var jump0;
var pointer;
//var touchX;
//var touchY;
var scoreText;
var score = 50000;
var timedEvent;
var graphics;
var gameOver = false;
var moveCam = true;
var velocidade = 600;

var GameScene = new Phaser.Scene("gamescene");

GameScene.preload = function() {
  this.load.audio("song", "assets/bgm.ogg");
  this.load.audio("jump", "assets/Jump.ogg");
  this.load.audio("jump0", "assets/JumpO.ogg");
  this.load.image("background", "assets/background.png"); //plano de fundo
  this.load.image("spike", "assets/spikes.png");
  this.load.image("tileset", "assets/tileset.png");
  this.load.image("caverna", "assets/caverna.png");
  this.load.image("decor", "assets/decor.png");
  this.load.image("darkbush", "assets/darkbush.png");
  this.load.image("bush", "assets/bush.png");
  // this.load.image("bat", "assets/bat.png");
  this.load.image("tree", "assets/tree.png");
  this.load.spritesheet("bat1", "assets/bat.png", {
    frameWidth: 640,
    frameHeight: 200
  });
  this.load.spritesheet("bat2", "assets/battwo.png", {
    frameWidth: 640,
    frameHeight: 200
  });
  this.load.spritesheet("yellowbutt", "assets/butterfly.png", {
    frameWidth: 60,
    frameHeight: 30
  });
  this.load.spritesheet("bluebutt", "assets/butterflytwo.png", {
    frameWidth: 60,
    frameHeight: 30
  });
  this.load.spritesheet("orangebutt", "assets/butterflythree.png", {
    frameWidth: 50,
    frameHeight: 30
  });
  this.load.spritesheet("pinkbutt", "assets/butterflyfour.png", {
    frameWidth: 50,
    frameHeight: 30
  });
  this.load.spritesheet("player", "assets/Bunny.png", {
    frameWidth: 40,
    frameHeight: 96
  });
  this.load.spritesheet("player2", "assets/Oni.png", {
    frameWidth: 40,
    frameHeight: 96
  });
  this.load.spritesheet("finish", "assets/museB.png", {
    frameWidth: 166,
    frameHeight: 210
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
  song = this.sound.add("song", { volume: 0.3 });
  jump = this.sound.add("jump", { volume: 0.2 });
  jump0 = this.sound.add("jump0", { volume: 0.2 });

  song.play({
    loop: true
  });

  this.physics.world.setBounds(0, 0, 27000, 3000);

  //timedEvent = this.time.delayedCall(300, reduzirScore, [], this);
  timedEvent = this.time.addEvent({
    delay: 100,
    callback: reduzirScore,
    callbackScope: this,
    repeat: -1
  });

  var map = this.add.tilemap("mapadois");
  var terrain = map.addTilesetImage("tileset", "tileset");
  var terrain2 = map.addTilesetImage("decor", "decor");
  var terrain3 = map.addTilesetImage("caverna", "caverna");
  var terrain4 = map.addTilesetImage("darkbush", "darkbush");
  var terrain5 = map.addTilesetImage("bush", "bush");
  var terrain6 = map.addTilesetImage("tree", "tree");

  var camadatile4 = map.createStaticLayer("sky", [terrain3], 0, -25);
  var camadatile3 = map.createStaticLayer("caverna", [terrain3], -2, -90);
  var camadatile5 = map.createStaticLayer("darkbush", [terrain4], 0, -70);
  var camadatile6 = map.createStaticLayer("tree", [terrain6], 0, -275);
  var camadatile7 = map.createStaticLayer("bush", [terrain5], 0, -50);
  var camadatile2 = map.createStaticLayer("decor", [terrain2], 0, -34);
  var camadatile = map.createStaticLayer("mapa", [terrain], 0, 0);

  spike = this.physics.add.staticGroup();
  //finish = this.physics.add.staticGroup();

  spike.create(2670, 1605, "spike");
  spike.create(4500, 2745, "spike");
  spike.create(6810, 1455, "spike");
  spike.create(12390, 525, "spike");
  spike.create(23640, 855, "spike");
  spike.create(24420, 855, "spike");
  spike.create(25200, 855, "spike");
  spike.create(25980, 855, "spike");
  spike.create(20670, 2235, "spike");
  spike.create(15570, 1425, "spike");
  bat1 = this.add.sprite(4810, 2310, "bat1");
  bat2 = this.add.sprite(10590, 2400, "bat1");
  bat3 = this.add.sprite(12780, 2250, "bat1");
  battwo1 = this.add.sprite(4560, 2400, "bat2");
  battwo2 = this.add.sprite(11190, 2430, "bat2");
  battwo3 = this.add.sprite(12060, 2370, "bat2");
  yellowbutt1 = this.add.sprite(630, 810, "yellowbutt").setScale(1.5);
  yellowbutt2 = this.add.sprite(21300, 1770, "yellowbutt").setScale(1.5);
  yellowbutt3 = this.add.sprite(10680, 210, "yellowbutt").setScale(1.5);
  bluebutt1 = this.add.sprite(2220, 1410, "bluebutt").setScale(1.5);
  bluebutt2 = this.add.sprite(19200, 2370, "bluebutt").setScale(1.5);
  bluebutt3 = this.add.sprite(14580, 2580, "bluebutt").setScale(1.5);
  orangebutt1 = this.add.sprite(8010, 1020, "orangebutt").setScale(1.5);
  orangebutt2 = this.add.sprite(25890, 2190, "orangebutt").setScale(1.5);
  orangebutt3 = this.add.sprite(15420, 420, "orangebutt").setScale(1.5);
  pinkbutt1 = this.add.sprite(19560, 2400, "pinkbutt").setScale(1.5);
  pinkbutt2 = this.add.sprite(2580, 1410, "pinkbutt").setScale(1.5);
  pinkbutt3 = this.add.sprite(2370, 810, "pinkbutt").setScale(1.5);

  finish = this.physics.add.sprite(22840, 450, "finish").setScale(1.2);

  player = this.physics.add.sprite(500, 715, "player"); //você :)

  player.setBounce(0);
  player.setCollideWorldBounds(true);

  player2 = this.physics.add.sprite(500, 715, "player2"); //fren
  player2.setBounce(0);
  player2.setCollideWorldBounds(true);

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
    key: "finish",
    frames: this.anims.generateFrameNumbers("finish", { start: 0, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "bat1",
    frames: this.anims.generateFrameNumbers("bat1", { start: 0, end: 36 }),
    frameRate: 11,
    repeat: -1
  });

  this.anims.create({
    key: "yellowbutt",
    frames: this.anims.generateFrameNumbers("yellowbutt", {
      start: 0,
      end: 26
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "bluebutt",
    frames: this.anims.generateFrameNumbers("bluebutt", { start: 0, end: 26 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "orangebutt",
    frames: this.anims.generateFrameNumbers("orangebutt", {
      start: 0,
      end: 19
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "pinkbutt",
    frames: this.anims.generateFrameNumbers("pinkbutt", { start: 0, end: 19 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "bat2",
    frames: this.anims.generateFrameNumbers("bat2", { start: 0, end: 36 }),
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

  cursors = this.input.keyboard.createCursorKeys(); //pros botão funcionar
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  pointer = this.input.addPointer(1);

  this.cameras.main
    .setBounds(0, 0, 27000, 3000)
    .setSize(720, 240)
    .setZoom(0.5);

  this.cameras.main.startFollow(player, true, 0.5, 0.5);
  this.cameras
    .add(0, 240, 720, 240)
    .startFollow(player2, true, 0.5, 0.5)
    .setBounds(0, 0, 27000, 3000)
    .setZoom(0.5);

  this.physics.add.collider(player, camadatile);
  this.physics.add.collider(player2, camadatile);
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
};

GameScene.update = function() {
  //teclas pra andar e tal
  finish.anims.play("finish", true);
  bat1.anims.play("bat1", true);
  bat2.anims.play("bat1", true);
  bat3.anims.play("bat1", true);
  battwo1.anims.play("bat2", true);
  battwo2.anims.play("bat2", true);
  battwo3.anims.play("bat2", true);
  yellowbutt1.anims.play("yellowbutt", true);
  yellowbutt2.anims.play("yellowbutt", true);
  yellowbutt3.anims.play("yellowbutt", true);
  bluebutt1.anims.play("bluebutt", true);
  bluebutt2.anims.play("bluebutt", true);
  bluebutt3.anims.play("bluebutt", true);
  orangebutt1.anims.play("orangebutt", true);
  orangebutt2.anims.play("orangebutt", true);
  orangebutt3.anims.play("orangebutt", true);
  pinkbutt1.anims.play("pinkbutt", true);
  pinkbutt2.anims.play("pinkbutt", true);
  pinkbutt3.anims.play("pinkbutt", true);
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-velocidade);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(velocidade);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn", true);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-700);
    jump.play({
      loop: false
    });
  }
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
    jump0.play({
      loop: false
    });
  }
};

function reduzirScore() {
  score -= 10;
  scoreText.setText("score: " + score);
  if (velocidade < 800) {
    velocidade += 5;
  }
}

function hitFinish(player, finish) {
  //this.physics.pause();
  this.physics.pause();

  player.anims.play("turn");

  gameOver = true;
  song.stop();
  this.scene.start(victory);
}

function hitSpike(player, spike) {
  //this.physics.pause();

  player.anims.play("turn");

  player.setVelocityY(-600);
  player.setVelocityX(velocidade);
  if (velocidade > 199) {
    velocidade -= 200;
  }
  console.log(velocidade);
}
