
var digital_face = new Face('min', 'sec');
var analog_face = new PieFace();

var t = null;

function inicializujZegar(min) {
    
    if(t != null && t.isRunning()) {
        alert('odlicznie trwa ...');
        return;
    }
    
    t = new Timer(min, 0);
    
    t.attachFace(digital_face, 'one');
    t.attachFace(analog_face);
}

function start() {
    if(t === null) {
        return;
    }
    
    if(t.isRunning() == false) {
        t.start();
    } else {
        alert('ups, odliczanie właśnie trwa ...');
    }
}

window.onkeypress = function (e){
    if(e.key == ' ') {
        t.togglePause();
    }
};
