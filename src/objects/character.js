/*
Class to hold movement info and collsion for walls and floor
*/
class Character extends Phaser.Sprite{
  constructor(game, x, y){
    super(game, x, y);
    this.speed = 200;
    //enable physics
    game.physics.arcade.enable(this);
    this.body.setSize(128, 40);
    this.anchor.setTo(.5, .5);
    //child sprites
    this.animator = null;
    this.attack1 = null;
    this.attack2 = null;
    this.attack3 = null;

    this.attacking = false;
    this.attackTime = 300;//ms
    this.recentAttack1 = false;
    this.recentAttack2 = false;
    this.recentAttack3 = false;
    this.game.stage.addChild(this);


  }

  update(){
    //set all anim variables in update
    this.move();
    this.attack();

    //finally update the animator
    this.animator.update();
  }

  move(){
      //jacked up lame input system
      var moving = false;
      var facing = '';
      var vel = new Phaser.Point();
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
        moving = true;
        vel.y -= 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        moving = true;
        vel.y += 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
        moving = true;
        facing = 'R';
        vel.x += 1;
      }
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
        moving = true;
        facing  = 'L';
        vel.x -= 1;
      }
      vel.normalize();
      vel.setMagnitude(this.speed);

      this.body.velocity = vel;

      //set anim variables
      if(this.animator != null){
        this.animator.moving = moving;
        if(facing == 'R'){
          this.animator.facingRight = true;
        }
        else if(facing == 'L'){
          this.animator.facingRight = false;
        }
      }
  }

  attack(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
      if(this.animator != null){
        if(!this.recentAttack1 && !this.recentAttack2  && !this.recentAttack3
        && !this.animator.attack1 && !this.animator.attack2 && !this.animator.attack3
        && !this.lastFrameAttack){
          this.animator.attack1 = true;
          this.lastFrameAttack = true;
          this.recentAttack1 = true;
          this.game.time.events.add(this.attackTime, this.setAttack1False, this);
        }
        else if(this.recentAttack1 && !this.recentAttack2
          && !this.animator.attack1 && !this.animator.attack2  && !this.lastFrameAttack){
          this.animator.attack2 = true;
          this.lastFrameAttack = true;
          this.recentAttack2 = true;
          this.game.time.events.add(this.attackTime, this.setAttack2False, this);
        }
        else if(this.recentAttack2 && !this.recentAttack3
        && !this.animator.attack1 && !this.animator.attack2 && !this.animator.attack3
        && !this.lastFrameAttack){
          this.animator.attack3 = true;
          this.lastFrameAttack = true;
          this.recentAttack3 = true;
          this.game.time.events.add(this.attackTime, this.setAttack3False, this);
        }
      }
    }
    else{
      this.lastFrameAttack = false;
    }
  }

  setAttack1False(){
    this.recentAttack1 = false;
  }
  setAttack2False(){
    this.recentAttack2 = false;
  }
  setAttack3False(){
    this.recentAttack3 = false;
  }
  //show sprite info
  debugRender(){
    this.game.debug.spriteInfo(this, 32, 32);
  }




}

export default Character;
