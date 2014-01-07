Game.prototype.setupControls = function(ui){
  var keyPressDown = function(e){
    if(e.keyCode === 68){
      this.keyState.right = true;
    } else if(e.keyCode === 65){
      this.keyState.left = true;
    } else if(e.keyCode === 83){
      this.keyState.backward = true;
    } else if(e.keyCode === 87){
      this.keyState.forward = true;
    } else if(e.keyCode === 81){
      this.keyState.strafeLeft = true;
    } else if(e.keyCode === 69){
      this.keyState.strafeRight = true;
    } else if(e.keyCode === 32){
      e.preventDefault();
      if(this.gun.then === null){
        this.gun.then = new Date();
      }else if((new Date()) - this.gun.then < 3000){
        return false;
      }
      this.updatePosition(true)
      var fired = this.gun.selfFire(this.camera.cameraPos.x,this.camera.cameraPos.z,this.camera.cameraPos.heading)
      var playerHit = this.gun.checkHit(this.players,this.playerId,this.camera);
      if(fired){
        this.ui.updateAmmo();
      }
      if(playerHit && fired){
        this.ui.updateFrag();
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
    } else if(e.keyCode === 81){
      this.keyState.strafeLeft = false;
    } else if(e.keyCode === 69){
      this.keyState.strafeRight = false;
    } else if(e.keyCode === 87){
      this.keyState.forward = false;
    }
  }.bind(this);
  window.onkeydown = keyPressDown;
  window.onkeyup = keyPressUp
}