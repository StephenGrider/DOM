var Game = function(options){
  this.options = {};
  this.playerId = ~~(Math.random()*1000)
  this.fbMe = new Firebase("https://doom.firebaseio.com/players/"+this.playerId);
  this.fb = new Firebase("https://doom.firebaseio.com/players/");
  this.then = new Date(); //avoid updating firebase every render tick
  this.map = new Map({});
  this.map.init();
  this.keyState = {};
  this.otherPlayers = {};
  this.camera = new Camera(this.keyState);
  this.camera.init();
  this.gun = new Gun();
  this.init();
}


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
      this.gun.fire(this.camera.cameraPos.x,this.camera.cameraPos.z,this.camera.cameraPos.heading)
      this.gun.checkHit(this.players,this.playerId,this.camera);
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
  if((new Date()) - this.then > 100){
    this.updatePosition();
    this.then = new Date();
  }
  this.gun.fade();
}

Game.prototype.updatePosition = function(){
  this.fbMe.set({id: this.playerId, 
                posX: this.camera.cameraPos.x,
                posZ: this.camera.cameraPos.z,
                heading: this.camera.cameraPos.heading,
                date: (new Date()).getTime()})
}

Game.prototype.playerUpdate = function(val){
  for(var key in val){
    if(!this.otherPlayers.hasOwnProperty(key) && key != this.playerId){
      //make a new player
      this.otherPlayers[key] = {};
      this.otherPlayers[key].heading = val[key].heading;
      this.otherPlayers[key].id = val[key].id;
      this.otherPlayers[key].posX = val[key].posX;
      this.otherPlayers[key].posZ = val[key].posZ;
      var img = document.createElement('div');
      // img.src = 'assets/FLOOR5_1.PNG';
      img.className = 'floorTile';
      img.innerHTML = key;
      img.id = key;

      //apply positioning
      var matrix = new MatrixUtil([[1,0,0,0],
                              [0,1,0,0],
                              [0,0,1,0],
                              [0,0,0,1]])

      matrix.translateX = val[key].posX;
      matrix.translateY = val[key].posY;
      matrix.translateZ = 300;
      img.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;

      this.otherPlayers[key].ele = img;
      document.getElementById('container').appendChild(img)
    } else{
      if(this.otherPlayers[key]){
        //update player position
        this.otherPlayers[key].ele.style['-webkit-transform'] = 'translate3d('+(-1*val[key].posX/2)+'px,'+(-1*val[key].posZ/2)+'px,'+ 200+'px)';
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