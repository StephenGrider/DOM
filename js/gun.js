var Gun = function(){
  this.sound = new Audio('assets/railgf1a.wav');
  this.then = null;
  this.targets = [];
  this.shots = [];
  this.container = document.getElementById('container');
};

Gun.prototype.fire = function(x,y,heading){

  //ROF control
  // if(this.then === null){
  //   this.then = new Date();
  // }else if((new Date()) - this.then < 3000){
  //   return;
  // }
  this.sound.play();
  shot = document.createElement('div');
  shot.className = 'shot';
  var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])

  matrix.rotateZ(heading);
  matrix.translateY(-y/2-2200); //-800
  matrix.translateX(-x/2+250); //+250
  matrix.translateZ(300);
  shot.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
  // shot.style['width'] = '100px';
  this.container.appendChild(shot);
  shot.currentOpacity = 1;
  this.shots.push(shot);
  shot.style['height'] = '4000px';
  
  this.then = new Date();
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
      var enemy = Math.atan((players[key].posX-players[myId].posX)/(players[key].posZ-players[myId].posZ));
      var aim = myCamera.cameraPos.heading;
      // if(enemy < 0){
      //   enemy = Math.atan((players[myId].posX-players[key].posX)/(players[myId].posZ-players[key].posZ))
      // }

      while(aim > 2*Math.PI && aim >= 0){
        aim -= 2*Math.PI;
      }
      while(aim < -2*Math.PI && aim <= 0){
        aim += 2*Math.PI;
      }
      if(aim < 0){
        aim = 2*Math.PI + aim;
      }
      enemy = Math.abs(enemy);
      console.log('aim',aim)
      console.log('enemy',enemy);
      //hitbox size!!!
      var hitBoxWidth = .25
      if(Math.abs(enemy-aim) < hitBoxWidth){
        console.log('HIT');
      }
      
    }
  }
}


