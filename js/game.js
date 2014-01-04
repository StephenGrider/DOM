var Game = function(options){
  this.options = {};
  this.playerId = ~~(Math.random()*1000)
  this.fbMe = new Firebase("https://doom.firebaseio.com/players/"+this.playerId);
  this.fb = new Firebase("https://doom.firebaseio.com/players/");
  this.fbShots = new Firebase("https://doom.firebaseio.com/shots/"+this.playerId);
  this.then = new Date(); //avoid updating firebase every render tick
  this.map = new Map({});
  this.map.init();
  this.keyState = {};
  this.otherPlayers = {};
  this.camera = new Camera(this.keyState);
  this.camera.init();
  this.gun = new Gun();
  this.init();
  this.gottemText = document.getElementsByClassName('gottem');
}


Game.prototype.render = function(){
  if(!this.gottemText){
    this.gottemText = document.getElementsByClassName('gottem');
  }

  if(this.keyState.left){this.camera.move('left')}
  if(this.keyState.right){this.camera.move('right')}
  if(this.keyState.forward){this.camera.move('forward')}
  if(this.keyState.backward){this.camera.move('backward')}
  if((new Date()) - this.then > 50){
    this.updatePosition();
    this.then = new Date();
  }
  this.gun.fade();
  this.gottem();
}

Game.prototype.updatePosition = function(didShoot){
  this.fbMe.set({id: this.playerId, 
                posX: this.camera.cameraPos.x,
                posZ: this.camera.cameraPos.z,
                heading: this.camera.cameraPos.heading,
                date: (new Date()).getTime(),
                shot: didShoot || false})
}


Game.prototype.playerUpdate = function(val){
  for(var key in val){
    if(val[key].shot && key !=this.playerId){
      this.gun.fire(val[key].posX, val[key].posZ, val[key].heading)
    }

    if(!this.otherPlayers.hasOwnProperty(key) && key != this.playerId){
      //make a new player
      this.otherPlayers[key] = {};
      this.otherPlayers[key].heading = val[key].heading;
      this.otherPlayers[key].id = val[key].id;
      this.otherPlayers[key].posX = val[key].posX;
      this.otherPlayers[key].posZ = val[key].posZ;
      var div = document.createElement('img');
      div.className = 'player';
      div.src = 'assets/BOSSB1.PNG';
      div.innerHTML = key;
      div.id = key;

      this.otherPlayers[key].ele = div;
      document.getElementById('container').appendChild(div)
    } else{
      if(this.otherPlayers[key]){
        //update player position
        var matrix = new MatrixUtil([[1,0,0,0],
                                      [0,1,0,0],
                                      [0,0,1,0],
                                      [0,0,0,1]])
        matrix.rotateX(Math.PI/2)
        matrix.rotateZ(val[key].heading)
        matrix.translateX(-1*val[key].posX)
        matrix.translateY(-1*val[key].posZ)
        matrix.translateZ(300)

        this.otherPlayers[key].ele.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";
      }
      if((new Date()).getTime() - val[key].date > 10000){
        //remove old players
        this.otherPlayers[key].ele.style['visibility'] = 'hidden';
        (new Firebase("https://doom.firebaseio.com/players/"+key)).remove()
      }
    }
  }
}

Game.prototype.init = function(){
  this.setupControls();
  this.fb.on('value',function(dat){
    if(dat.val() != null){
      this.players = dat.val();
      this.playerUpdate(dat.val());
    }
  }.bind(this))
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

Game.prototype.gottem = function(){
  if(this.gottemText[0].style.opacity > .3){
    this.gottemText[0].style.display = 'inline';
    this.gottemText[0].style.opacity -= .02
  }
  if(this.gottemText[0].style.opacity < .3){
    this.gottemText[0].style.display = 'none';
  }

};

