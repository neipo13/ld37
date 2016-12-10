class AttackBox extends Phaser.Sprite{
  constructor(game, x, y, width, height, damage){
    super(game, x, y);

    //create hitbox of size
    game.physics.arcade.enable(this, true);
    this.body.setSize(width, height);
    this.anchor.setTo(.5, .5);
    //start off
    this.collisionEnabled = false;
    //set attack's damage
    this.damage = damage || 1; //default to 1
  }

  turnOn(timeSpanInMs){
    //enable the collision for this body
    this.collisionEnabled = true;
    //turn it back off after elapsed time
    this.game.time.events.add(timeSpanInMs, this.turnOff, this);
  }
  turnOff(){
    this.collisionEnabled = false;
  }
}
export default AttackBox;
