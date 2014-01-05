var Gun = function(){
  this.sound = new Audio('assets/railgf1a.wav');
  this.then = null;
  this.targets = [];
  this.shots = [];
  this.container = document.getElementById('container');
};

Gun.prototype.selfFire = function(){
  //ROF control
  // if(this.then === null){
  //   this.then = new Date();
  // }else if((new Date()) - this.then < 3000){
  //   return false;
  // }
  this.sound.play();
  shot = document.createElement('div');
  shot.className = 'shot';
  var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])

  matrix.translateY(-2500)
  matrix.rotateX(-88 * Math.PI / 180);
  matrix.translateY(-2500)
  matrix.translateZ(-150)
  matrix.translateX(window.innerWidth*.44)
  matrix.translateY(window.innerHeight*.85);
  

  shot.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
  // shot.style['width'] = '100px';
  document.body.appendChild(shot);
  shot.currentOpacity = 1;
  this.shots.push(shot);
  shot.style['height'] = '5000px';
  
  this.then = new Date();
  return true;

};

Gun.prototype.fire = function(x,y,heading){
  
  //ROF control
  if(this.then === null){
    this.then = new Date();
  }else if((new Date()) - this.then < 3000){
    return false;
  }
  this.sound.play();
  shot = document.createElement('div');
  shot.className = 'shot';
  var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])

  matrix.translateY(2500);
  matrix.translateX(50);
  matrix.rotateZ(heading+Math.PI);
  matrix.translateY(-2500);
  matrix.translateX(-50);

  matrix.translateY(-y+window.innerHeight/2+300)
  matrix.translateX(-x)
  matrix.translateZ(250);

  shot.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
  this.container.appendChild(shot);
  shot.currentOpacity = 1;
  this.shots.push(shot);
  shot.style['height'] = '5000px';
  
  this.then = new Date();
  return true;
};

Gun.prototype.fade = function(){
  for(var i = 0; i < this.shots.length; i++){
    if(this.shots[i].currentOpacity <= 0){
      this.shots[i].style.display = 'none';
      this.shots.splice(i,1);
    }
    if(this.shots[i]){
      this.shots[i].currentOpacity -= .025;
      this.shots[i].style.opacity = this.shots[i].currentOpacity;
    }
  }
};

Gun.prototype.checkHit = function(players, myId, myCamera){
  for(var key in players){
    if(key === myId.toString()){
      continue;
    }else{
      var meX =  players[myId].posX;
      var meZ = players[myId].posZ;
      var themX = players[key].posX;
      var themZ = players[key].posZ;

      if(meX > themX && meZ > themZ){
        var enemy = Math.atan((meX-themX)/(meZ-themZ)) +Math.PI;
      } else if( meX > themX && meZ < themZ){
        var enemy = Math.PI*2 - Math.abs(Math.atan((meX-themX)/(meZ-themZ)));
      } else if( meX < themX && meZ < themZ){
        var enemy = Math.atan((meX-themX)/(meZ-themZ));
      } else if(meX < themX && meZ > themZ){
        var enemy = Math.PI + Math.atan((meX-themX)/(meZ-themZ));
      }
      var aim = myCamera.cameraPos.heading;
      enemy = Math.abs(enemy);
      //hitbox size!!!
      var hitBoxWidth = .15
      if(Math.abs(enemy-aim) < hitBoxWidth){
        console.log('HIT');
        return key;
      }
    }
  }
};

