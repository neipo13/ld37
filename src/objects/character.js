/*
Class to hold movement info and collsion for walls and floor
*/
class Character extends Phaser.Sprite{
  constructor(game, x, y){
    super(game, x, y);
    this.speed = 200;
    //enable physics
    game.physics.arcade.enable(this);
    //child sprites
    this.animator = null;
    this.attack1 = null;
    this.attack2 = null;

    this.attacking = false;
    this.game.stage.addChild(this);


  }

  update(){
    this.move();
  }

  move(){
      //jacked up lame input system
      var vel = new Phaser.Point();
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
        vel.y += 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        vel.y -= 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
        vel.x += 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
        vel.x -= 1;
      }
      vel.normalize();
      vel.setMagnitude(this.speed);

      this.body.velocity = vel;
  }
  //show sprite info
  debugRender(){
    this.game.debug.spriteInfo(this, 32, 32);
  }




}

export default Character;
