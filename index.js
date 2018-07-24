var config = {
	    apiKey: "AIzaSyDqQoKK2MYCb_2FzUYmeafETdCVWi22JeI",
	    authDomain: "insta-tutors.firebaseapp.com",
	    databaseURL: "https://insta-tutors.firebaseio.com",
	    projectId: "insta-tutors",
	    storageBucket: "insta-tutors.appspot.com",
	    messagingSenderId: "624098741421"
	  };

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    $("#mainbody").fadeIn();
    $(".main-div").fadeOut();
    $("#logout").css("display", "block");

    if(user != null){

      $("#welcome").html("Welcome " + user.email);
    }

  } else {
    // No user is signed in.
    $("#mainbody").fadeOut();
    $(".main-div").fadeIn();
    $("#logout").css("display", "none");
    
  }
});

function createAccount() {
	var newEmail = $("#createemail").val();
	var newPass = $("#createpassword").val();

	firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
	window.location.assign("login.html");
}


function login() {
	var userEmail = $("#email_field").val();
	var userPass = $("#password_field").val();
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
	    // Handle Errors here.
	    event.preventDefault();
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    window.alert("Error : " + errorMessage);

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
}





function validate() {
	var name = $("#name").val();
	var email = $("#email").val();
	var location = $("#location").val();
	var date = $("#date").val();
	var time = $("#time").val();
	var subject = $("#subject").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	if(name == "") {
		missing.push("name");
	}
	if(email.search(validemail) == -1) {
		missing.push(" valid email");
	}
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
		/*sessionStorage.setItem("name", name); 
		sessionStorage.setItem("email", email); 
		sessionStorage.setItem("location", location); 
		sessionStorage.setItem("date", date); 
		sessionStorage.setItem("time", time); 
		sessionStorage.setItem("subject", subject); 
		window.location.assign("confirmed.html");*/
		return true;

	}
}

/*function loadConfirmed() {
	var name2 = sessionStorage.getItem("name");
	var email2 = sessionStorage.getItem("email");
	var location2 = sessionStorage.getItem("location");
	var date2 = sessionStorage.getItem("date");
	var time2 = sessionStorage.getItem("time");
	var subject2 = sessionStorage.getItem("subject");

	$("#bookedheader").html("Hello " + name2);
	$("#date2").html("Date: " + date2);
	$("#time2").html("Time: " + time2);
	$("#location2").html("Location: " + location2);
	$("#subject2").html("Subject: " + subject2);
}*/





