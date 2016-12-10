class CharacterSprite extends Phaser.Sprite{
  constructor(game, x, y, imageName){
    super(game, x, y, imageName);
    game.physics.arcade.enable(this);
    this.animations.add('idle', [0], 0 , false);
    this.animations.add('walk', [0,1,2], 15, true);
    var attack1Anim = this.animations.add('attack1', [3,4,5], 15, false);
    attack1Anim.onComplete.add(function(){
        this.attack1 = false;
    }, this);
    var attack2Anim = this.animations.add('attack2', [3,4,6,6,6], 15, false);
    attack2Anim.onComplete.add(function(){
        this.attack2 = false;
    }, this);
    var attack3Anim = this.animations.add('attack3', [3,4,5,5,5], 15, false);
    attack3Anim.onComplete.add(function(){
        this.attack3 = false;
    }, this);
    this.animations.play('idle');
    this.anchor.setTo(.5, .5);
    this.scaleSize = 2;
    this.scale.setTo(this.scaleSize, this.scaleSize);

    //animation variables
    this.moving = false;
    this.attack1 = false;
    this.attack2 = false;
    this.attack3 = false;
    //this.facingRight = true;
  }

  update(){
    //animations
    if(this.attack3){
      this.animate('attack3');
    }
    else if(this.attack2){
      this.animate('attack2');
    }
    else if(this.attack1){
      this.animate('attack1');
    }
    else if(this.moving){
      this.animate('walk');
    }
    else{
      this.animate('idle');
    }

    //scale
    // if(this.facingRight){
    //   this.scale.x = this.scaleSize;
    // }
    // else{
    //   this.scale.x = -this.scaleSize;
    // }
  }

  animate(animName){
    this.animations.play(animName);
  }
}
export default CharacterSprite;
