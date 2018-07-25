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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;

    $("#mainbody").fadeIn();
    $(".main-div").css("display", "none");
    $("#logout").css("display", "block");
    $(".create-div").css("display", "none");

    if(user != null){

      $("#welcome").html("Welcome " + user.email + "!");
      $("#user").html("User: " + user.email + "");
    }

  } else {
    // No user is signed in.
    $("#mainbody").css("display", "none");
    $(".main-div").fadeIn();
    $("#logout").css("display", "none");
    
  }
});

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


var users = firebase.database().ref('users');


function createAccount() {
	var newName = $("#createname").val();
	var newEmail = $("#createemail").val();
	var newPass = $("#createpassword").val();
	var confirmPass = $("#confirmpassword").val();

	if(newPass == confirmPass) {
		firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
			event.preventDefault();
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert("Error : " + errorMessage);
		});
		firebase.auth().signInWithEmailAndPassword(newEmail, newPass);

		var newUser = users.push();
		newUser.set({
			name: newName,
			email: newEmail,
			password: newPass
		});

	} else {
		alert("Please make sure your passwords match.");
	}
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


var requests = firebase.database().ref('requests');


//save requests to firebase

function validate() {
	var email = firebase.auth().currentUser.email;
	var location = $("#location").val();
	var date = $("#date").val();
	var time = $("#time").val();
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
		sessionStorage.setItem("location", location); 
		sessionStorage.setItem("date", date); 
		sessionStorage.setItem("time", time); 
		sessionStorage.setItem("subject", subject);
		
		var newRequest = requests.push();
		newRequest.set({
			email: firebase.auth().currentUser.email,
			location: location,
			date: date,
			time: time,
			tutor: $("#tutor").val(),
			subject: subject
		});

		return true;
	}
}

function loadConfirmed() {
	var email2 = null;
	var location2 = sessionStorage.getItem("location");
	var date2 = sessionStorage.getItem("date");
	var time2 = sessionStorage.getItem("time");
	var subject2 = sessionStorage.getItem("subject");

	$("#bookedheader").html("Hello " + email2);
	$("#date2").html("Date: " + date2);
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





