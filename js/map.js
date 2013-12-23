var Map = function(options){

  this.mapTiles = [];
  this.options = {};
  this.options.floorTexture = options.texture || 'assets/FLOOR5_1.PNG';
  this.options.floorTextureDim = options.floorTextureDim || 300;
  console.log(this.options)

};

Map.prototype.init = function(){



  for(var i = 0; i < 3; i++){
    for(var j = 0 ; j < 3; j++){
      //create tile
      var tile = document.createElement('div');
      tile.className = 'floorTileDiv'
      var img = document.createElement('img');
      img.src = this.options.floorTexture
      img.className = 'floorTile';
      tile.appendChild(img)

      //apply positioning
      var o = '' + -1*i*this.options.floorTextureDim+'px '+ -1*j*this.options.floorTextureDim+'px';
      tile.style['-webkit-transform-origin'] = o;


      var s = 'translate3d('+i*this.options.floorTextureDim+'px,'+j*this.options.floorTextureDim+'px, 0)';
      s += ' rotate3d(1,0,0,70deg)'
      tile.style['-webkit-transform'] = s;

      //append to document, add to map tile array
      document.getElementsByTagName('body')[0].appendChild(tile)
      this.mapTiles.push(tile);
    }
  }

};
