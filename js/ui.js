var UI = function(){


};

UI.prototype.init = function(){

  var gun = document.getElementsByClassName('gun');
  var matrix = new MatrixUtil([[1,0,0,0],
                              [0,1,0,0],
                              [0,0,1,0],
                              [0,0,0,1]]);
  matrix.translateY(window.innerHeight*.61)
  gun[0].style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";


}

UI.prototype.updateAmmo = function(){
  var ammo = document.getElementsByClassName('ammo');
  ammo[0].innerHTML = ammo[0].innerHTML - 1;

};

UI.prototype.updateFrag = function(){
  var frags = document.getElementsByClassName('frags');
  frags[0].innerHTML = parseInt(frags[0].innerHTML) + 1;
};



