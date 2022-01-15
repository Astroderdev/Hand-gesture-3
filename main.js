prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    image_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function webcam_take(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="snapped-img" src="' + data_uri + '">'
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rLY4QeyQG/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
function check_gesture() {
    classifier.classify(document.getElementById('snapped-img'), gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    if(results){
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label; 
        
        if(results[0].label == "Like"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
            tospeak = "Good"
        } 
        if(results[0].label == "Nice"){
           document.getElementById("update_gesture").innerHTML = "&#128076;";
           tospeak = "This looks Nice"
        } 
        if(results[0].label == "Victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996";
            tospeak = "Marvellous Victory"
        } 
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(tospeak);
    synth.speak(utterThis);
}
