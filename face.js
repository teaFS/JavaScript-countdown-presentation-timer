
function DigitalFace(min_id, sec_id) {
  var min_tag = document.getElementById(min_id);
  var sec_tag = document.getElementById(sec_id);

  this.update = function (time) {
    var sec;
    
    min_tag.innerHTML = '' + time.getMin();
    sec_tag.innerHTML = '' + (((sec = time.getSec()) > 9) ? sec : '0' + sec);
    
  };
}

function PieFace() {
    var pie_id = document.getElementById('pieSlice1');
    var deg;
    
   // console.log();
   
   this.update = function (time) {
    deg = 360 - (360 * time.getAnalog());
    //++deg;
    pie_id.style.transform = 'rotate(' + deg + 'deg)';

  };
}
