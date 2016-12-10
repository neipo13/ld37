import PlayerCharacter from 'objects/player_character';
import CharacterSprite from 'objects/character_sprite';
import WallCollider from 'objects/wall';
import Input from 'util/input';

class GameState extends Phaser.State {
	preload(){
		this.game.load.spritesheet('hero', 'images/hero.png', 32, 32, 9);
		this.game.load.image('room', 'images/ElevatorRoom.png');
		this.input = new Input(this.game);
	}

	create() {
		this.bg = this.game.add.sprite(0,0,'room');
		this.bg.scale.setTo(2,2);
		//player character
		this.player = new PlayerCharacter(this.game, 200, 200);
		this.player.animator = new CharacterSprite(this.game, 0 ,0, 'hero');
		this.player.addChild(this.player.animator);
		//4 walls
		//stupid but quick?
		this.north = new WallCollider(this.game, 0, 120, true, false);
		this.south = new WallCollider(this.game, 0, 420, true, false);
		this.west = new WallCollider(this.game, 0, 0, false, true);
		this.east = new WallCollider(this.game, 640, 0, false, false);

		this.input.create();
	}

	update(){
		var input = this.input.update();
		this.player.doUpdate(input);
		this.collide();
	}

	collide(){
		//player and walls
		this.game.physics.arcade.collide(this.player, this.north);
		this.game.physics.arcade.collide(this.player, this.south);
		this.game.physics.arcade.collide(this.player, this.west);
		this.game.physics.arcade.collide(this.player, this.east);

		//player attackbox and enemy
	}

	render(){
		this.player.debugRender();
		//this.north.debugRender();
	}

}

export default GameState;
