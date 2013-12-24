var Game = function(options){
  this.options = {};
  this.map = new Map({});
  this.map.init();
  this.keyState = {};
  this.camera = new Camera(this.keyState);
  this.camera.init();
  this.init();
}


Game.prototype.setupControls = function(){
  var keyPressDown = function(e){
     if(e.keyCode === 68){
      this.keyState.right = true;
     } else if(e.keyCode === 65){
      this.keyState.left = true;
     } else if(e.keyCode === 83){
      this.keyState.backward = true;
     } else if(e.keyCode === 87){
      this.keyState.forward = true;
     }
  }.bind(this);

  var keyPressUp = function(e){
      if(e.keyCode === 68){
      this.keyState.right = false;
     } else if(e.keyCode === 65){
      this.keyState.left = false;
     } else if(e.keyCode === 83){
      this.keyState.backward = false;
     } else if(e.keyCode === 87){
      this.keyState.forward = false;
     }
  }.bind(this);
  window.onkeydown = keyPressDown;
  window.onkeyup = keyPressUp
}

Game.prototype.render = function(){

  if(this.keyState.left){this.camera.move('left')}
  if(this.keyState.right){this.camera.move('right')}
  if(this.keyState.forward){this.camera.move('forward')}
  if(this.keyState.backward){this.camera.move('backward')}
}


Game.prototype.init = function(){
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame 
  })();
  this.shouldRender = 0;
  var self = this;
  (function animloop(){
    requestAnimFrame(animloop);
    self.shouldRender++;
    if(self.shouldRender % 2){self.render();}
    
  })();
}