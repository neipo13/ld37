import AttackBox from 'objects/attack_box';
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
    //handle hp setup
    this.maxHp = 3;
    this.hp = 3;
    //child sprites
    this.animator = null;
    //attack boxes
    this.attack1 = new AttackBox(game, 32, 0, 32, 32, 1);
    this.attack2 = null;
    this.attack3 = null;

    this.attackTime = 300;//ms
    this.recentAttack1 = false;
    this.recentAttack2 = false;
    this.recentAttack3 = false;
    this.game.stage.addChild(this);
    this.addChild(this.attack1);


  }

  update(){
    //subclass will handle motor
    //set anim variables
    //update the animators
    this.animator.update();
  }


  move(input){
      var moving = false;
      var facing = '';
      var vel = new Phaser.Point();
      if(input.up){
        moving = true;
        vel.y -= 1;
      }
      if(input.down){
        moving = true;
        vel.y += 1;
      }
      if(input.right){
        moving = true;
        facing = 'R';
        vel.x += 1;
      }
      if(input.left){
        moving = true;
        facing  = 'L';
        vel.x -= 1;
      }
      vel.normalize();
      vel.setMagnitude(this.speed);

      this.body.velocity = vel;
      //set some animator props
      if(this.animator != null){
        this.animator.moving = moving;
        if(facing == 'R'){
          //this.animator.facingRight = true;
          this.scale.x = 1;
        }
        else if(facing == 'L'){
          //this.animator.facingRight = false;
          this.scale.x = -1;
        }
      }
  }

  attack(input){
    if(input.punch){
      if(this.animator != null){
        //STATE MACHINE WOULD SIMPLIFY
        if(!this.recentAttack1 && !this.recentAttack2  && !this.recentAttack3
        && !this.animator.attack1 && !this.animator.attack2 && !this.animator.attack3
        && !this.lastFrameAttack){
          console.log('attack 1');
          this.animator.attack1 = true;
          this.lastFrameAttack = true;
          this.recentAttack1 = true;
          this.game.time.events.add(this.attackTime, this.setAttack1False, this);
          //this.attack1.turnOn(this.attackTime/2); //should be very brief
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
    this.game.debug.body(this.attack1);
  }




}

export default Character;
