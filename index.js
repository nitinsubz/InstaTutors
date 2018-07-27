$(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideup");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim2").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideleft");
        }
    });
  });

 $(window).scroll(function() {
    $(".slideanim3").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("slideright");
        }
    });
  });

$(document).ready(function() {
    $("#contactnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#contact").offset().top - 50
                }, 800);
    });
});

$(document).ready(function() {
    $("#faqnav").click(function(event) {
        event.preventDefault();
        $("html, body").animate({
                    scrollTop: $("#faq").offset().top + 40
                }, 800);
    });
});

//split functions for syntax
function splitEmail(email) {
	str = email.split("@");
	var res = str[0].replace(/\./g, "");
	res = res.toLowerCase();
	return(res);
}

function splitDate(date) {
	str = date.split("/");
	return(str[0] + str[1]);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

   	var split = splitEmail(user.email);

   	if(user.email == "instatutorsteam@gmail.com") {

   		$(".main-div").css("display", "none");
	    $("#logout").css("display", "block");
	    $(".create-div").css("display", "none");
	    $("#indexlogout").fadeIn();
	    $("#tutorsessions").fadeIn();

   	} else {

    var userName = firebase.database().ref('users/' + split).child('name');

	userName.on('value', snap => {
		$("#welcome").html("Welcome " + snap.val()+ "!");
	});

	//add requests to 'my sessions'
	var reqRef = firebase.database().ref('users/' + split);

	//date, time, location, tutor, done, subject
	reqRef.on("child_added", snap => {
		var date = snap.child("date").val();
		var done = snap.child("done").val();
		var email = snap.child("email").val();
		var location = snap.child("location").val();
		var subject = snap.child("subject").val();
		var time = snap.child("time").val();
		var tutor = snap.child("tutor").val();

		if(date != null) {
			$("#sessionsbody").append("<div class=\"req\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4>" + "<h4>location: " + location + "</h4>" + "<h4>Subject: " + subject + "</h4>" + "<h4>tutor: " + tutor + "</h4>");
		}
	});


    $("#mainbody").fadeIn();
    $(".main-div").css("display", "none");
    $("#logout").css("display", "block");
    $(".create-div").css("display", "none");
<<<<<<< HEAD
    $("#bookasession a").html("BOOK A SESSION");
    $("#indexlogout").fadeIn();

	}
=======
    $("#bookasession a").html("Book a Session");
    $("#indexlogout").css("display", "block");
>>>>>>> 3a57d51d295e1aea0fbe14de0c9e60b5232a86b5

    if(user != null){
      $("#user").html("User: " + user.email + "");
    }

    var tutorReq = firebase.database().ref('requests');

    tutorReq.on("child_added", snap => {
		var date = snap.child("date").val();
		var done = snap.child("done").val();
		var email = snap.child("email").val();
		var location = snap.child("location").val();
		var subject = snap.child("subject").val();
		var time = snap.child("time").val();
		var tutor = snap.child("tutor").val();

		var newDate = splitDate(date);
		if(date != null) {
			$("#tutorsessionsbody").append("<div class=\"tutorreq\" onclick=\"takeSession()\"> <h2>Email: " + email + "</h2> " + "<h4>Date: " + date + "</h4> " + "<h4>time: " + time + "</h4>" + "<h4>location: " + location + "</h4>" + "<h4>Subject: " + subject + "</h4>" + "<h4>tutor: " + tutor + "</h4>");
		}
	});

  } else {
    // No user is signed in.
    $("#mainbody").css("display", "none");
    $(".main-div").fadeIn();
    $("#logout").css("display", "none");
    $("#bookasession a").html("LOGIN/SIGNUP");
    $("#indexlogout").fadeOut();
    $("#tutorsessions").css("display", "none");
    $("#bookasession a").html("Login Or Sign Up");
    $("#indexlogout").css("display", "none");
    
  }
});

function takeSession() {
	var date = event.currentTarget.childNodes[3].innerHTML;
	var newdate = splitDate(date.slice(6));
	var email = event.currentTarget.childNodes[0].innerHTML;
	var newemail = splitEmail(email.slice(7));
	alert(newemail);
	firebase.database().ref('requests/' + newdate + newemail).remove();
}

function sessionstab() {
	$("#sessionstab").fadeIn();
	 $("#booktab").css("display", "none");
}

function booktab() {
	$("#booktab").fadeIn();
	 $("#sessionstab").css("display", "none");
}

function openCreate() {
	$(".main-div").css("display", "none");
	$(".create-div").fadeIn();
}

//initialize database
var database = firebase.database();

//send account data to firebase
function writeAccount(name, email, phone) {
	var split = splitEmail(email);

		firebase.database().ref('users/' + split).set({
			name: name,
			phone: phone,
		    email: email,
		 });
}


//create new account
function createAccount() {
	var newName = $("#createname").val();
	var newEmail = $("#createemail").val();
	var newPhone = $("#createphone").val();
	var newPass = $("#createpassword").val();
	var confirmPass = $("#confirmpassword").val();

	if(newPass == confirmPass && newEmail != null) {
		firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
			event.preventDefault();
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  $("#errormessage2").html("Error : " + errorMessage);
		});
		firebase.auth().signInWithEmailAndPassword(newEmail, newPass);

		writeAccount(newName, newEmail, newPhone);

	} else {
		$("#errormessage2").html("Please make sure your passwords match.");
	}
}

//login + logout
function login() {
	var userEmail = $("#email_field").val();
	var userPass = $("#password_field").val();
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	    // Handle Errors here.
	    event.preventDefault();
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    $("#errormessage").html("Error : " + errorMessage);

	    // ...
	  });
}

function logout(){
  firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	  event.preventDefault();
	});
	$("#errormessage").html("");
	$("#errormessage2").html("");
}


//save requests to firebase
function writeRequest(email, location, date, time, subject, done, tutor) {
	var newEmail = splitEmail(email);
	var newDate = splitDate(date);

	firebase.database().ref('users/' + newEmail + "/" + newDate).set({
			email: email,
			location: location,
			date: date,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject
		  });

	firebase.database().ref('requests/' + newDate + newEmail).set({
			email: email,
			location: location,
			date: date,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject
		  });
}


//on tutoring request submit -> pushes form data to firebase
function validate() {
	var email = firebase.auth().currentUser.email;
	var location = $("#location").val();
	var date = $("#date").val();
	var time = $("#time").val();
	var tutor = $("#tutor").val();
	var subject = $("#subject").val();
	var missing = [];

	if(location == "") {
		missing.push(" location");
	}
	if(date == "") {
		missing.push(" date");
	}
	if(time == "") {
		missing.push(" time");
	}
	if(subject == "") {
		missing.push(" subject");
	}

	if(missing != "") {
		alert("Please enter the following: " + missing);
		event.preventDefault();
	} else {
		writeRequest(email, location, date, time, subject, "no", tutor);

		sessionStorage.setItem("location", location); 
		sessionStorage.setItem("date", date); 
		sessionStorage.setItem("time", time); 
		sessionStorage.setItem("tutor", tutor); 
		sessionStorage.setItem("subject", subject);

		return true;
	}
}

//loads confirmed.html innerHTML 
function loadConfirmed() {
	var location2 = sessionStorage.getItem("location");
	var date2 = sessionStorage.getItem("date");
	var time2 = sessionStorage.getItem("time");
	var tutor2 = sessionStorage.getItem("tutor");
	var subject2 = sessionStorage.getItem("subject");

	$("#bookedheader").html("Your tutoring request for " + date2 + " is logged.");
	$("#tutor2").html("Date: " + tutor2);
	$("#time2").html("Time: " + time2);
	$("#location2").html("Location: " + location2);
	$("#subject2").html("Subject: " + subject2);
}



function validatemsg() {
	var name = $("#msgname").val();
	var email = $("#msgemail").val();
	var message = $("#msg").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	if(name == "") {
		missing.push("name");
	}
	if(email.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(message == "") {
		missing.push(" your message");
	}
	if(missing != "") {
		alert("Please enter the following: " + missing);
		event.preventDefault();
	} else {
		return true;
	}
}





