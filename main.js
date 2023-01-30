video ="";
status = "";
objects = [];
 alarm = "";
function preload(){
    alarm = loadSound("alarm.wav");
}

function setup()
{

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status_check != "") 
    {
         for (var i = 0; i < objects.length; i++)
          { 
           if(objects[i] == "person"){
               document.getElementById("status").innerHTML = "Status: Baby/Person Found";
               alarm.stop();
           }else{
                document.getElementById("status").innerHTML = "Status: Baby/Person Not Found";
                alarm.play();
           }
        }
    }
    if(objects.length == 0){
        document.getElementById("status").innerHTML = "Status: No Objects Found";
    }
}
function modelLoaded()
{
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult (error, results)
{
  if (error) {
    console.log(error);
  }
  console.log(results)
  objects = results;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}