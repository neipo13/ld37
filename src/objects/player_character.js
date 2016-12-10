import Character from 'objects/character';

class PlayerCharacter extends Character{
  doUpdate(input){
    //set all anim variables in update
    this.move(input);
    this.attack(input);
    super.update();
  }
}
export default PlayerCharacter;
