class WallCollider extends Phaser.Sprite{
  constructor(game, x, y, isWide, isLeft){
    super(game, x, y);
    //enable physics
    game.physics.arcade.enable(this);
	  this.body.immovable = true;
    if(isWide){
      this.body.setSize(640, 20);
    }
    else {
      this.body.setSize(20, 480);
      this.body.checkCollision.up = false;
      this.body.checkCollision.down = false;
      //allow enemies to enter but not leave
      if(isLeft){
        this.body.checkCollision.left = false;
      }
      else{
        this.body.checkCollision.right = false;
      }
    }
    this.game.stage.addChild(this);
  }
  //show sprite info
  debugRender(){
    this.game.debug.spriteInfo(this, 32, 32);
  }
}
export default WallCollider;
