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
      // var tile = document.createElement('div');
      // tile.className = 'floorTileDiv obj'
      var img = document.createElement('img');
      img.src = this.options.floorTexture
      img.className = 'floorTile';
      img.innerHTML = ''+i*800+','+j*800;

      //apply positioning
      var position = {};
      position.x = i*this.options.floorTextureDim;
      position.y = j*this.options.floorTextureDim;
      position.z = 0;
      img.style['-webkit-transform'] = 'translate3d('+i*this.options.floorTextureDim+'px,'+j*this.options.floorTextureDim+'px,'+ 0+'px)';

      // position.ele = tile;
      document.getElementById('container').appendChild(img)
      // this.mapTiles.push(position);
    }
  }

    // document.getElementById('container').appendChild(img)
};
