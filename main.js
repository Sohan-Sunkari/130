var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var rightWristScore = 0;
var SongStatus2 = "";

var poseNet;

var Song1 = 'Travis Scott - I KNOW ？ (Official Audio).mp3';
var Song2 = 'Travis Scott - My Eyes (Best Part Extended) (320 kbps).mp3';

var capture;

var musicFile1, musicFile2;

var songStatus = "";

function preload() {
  musicFile1 = loadSound(Song1);
  musicFile2 = loadSound(Song2);
}

function setup() {
    var canvas = createCanvas(640, 480);
  
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
  
    capture = createCapture(VIDEO);
    capture.hide();

    poseNet = ml5.poseNet(capture, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Model Loaded!');
}

function gotPoses(poses) {
    if (poses.length > 0) {
        leftWristX = poses[0].pose.keypoints[9].position.x;
        leftWristY = poses[0].pose.keypoints[9].position.y;
        rightWristX = poses[0].pose.keypoints[10].position.x;
        rightWristY = poses[0].pose.keypoints[10].position.y;
        
        var leftWristScore = poses[0].pose.keypoints[9].score;
    }

    results[0].pose.keypoints[10];
}

function draw() {
    image(capture, 0, 0, width, height);
    
    fill("#FF0000");
    stroke("#FF0000");

    songStatus = musicFile1.isPlaying();

    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);

        musicFile1.stop();

        if (songStatus == false) {
            musicFile1.play();

            document.getElementById("song").innerHTML = "Song1 is playing";
        }
    }

    SongStatus2 = musicFile2.isPlaying();


    if(rightWristScore > 0.2){

        circle(rightWristX, rightWristY, 20);

        musicFile2.stop();

        if(SongStatus2 == false){
            musicFile2.play();

            document.getElementById("song").innerHTML = "Song2 is playing";
        }

    }
}
