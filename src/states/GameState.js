import Character from 'objects/character';
import WallCollider from 'objects/wall';

class GameState extends Phaser.State {

	create() {
		//player character
		this.player = new Character(this.game, 200, 200);
		//4 walls
		//stupid but quick?
		this.north = new WallCollider(this.game, 0, 420, true, false);
		this.south = new WallCollider(this.game, 0, 0, true, false);
		this.west = new WallCollider(this.game, 0, 0, false, true);
		this.east = new WallCollider(this.game, 640, 0, false, false);
	}

	update(){
		this.player.update();
		this.collide();
	}

	collide(){
		//player and walls
		this.game.physics.arcade.collide(this.player, this.north);
		this.game.physics.arcade.collide(this.player, this.south);
		this.game.physics.arcade.collide(this.player, this.west);
		this.game.physics.arcade.collide(this.player, this.east);
	}

	render(){
		this.player.debugRender();
		//this.north.debugRender();
	}

}

export default GameState;
