var song, cnv, filter, fft, recorder, soundFile;
var pressed = 0;

function preload() {
    song = loadSound('assets/audio/song.mp3')
}

function setup() {

    // SET TO 0.1 SMOOTHING AND 64 FREQ BANDS
    fft = new p5.FFT(0.1, 1024);

    // DECLARE FILTER AND CNV
    filter = new p5.BandPass();
    cnv = createCanvas(window.innerWidth, window.innerHeight)

    // DECLARE RECORDS AND SOUNDFILE (IF RECORDER HAS NO AUDIO IN, IT WILL RECORD EVERYTHING INSIDE P5.SOUND)
    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();

    // DISCONNECT EVERYTHING EXCEPT THE FILTER AND PLAY THE SONG
    song.disconnect()
    song.connect(filter)
    song.play()
}

function draw() {
    background(0)
    stroke(255)
    fill(255)

    // ANALYZE SPECTRUM
    var spectrum = fft.analyze();

    // DRAW SPECTRUM
    for (var i = 0; i < spectrum.length; i++) {
        line(i, spectrum[i], i, 0);
    }

    // FILTER THE FREQ
    var freq = Math.floor(map(mouseX, 0, width, 20, 10000))
    filter.freq(freq);

    // DISPLAY TEXT
    text(freq, width - 100, height - 100, 20, 20)

}

// PAUSE AND PLAY SONG ON CLICK
function mousePressed() {
    if(song.isPlaying()){
        song.pause()
    }else{
        song.play()
    }
}

// RECORD AND SAVE
function keyPressed(event) {
    switch(event.code.toLowerCase()){
        case "keyr":
        background(255, 0, 0)
        recorder.record(soundFile);
        break;

        case "keys":
        background(0, 255, 0)
        recorder.stop();
        save(soundFile, 'mySound.wav');
        break;
    }
}