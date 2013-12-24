var Map = function(options){

  this.mapTiles = [];
  this.options = {};
  this.options.floorTexture = options.texture || 'assets/FLOOR5_1.PNG';
  this.options.floorTextureDim = options.floorTextureDim || 800;

};

Map.prototype.init = function(){

  for(var i = 0; i < 6; i++){
    for(var j = 0 ; j < 6; j++){
      //create tile
      var tile = document.createElement('div');
      tile.className = 'floorTileDiv obj'
      var img = document.createElement('img');
      img.src = this.options.floorTexture
      img.className = 'floorTile';
      tile.appendChild(img)

      //apply positioning
      var position = {};
      position.x = i*this.options.floorTextureDim;
      position.y = j*this.options.floorTextureDim;
      position.z = 0;
      position.xOrigin = -position.x;
      position.yOrigin = -position.y;
      position.xRotation = 89;
      position.yRotation = 0;
      position.zRotation = 0;

      // var o = '' + position.xOrigin+'px '+ position.yOrigin+'px';
      // tile.style['-webkit-transform-origin'] = '' + position.xOrigin+'px '+ position.yOrigin+'px';
      var s = 'translate3d('+position.x+'px,'+position.y+'px,'+ position.z+'px)';
      tile.style['-webkit-transform'] = s;


      position.ele = tile;

      //append to document, add to map tile array
      document.getElementById('container').appendChild(tile)
      this.mapTiles.push(position);
    }
  }

};
