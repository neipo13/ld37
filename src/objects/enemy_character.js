import Character from 'objects/character';

class EnemyCharacter extends Character{
  constructor(game, x, y){
    super(game, x, y);
    this.resetInput();
    this.speed = 100;
    this.paused = true;
    this.attackRange = 64;
    this.setPauseTime();
    this.game.time.events.add(this.pauseTime, this.unpause, this);
  }
  doUpdate(player){
    //set input w/ some AI functinos
    this.resetInput();
    if(!this.paused){
      //check if in range, if so
      if(Math.abs(this.x - player.x) < this.attackRange){
        if(Math.abs(this.y - player.y) < (this.attackRange / 4)){
          this.input.punch = true;
        }
      }
      //see if you can attack, if so attack
      //simple ai chase with some space between
      else{
        if(player.x > this.x){
          this.input.right = true;
        }
        else if(player.x < this.x){
          this.input.left = true;
        }
      }
      if(player.y > this.y){
        this.input.down = true;
      }
      if(player.y < this.y){
        this.input.up = true;
      }
      //then do move/attack with built inputs
      this.move(this.input);
      this.attack(this.input);
    }
  }

  pause(){
    this.paused = true;
    this.setPauseTime();
    this.body.velocity.setTo(0,0);
    this.game.time.events.add(this.pauseTime, this.unpause, this);
  }

  unpause(){
    this.paused = false;
    this.setPauseTime();
    this.game.time.events.add(this.pauseTime, this.pause, this);
  }

  setPauseTime(){
    this.pauseTime = 1000;
  }

  resetInput(){
    this.input = {
      up:false,
      down:false,
      right:false,
      left:false,
      punch:false
    };
  }
}
export default EnemyCharacter;
