var Game = function(){

}

Game.prototype.hi = function(){

  console.log('hi');
}

Game.prototype.setupControls = function(){
  //WASD controls
  var keypress = function(e){
     if(e.keyCode === 68){
      //left
      this.modX = -this.scrollSpeed;
     } else if(e.keyCode === 65){
      //right
      this.modX = this.scrollSpeed;
     } else if(e.keyCode === 83){
      //forward
      this.modY = -this.scrollSpeed;
     } else if(e.keyCode === 87){
      //back
      this.modY = this.scrollSpeed;
     }
  }.bind(this);
  window.onkeydown = keypress;
}