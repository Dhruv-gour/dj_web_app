song = "";
score_right_wrist = 0;
score_left_wrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("Lut Gaye Full Video Song.mp3");
}

function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
    }
}

function modelLoded() {
    console.log("model_loded");
}

function draw() {
    image(video, 0, 0, 480, 400);
    fill("#FF0707");
    stroke("#441212");
    if (score_right_wrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "0.5x";
        } else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "1x";
        } else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "1.5x";
        } else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "2x";
        } else if (rightWristY > 400) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "2.5x";
        }
    }
    if(score_left_wrist>0.2){
        circle(leftWristX,leftWristY,20);
        number_leftWrist=Number(leftWristY);
        remove_decimal=floor(number_leftWrist);
        volume=remove_decimal/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML=volume;
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}