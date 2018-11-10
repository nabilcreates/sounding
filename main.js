var song, cnv, filter, fft;

function preload() {
    song = loadSound('assets/audio/song.mp3')
}

function setup() {

    // SET TO 0.1 SMOOTHING AND 64 FREQ BANDS
    fft = new p5.FFT(0.1, 1024);

    filter = new p5.BandPass();
    cnv = createCanvas(window.innerWidth , window.innerHeight)
    
    song.disconnect()
    song.connect(filter)
    song.play()
}

function draw() {
    background(0)
    stroke(255)
    fill(255)
    var spectrum = fft.analyze();

    for (var i = 0; i < spectrum.length; i++) {
        line(i, spectrum[i], i, 0);
    }

    var freq = Math.floor(map(mouseX, 0, width, 20, 10000))
    filter.freq(freq);

    text(freq, width - 100, height - 100, 20, 20)

}