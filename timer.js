
function Timer() {
    var Timekeeper = function (sec_total) {
        var cur_total_sec, cur_sec, cur_min;
        
        cur_total_sec = sec_total;
        cur_sec = sec_total % 60;
        cur_min = (sec_total - cur_sec) / 60;
        
        this.ctime = {
            getTotalSec: function () {
                return cur_total_sec;
            }, 
            getAnalog: function() {
                return cur_total_sec / sec_total;
            }, 
            getSec: function() {
                return cur_sec;
            }, 
            getMin: function() {
                return cur_min;
            }
        };
        
        this.m1sec = function() {
            --cur_total_sec;
            if((--cur_sec) == -1) {
                cur_sec = 59;
                --cur_min;
                
                if(cur_min == -1) {
                    return true;
                }
            }
            
            return false;
        };
    };
    
    var argParser = function(args) {
        var sec, min;
    
        if(args.length == 2) {
            sec = args[1];
            min = args[0];
            return new Timekeeper(min*60 + sec);
        }
        
        if(args.length == 1) {
            sec = args[0];
            return new Timekeeper(sec);
        }
        
        if(args.length == 0) {
            return new Timekeeper(0);
        }
        
        throw Error('Usage: Timer(min: Integer, sec: Integer)\n       Timer(sec: Integer)\n      Timer()');
    };
    
    var tkeeper;
    
    tkeeper = argParser(arguments);
    
    var tick = function () {
        if(pause !== null) {
            pause.confirm();
        
            return;
        }
    
        face_upd(tkeeper.ctime);
    
        if(tkeeper.m1sec()) {
            window.clearInterval(intervalID);
            intervalID = null;
        }
    };
  
    var intervalID, face_upd;
  // secound shift correction
    var DoPauseNow = function () {
        var timestamp = Date.now(), delay;
        //var already_resumed = false;
      
        this.confirm = function () {
            delay = 1000 - (Date.now() - timestamp);
            console.log('delay: ' + delay);
            window.clearInterval(intervalID);
            intervalID = null;
            
            return true;
        };
      
      this.unPause = function () {
          if(delay === undefined) {
              console.log('no confirmation');
              
              window.clearInterval(intervalID);
              intervalID = null;
              
              return 0;
          }
          
          return delay;
      };
  }, pause = null;
  // Interval
  // PauseInterval
  // tickAtInterval

  var faceUpdProxy = function (faceupd_prev, faceupd) {
    return function (a, b) {
        faceupd_prev(a, b);
        faceupd(a, b);
    };
  };
  
  this.attachFace = function (face, label) {

    face.update(tkeeper.ctime);
    if(face_upd === undefined) {
        face_upd = face.update;
    } else {
       face_upd = faceUpdProxy(face_upd, face.update);
    }
  };

  this.start = function () {
    tick();
    intervalID = window.setInterval(
      tick, 1000
    );
  };
  
  this.pause = function () {
      if(pause === null) {
          pause = new DoPauseNow();
      }
  };
  
  this.resume = function () {
      var shift_correction;
      
      if(pause !== null) {
          shift_correction = pause.unPause();
          pause = null;
          
          window.setTimeout(this.start, shift_correction);
      }
  };
  
  this.discard = function () {
      
  };
  
  this.close = function () {
      
  };
  
  this.togglePause = function () {
    if(pause === null) {
        this.pause();
    } else {
        this.resume();
    }
  };
  
  this.isTicking = function () {
      return intervalID != null;
  };
  
  this.isRunning = function () {
      return (intervalID != null) || (pause != null);
  };
}

