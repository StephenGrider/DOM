var UI = function(){


};

UI.prototype.init = function(){

  // var box = document.createElement('div');
  
  // box.className = 'ui';
  // box.innerHTML = 'asdf';
  // // box.style.width = window.innnerWidth+ 'px';
  // var matrix = new MatrixUtil([[1,0,0,0],
  //                             [0,1,0,0],
  //                             [0,0,1,0],
  //                             [0,0,0,1]])
  // // matrix.rotateX(Math.PI/2)
  // // matrix.translateX(804)
  // matrix.translateZ(100)
  // matrix.translateY(window.innerHeight*.7)
  // matrix.translateX(300)
  // // matrix.translateZ(400);
  // console.log('ui')
  // box.style['-webkit-transform'] = "matrix3d("+ matrix.toString()+")";;
  // document.body.appendChild(box) 
}

UI.prototype.updateAmmo = function(){
  var ammo = document.getElementsByClassName('ammo');
  ammo[0].innerHTML = ammo[0].innerHTML - 1;

};

UI.prototype.updateFrag = function(){
  debugger;
  var frags = document.getElementsByClassName('frags');
  frags[0].innerHTML = parseInt(frags[0].innerHTML) + 1;
};



