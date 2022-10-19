// setup canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// get audio from user
document.getElementById('file').addEventListener('change', function(event){

    // consolePrint('change on input#file triggered');
    if (!this.files.length) return;
    var file = this.files[0];
    // fileURL = blob.createObjectURL(file);
    const urlObj = URL.createObjectURL(file);
    //console.log(file);
    // console.log('File name: '+file.name);
    // console.log('File type: '+file.type);
    // console.log('File BlobURL: '+ fileURL);
    document.getElementById('audio').addEventListener("load", () => {
        URL.revokeObjectURL(urlObj);
      });
    document.getElementById('audio').src = urlObj;

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