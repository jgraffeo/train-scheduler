var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

var config = {
  apiKey: "AIzaSyCwxB-ZzHQt2J4TVI5dMRQlJOCkujWsf5E",
  authDomain: "trainpractice-d99a0.firebaseapp.com",
  databaseURL: "https://trainpractice-d99a0.firebaseio.com",
  projectId: "trainpractice-d99a0",
  storageBucket: "trainpractice-d99a0.appspot.com",
  messagingSenderId: "79077781607"
};
firebase.initializeApp(config);

var database = firebase.database().ref();

// Capture Button Click
$("#run-search").on("click", function() {
  event.preventDefault();

  //Equations

  // Grabbed values from text boxes
  var name = $("#train-name").val().trim();
  var destination = $("#train-destination").val().trim();
  var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#train-frequency").val().trim();


  var yourTrain = {
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };

  // Code for handling the push
  database.push(yourTrain);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#first-train-time").val("");
  $("#train-frequency").val("");

  return false;
});
    

// Firebase watcher .on("child_added"
database.on("child_added", function(snapshot) {

  var data = snapshot.val();
  var trainNames = data.name;
  var trainDestination = data.destination;
  var trainFrequency = data.frequency;
  var theFirstTrain = data.firstTrain;

  // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
  var trainRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
  var trainMinutes = trainFrequency - trainRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");

  // Add each train's data into the table 
  $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestination + 
  "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + trainArrival + 
  "</td><td class='min'>" + trainMinutes + "</td></tr>");

});


//

// var out = moment().format("hh:mm A");

