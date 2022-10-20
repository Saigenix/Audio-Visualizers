// setup canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// get audio from user
document.getElementById('file').addEventListener('change', function(event){
    if (!this.files.length) return;
    var file = this.files[0];
    const urlObj = URL.createObjectURL(file);
    const audio1 = document.getElementById('audio')
    audio1.addEventListener("load", () => {
        URL.revokeObjectURL(urlObj);
      });
    audio1.src = urlObj;
    const audioContext = new AudioContext();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    const BufferLength = analyser.frequencyBinCount;
    const bufferArray = new Uint8Array(BufferLength);
    const barWidth = canvas.width/BufferLength;
    let barHeight;
    let x;
    function animate() {
       x = 0;
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyser.getByteFrequencyData(bufferArray);
      for (var i = 0; i < BufferLength; i++) {
        barHeight= bufferArray[i]*2;
        ctx.fillStyle= generateRandomColor();
        ctx.fillRect(x,canvas.height-barHeight,barWidth,barHeight)
        x += barWidth;
      }
      requestAnimationFrame(animate);
    }
    animate();
    
    
});

// classes for vis
class Bar {
    constructor(x,y,height,width,color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width=width;
        this.color = color;
    }
    update(micInput){


    }
    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.width,this.height);

    }
}

// animate
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    requestAnimationFrame(animate);
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}