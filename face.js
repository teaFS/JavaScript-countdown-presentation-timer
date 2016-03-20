

function DigitalFace(min_id, sec_id) {
  var min_tag = document.getElementById(min_id);
  var sec_tag = document.getElementById(sec_id);

  this.update = function (time) {
    var sec;
    
    min_tag.innerHTML = '0' + time.getMin();
    sec_tag.innerHTML = '' + (((sec = time.getSec()) > 9) ? sec : '0' + sec);
  };
}


function AnalogBarFace() {
    var bar_id = document.getElementById('bar_indicator');
    var percentage = -1;
    
    this.update = function (time) {
        var new_percentage = Math.round(time.getAnalog() * 100);
         
        if(percentage != new_percentage) {
            bar_id.style.width = (percentage = new_percentage) + '%';
        }
    }
}

function AnalogPieFace() {
    var pie_id = document.getElementById('pieSlice1');
    var deg;
   
   this.update = function (time) {
    deg = 360 - (360 * time.getAnalog());
    //++deg;
    pie_id.style.transform = 'rotate(' + deg + 'deg)';
  };
}
