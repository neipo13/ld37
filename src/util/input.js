class Input{
  constructor(game){
    this.game = game;
    this.wasd = null;
    this.cursors = null;
  }

  create(){
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //this.cursors.punch = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.wasd = {
        up:this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left:this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right:this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        punch:this.game.input.keyboard.addKey(Phaser.Keyboard.E)
    };
  }

  update(){
    return {
        left:this.cursors.left.isDown || this.wasd.left.isDown,
        right:this.cursors.right.isDown || this.wasd.right.isDown,
        up:this.cursors.up.isDown || this.wasd.up.isDown,
        down:this.cursors.down.isDown || this.wasd.down.isDown,
        punch:this.wasd.punch.isDown
    };
  }
}
export default Input;
