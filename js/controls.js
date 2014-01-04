Game.prototype.setupControls = function(){
  var keyPressDown = function(e){
    // e.preventDefault();
    if(e.keyCode === 68){
      this.keyState.right = true;
    } else if(e.keyCode === 65){
      this.keyState.left = true;
    } else if(e.keyCode === 83){
      this.keyState.backward = true;
    } else if(e.keyCode === 87){
      this.keyState.forward = true;
    } else if(e.keyCode === 32){
      e.preventDefault();
      this.updatePosition(true)
      this.gun.fire(this.camera.cameraPos.x,this.camera.cameraPos.z,this.camera.cameraPos.heading)
      var playerHit = this.gun.checkHit(this.players,this.playerId,this.camera);
      if(playerHit){
        this.gottemText[0].style.opacity = 1;
      }
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