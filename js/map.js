var Map = function(options){

  this.mapTiles = [];
  this.options = {};
  this.options.floorTexture = options.texture || 'assets/FLOOR5_1.PNG';
  this.options.wallTexture = options.wallTexture || 'assets/MFLR8_1.PNG';
  this.options.floorTextureDim = options.floorTextureDim || 800;

};

Map.prototype.init = function(){

  for(var i = 0; i < 5; i++){
    for(var j = 0 ; j < 5; j++){
      //create tile
      // var tile = document.createElement('div');
      // tile.className = 'floorTileDiv obj'
      var img = document.createElement('img');
      img.src = this.options.floorTexture;
      img.className = 'floorTile';
      img.innerHTML = ''+i*800+','+j*800;

      //apply positioning
      var position = {};
      position.x = i*this.options.floorTextureDim;
      position.y = j*this.options.floorTextureDim;
      position.z = 0;
      img.style['-webkit-transform'] = 'translate3d('+i*this.options.floorTextureDim+'px,'+j*this.options.floorTextureDim+'px,'+ 0+'px)';
      document.getElementById('container').appendChild(img)
    }
  }

  //foward
  for(var i = 0; i < 5; i++){
    var box = document.createElement('img');
    box.src = this.options.wallTexture;
    box.className = 'wallTile';
    var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])
    matrix.rotateX(Math.PI/2)
    matrix.translateX(i*804)
    matrix.translateY(-400)
    matrix.translateZ(400);

    box.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
    document.getElementById('container').appendChild(box)
  }
  //left
  for(var i = 0; i < 5; i++){
    var box = document.createElement('img');
    box.src = this.options.wallTexture;
    box.className = 'wallTile';
    var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])
    matrix.rotateX(Math.PI/2);
    matrix.rotateZ(Math.PI/2);
    matrix.translateY(i*804)
    matrix.translateX(-400)
    matrix.translateZ(400);

    box.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
    document.getElementById('container').appendChild(box)
  }

  //back
  for(var i = 0; i < 5; i++){
    var box = document.createElement('img');
    box.src = this.options.wallTexture;
    box.className = 'wallTile';
    var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])
    matrix.rotateX(Math.PI/2)
    matrix.translateX(i*804)
    matrix.translateY(3600)
    matrix.translateZ(400);

    box.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
    document.getElementById('container').appendChild(box)
  }
  //right
  for(var i = 0; i < 5; i++){
    var box = document.createElement('img');
    box.src = this.options.wallTexture;
    box.className = 'wallTile';
    var matrix = new MatrixUtil([[1,0,0,0],
                                [0,1,0,0],
                                [0,0,1,0],
                                [0,0,0,1]])
    matrix.rotateX(Math.PI/2);
    matrix.rotateZ(Math.PI/2);
    matrix.translateY(i*804)
    matrix.translateX(3600)
    matrix.translateZ(400);

    box.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
    document.getElementById('container').appendChild(box)
  }

};
