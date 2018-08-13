$(window).on('load', function () {
	$("#navbar").show();

	$( "#stars .fas" ).each(function(index) {
	    $(this).on("mouseout", function(){
	        // For the boolean value
	        $("#onestar").css("color", "#444");
			$("#twostar").css("color", "#444");
			$("#threestar").css("color", "#444");
			$("#fourstar").css("color", "#444");
			$("#fivestar").css("color", "#444");
	    });
	});
});

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

  $(window).scroll(function() {
    $(".length").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos <= winTop + 600) {
          $(this).addClass("lengthen");
        }
    });
  });

 $(window).scroll(function() {
    var winTop = $(window).scrollTop();

    $("#teamheadimg").css({
    'margin-top' : winTop/1.13
    });
});


function intersect(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]]) 
            results.push(a[j]);
    }
    return results;
}

 function rotate(x) {
    x.classList.toggle("change");
    $("#phonenavlinks").slideToggle("fast");
}

function opensidenav() {
    $(".sidebar").css("left", "0px");
    $(".sidebar").css("opacity", "1");
    $(".sidecancel").css("left", "340px");
    $(".socialmedia").css("left", "40px");
    $(".sidemask").css("width", "100%");
    $(".sidemask").css("opacity", "0.8");
    $(".sidebar a").each(function(){
          $(this).addClass("slideleft");
    });
    $(".sidebar .border-bot").addClass("lengthen");
}

function closesidenav() {
	$(".sidebar").css("opacity", "0.5");
	$(".sidebar").css("left", "-400px");
    $(".sidecancel").css("left", "-60px");
    $(".socialmedia").css("left", "-360px");
    $(".sidemask").css("width", "0");
    $(".sidemask").css("opacity", "0");
    $(".sidebar a").each(function(){
          $(this).removeClass("slideleft");
    });
    $(".sidebar .border-bot").removeClass("lengthen");
}

$(document).ready(function() {
    $(".back2top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
      });

    $("#indexhead a").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $("#howitworks").offset().top }, 800);
    return false;
      });

    $("#contactlink9").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $("#contact").offset().top }, 300);
    return false;
      });

    $( "#tuteeaddsubjects .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        $("#newsubject").val(this.innerHTML.toLowerCase()); 
	        $("#subjecttext").html(this.innerHTML);
	    });
	});

	$( "#tutors .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        $("#tutors h4 strong").html(this.innerHTML);
	    });
	});

	$( "#subjectmenu .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        if($("#subject").val() == "") {
	        	$("#subject").val(this.innerHTML.toLowerCase());
	        } else {
	        	$("#subject").val($("#subject").val() + ", " + this.innerHTML.toLowerCase()); 
	        }
	        $("#subjecttext2").html(this.innerHTML);
	    });
	});
});


//split functions for syntax
function splitEmail(email) {
	str = email.split("@");
	var res1 = str[0].replace(/\./g, "");
	var res2 = str[1].split(".");

	res = (res1 + res2[0]).toLowerCase();
	return(res);
}

function splitDate(date) {
	var newdate = date.split("-");
	return(newdate[1] + "-" + newdate[2] + "-" + newdate[0]); 
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    $("#verifyemail").html("Please Verify Your Email Address: <i>" + user.email + "</i>");

   	var split = splitEmail(user.email);

   	var email_verified = user.emailVerified;
   	console.log(email_verified);


   	if(email_verified == false) {

   		$("#email_div").fadeIn();
   		$(".main-div").css("display", "none");
   		$("#logout").css("display", "none");

   	} else {
   		$("#email_div").css("display", "none");

	   	var isTutor = firebase.database().ref('users/' + split).child('stat');

		isTutor.on('value', snap => {
			if(snap.val() == "tutor") {
				$(".main-div").css("display", "none");
			    $("#logout").fadeIn();
			    $(".create-div").css("display", "none");
			    $("#indexlogout").fadeIn();
			    $("#bookasession").css("display", "none");
			    $("#sidelogin").html("SEE ALL REQUESTS");
			    $("#login2").html("See All Requests");
			    $("#tutorsessions").fadeIn();

			    var tutorSubjects = firebase.database().ref('users/' + split).child("subjects");

				tutorSubjects.on("value", snap => {
					var subjects = snap.val();
					var splitsubs = subjects.split(",");
					var text = "";
					for(var i=0; i<splitsubs.length; i++) {
						var sub = splitsubs[i].toLowerCase();

						text += "<h5 class=\"label " + sub + "\">" + splitsubs[i] + "</h5> ";
					}

					$("#tutorsubjectsarea").html(text);
				});

			    var mySession = firebase.database().ref('users/' + split);

				mySession.on("child_added", snap => {
					var date = snap.child("date").val();
					var email = snap.child("email").val();
					var subject = snap.child("subject").val();
					var details = snap.child("details").val();
					var time = snap.child("time").val();

					var selectedDate = new Date(splitDate(splitDate(date)));
   					var now = new Date();

					if(now < selectedDate && date != null) {
							$("#tutormysessionsbody").append("<div class=\"tutorreq\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>email: " + email + "</h4>");
						} else {
							if(date != null) {
								$("#tutorpastsessionsbody").append("<div class=\"tutorreq lightblue\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>email: " + email + "</h4>");				
							}
						}

					//update previous sessions count
					firebase.database().ref('users/' + split).on('value', function(snapshot) {
						var returnArr = [];
						snapshot.forEach(function(childSnapshot) {
					        var date2 = childSnapshot.child("date").val();
					        returnArr.push(date2);
					    });
						var newArr = [];
					    for(var n=0; n<returnArr.length; n++) {
					    	var selectedDate2;
					    	if(returnArr[n] != null) {
					        	selectedDate2 = new Date(splitDate(splitDate(returnArr[n])));
					        }
					        var now2 = new Date();
					        if(returnArr[n] != null && selectedDate2 < now2) {
					        	newArr.push(returnArr[n]);
						    }
					    }
					    firebase.database().ref('users/' + split).child("pastSessions").set(newArr.length);
					});

					});	    

			} else {
				$("#mainbody").fadeIn();
			    $(".main-div").css("display", "none");
			    $("#logout").fadeIn();
			    $(".create-div").css("display", "none");
			    $("#bookasession").css("display", "none");
			    $("#sidelogin").html("Request a Session");
			    $("#login2").html("Request a Session");
			    $("#indexlogout").fadeIn();

			    var tuteeSubjects = firebase.database().ref('users/' + split).child("subjects");

				tuteeSubjects.on("value", snap => {
					var subjects = snap.val();
					var splitsubs = subjects.split(",");
					var text = "";
					for(var i=0; i<splitsubs.length; i++) {
						var sub = splitsubs[i].toLowerCase();

						text += "<h5 class=\"label " + sub + "\">" + splitsubs[i] + "</h5> ";
					}

					$("#mysubjectsarea").html(text);
				});
				
				firebase.database().ref('users/' + split).on('value', function(snapshot) {
						var returnArr = [];
						snapshot.forEach(function(childSnapshot) {
					       	if(childSnapshot.child("stars").val()) {
					       		var snapemail = splitEmail(childSnapshot.child("email").val());
					       		var snapdate = childSnapshot.child("date").val();
					       		var id = snapemail + snapdate;
					       		$("#" + id).html(childSnapshot.child("stars").val() + " <i class=\"fas fa-star\"></i>");
					       	}
					    });
				});


			    var reqRef = firebase.database().ref('users/' + split);
		//date, time, location, tutor, done, subject
				reqRef.on("child_added", snap => {
					var date = snap.child("date").val();
					var done = snap.child("done").val();
					var email = snap.child("email").val();
					var subject = snap.child("subject").val();
					var details = snap.child("details").val();
					var time = snap.child("time").val();
					var tutor = snap.child("tutor").val();

					var color;
					if(done == "yes") {
						color = " green";
					} else {
						color = "";
					}
					if(date != null) {
						var selectedDate = new Date(splitDate(splitDate(date)));
					}
   					var now = new Date();

					if(now < selectedDate && date != null) {
							$("#sessionsbody").append("<div class=\"req" + color + "\"> <div class=\"cancel\" onclick=\"cancel()\"><i class=\"fas fa-times\"></i></div> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> </h4>" + "<h4>Subjects: " + subject + "</h4> <h4>Details: "+ details + "</h4> <h4>tutor: " + tutor + "</h4> </div>");
						} else {
							if(date != null) {
								$("#pastsessionsbody").append("<div class=\"req lightblue\"> <div class=\"star\" id=\"" + splitEmail(email) + date + "\"> <i onclick=\"openStar()\" class=\"fas fa-star\"></i> </div> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> </h4>" + "<h4>Subjects: " + subject + "</h4> <h4>Details: "+ details + "</h4> <h4>tutor: " + tutor + "</h4> </div>");
							}
						}

					firebase.database().ref('users/' + split).on('value', function(snapshot) {
						var returnArr = [];
						snapshot.forEach(function(childSnapshot) {
					        var date2 = childSnapshot.child("date").val();
					        returnArr.push(date2);
					    });
						var newArr = [];
					    for(var n=0; n<returnArr.length; n++) {
					    	var selectedDate2;
					    	if(returnArr[n] != null) {
					        	selectedDate2 = new Date(splitDate(splitDate(returnArr[n])));
					        }
					        var now2 = new Date();
					        if(returnArr[n] != null && selectedDate2 < now2) {
					        	newArr.push(returnArr[n]);
						    }
					    }
					    firebase.database().ref('users/' + split).child("pastSessions").set(newArr.length);
					});
				});
			}
		});
	}


    var userName = firebase.database().ref('users/' + split).child('name');

	userName.on('value', snap => {
		$("#welcome").html("Welcome " + snap.val()+ "!");
		$("#tutorwelcome").html("Welcome " + snap.val()+ "!");
	});

	var pastSessions = firebase.database().ref('users/' + split).child('pastSessions');

	pastSessions.on('value', snap => {
		$("#sessionscount").html(snap.val());
		$("#tutorsessionscount").html(snap.val());
	});

    if(user != null){
      $("#user").html("User: " + user.email + "");
      $("#tutoruser").html(user.email);
    }

    var tutorReq = firebase.database().ref('requests');

    var allReqs = "";

    tutorReq.on("child_added", snap => {
		var date = snap.child("date").val();
		var done = snap.child("done").val();
		var email = snap.child("email").val();
		var subject = snap.child("subject").val();
		var details = snap.child("details").val();
		var time = snap.child("time").val();
		var tutor = snap.child("tutor").val();

		var myUser = firebase.database().ref('users/' + split).child("subjects");

		myUser.on("value", snap => {
				var splitsubs = snap.val().split(",");
				var reqsubs = subject.split(", ");

				var overlap = intersect(splitsubs, reqsubs).length;
				//check whether request's subjects overlap tutor's subjects
				//if not, don't show request

				var display;
				if(overlap == 0 || done == "yes") {
					display = "none";
				} else {
					display = "block";
				}

				if(date != null) {
					$("#tutorsessionsbody").append("<div class=\"tutorreq\" style=\"display: " + display + "\" onclick=\"takeSession()\"> <h2>Email: " + email + "</h2> " + "<h4>Date: " + date + "</h4> " + "<h4>time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>tutor: " + tutor + "</h4> </div>");
				}
		});
	});

	$("#tutorsessionsbody").html(allReqs);

  } else {
    // No user is signed in.
    $("#mainbody").css("display", "none");
    $(".main-div").fadeIn();
    $("#email_div").css("display", "none");
    $("#logout").css("display", "none");
    $("#bookasession").css("display", "block");
    $("#sidelogin").html("LOGIN or SIGNUP");
    $("#indexlogout").fadeOut();
    $("#tutorsessions").css("display", "none");
    
  }
});

function sendVerification() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  alert("Email verification sent!  Check your inbox in 2-3 minutes, and follow the instructions in the email.")
	}).catch(function(error) {
	  alert("Error: " + error.message);
	});
}

function openResetPass() {
	$(".main-div").css("display", "none");
	$("#reset_div").fadeIn();
}

//reset Password
function resetPass() {
	var emailAddress = $("#reset_email_field").val();

	firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("Reset email sent!  Please check your inbox and follow the instructions in the email.")
	}).catch(function(error) {
	  alert(error.message);
	  console.log(error);
	});
}

//Same thing, but from the account
function resetPass2() {
	var emailAddress = firebase.auth().currentUser.email;

	firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("Reset email sent!  Please check your inbox and follow the instructions in the email.")
	}).catch(function(error) {
	  alert(error.message);
	  console.log(error);
	});
}

//for Tutors to claim a session
function takeSession() {
	var date = event.currentTarget.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = event.currentTarget.childNodes[1].innerHTML;
	var time = event.currentTarget.childNodes[5].innerHTML.slice(6);
	var subject = event.currentTarget.childNodes[7].innerHTML.slice(9);
	var newemail = splitEmail(email.slice(7));
	var r = confirm("Confirm that you can commit to tutoring this session?");
	var yes = "yes";

	var split = splitEmail(firebase.auth().currentUser.email);

	var userName = firebase.database().ref('users/' + split).child('name');

	if(r == true) {
		userName.on('value', snap => {
			firebase.database().ref('requests/' + newdate + newemail).child("tutor").set(snap.val());
			firebase.database().ref('users/' + newemail + "/" + newdate).child("tutor").set(snap.val());
		});
		firebase.database().ref('requests/' + newdate + newemail).child("done").set(yes);
		firebase.database().ref('users/' + newemail + "/" + newdate).child("done").set(yes);
		alert("confirmed. ");
		firebase.database().ref('users/' + split + "/" + newdate).set({
		    email: email.slice(7),
		    date: newdate,
		    time: time,
			subject: subject,
			details: details,	
		 });

		var content = "<h3 style=\"color: #ae3dc6\">Tutor Contact: " + firebase.auth().currentUser.email + "</h3> <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subjects:</strong> " + subject + "</p> <p>Your tutor will email you within 24 hours!</p>";

		Email.send("support@instatutors.org",
			email,
			"Confirmed: Tutoring Session on " + date,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
		}	
}

//cancel Tutoring session (request)
function cancel() {
	var input = prompt("To cancel a session, please input your email.");
	var date = event.currentTarget.parentNode.childNodes[3].innerHTML;
	var newdate = date.slice(6);
	var email = firebase.auth().currentUser.email;
	var newemail = splitEmail(email);
	var subject = event.currentTarget.parentNode.childNodes[7].innerHTML.slice(10);

	if(input == email) {
		var reason = prompt("What is your reason for canceling?");
		firebase.database().ref('requests/' + newdate + newemail).remove();
		firebase.database().ref('users/' + newemail + "/" + newdate).remove();
		firebase.database().ref('requests/' + newdate + newemail).remove();
		firebase.database().ref('users/' + newemail + "/" + newdate).remove();

		var content = "<h3 style=\"color: red\">Tutoring Session Canceled -</h3>  <p><strong>Date:</strong> " + newdate + "</p> <p><strong>Reason:</strong> " + reason + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p>"; 
		Email.send("support@instatutors.org",
			"tutors@instatutors.org",
			"New Tutoring Session Requested for " + subject + " on " + newdate,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
		
		alert("Tutoring session for " + newdate + " canceled.");
	} else {
		alert("wrong email. aborting.")
	}
}

//update Star Count for tutors
var currenttutor;
var currentdate;

function openStar() {
	$("#starsmask").fadeIn();
	$("#stars").fadeIn();
	currenttutor = event.currentTarget.parentNode.parentNode.childNodes[11].innerHTML.slice(7);
	currentdate = event.currentTarget.parentNode.parentNode.childNodes[3].innerHTML.slice(6);
}

function star(stars) {
	var split = splitEmail(firebase.auth().currentUser.email);
	var ref = firebase.database().ref('users');

	alert("Thank you for rating " + currenttutor + " " + stars + " stars.");
	$("#starsmask").fadeOut();
	$("#stars").fadeOut();

	firebase.database().ref('users/' + split + "/" + currentdate).child("stars").set(stars);

	var tutoremail = "";
	ref.orderByChild("name").equalTo(currenttutor).on("value", snap => {
		var prevstars;
		if(tutoremail == "") {
			tutoremail += Object.keys(snap.val())[0];
		} else {
			tutoremail = "trash/" + Object.keys(snap.val())[0];
		}
		firebase.database().ref('users/' + tutoremail).child('totalStars').on("value", snap => {
			prevstars = snap.val();
		});
		firebase.database().ref('users/' + tutoremail).child('totalStars').set(prevstars + stars);
	});
}

function hoverone() {
	$("#onestar").css("color", "gold");
}

function hovertwo() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
}

function hoverthree() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
}

function hoverfour() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
	$("#fourstar").css("color", "gold");
}

function hoverfive() {
	$("#onestar").css("color", "gold");
	$("#twostar").css("color", "gold");
	$("#threestar").css("color", "gold");
	$("#fourstar").css("color", "gold");
	$("#fivestar").css("color", "gold");
}

function closeStars() {
	$("#starsmask").fadeOut();
	$("#stars").fadeOut();
}

function sessionstab() {
	$("#sessionstab").fadeIn();
	 $("#booktab").css("display", "none");
}

function booktab() {
	$("#booktab").fadeIn();
	 $("#sessionstab").css("display", "none");
}

function allsessionstab() {
	$("#allsessions").fadeIn();
	 $("#tutormysessions").css("display", "none");
}

function tutorsessionstab() {
	$("#tutormysessions").fadeIn();
	 $("#allsessions").css("display", "none");
}

function openCreate() {
	$(".main-div").css("display", "none");
	$(".create-div").fadeIn();
}

//initialize database
var database = firebase.database();

//send account data to firebase
function writeAccount(name, email, phone, stat) {
	var split = splitEmail(email);

		firebase.database().ref('users/' + split).set({
			name: name,
			phone: phone,
		    email: email,
		    stat: stat,
		    pastSessions: 0
		 });
}


//create new account
function createAccount() {
	var newName = $("#createname").val();
	var newEmail = $("#createemail").val();
	var newPhone = $("#createphone").val();
	var newPass = $("#createpassword").val();
	var confirmPass = $("#confirmpassword").val();
	var stat = "tutee";

	if(newPass == confirmPass && newPass != "" && newEmail != "") {
		if($("#termscheck").checked == false) {
			$("#errormessage2").html("Please agree to the terms and conditions.");
		} else {
			firebase.auth().createUserWithEmailAndPassword(newEmail, newPass).catch(function(error) {
			event.preventDefault();
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  $("#errormessage2").html("Error : " + errorMessage);
			});

			firebase.auth().signInWithEmailAndPassword(newEmail, newPass);

			writeAccount(newName, newEmail, newPhone, stat);

			$(".create-div").css("display", "none");
			$("#email_div").fadeIn();

			sendVerification();
		}

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

	if(firebase.auth().currentUser.emailVerified == false) {
		$("#email_div").fadeIn();
	}
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
function writeRequest(email, date, time, subject, details, done, tutor) {
	var newEmail = splitEmail(email);
	var newDate = splitDate(date);

	firebase.database().ref('users/' + newEmail + "/" + newDate).set({
			email: email,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject,
			details: details
		  });

	firebase.database().ref('requests/' + newDate + newEmail).set({
			email: email,
			date: newDate,
			time: time,
			tutor: tutor,
			done: "no",
			subject: subject,
			details: details
		  });
}


//on tutoring request submit -> pushes form data to firebase
function validate() {
	var email = firebase.auth().currentUser.email;
	var date = $("#date").val();
	var time = $("#time").val();
	var tutor = $("#tutor").val();
	var subject = $("#subject").val();
	var details = $("#details").val();
	var missing = [];

	var selectedDate = new Date(date);
   	var now = new Date();


	if(date == "" || selectedDate < now.setDate(now.getDate() + 4)) {
		missing.push(" valid date, date must be at least 4 days ahead.");
	}
	if(time == "") {
		missing.push(" time");
	}
	if(subject == "") {
		missing.push(" subject");
	}

	if(missing != "") {
		$("#formerrors").html("Please enter the following: " + missing);
		event.preventDefault();
	} else {
		writeRequest(email, date, time, subject, details, "no", tutor);

		var content = "<h3 style=\"color: #ae3dc6\">New Tutoring Session -</h3>  <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Details:</strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";

		var ref = firebase.database().ref('users');
	//get uids of all tutors
		ref.orderByChild("stat").equalTo("tutor").on("value", snap => {
	 		var tutorids = Object.keys(snap.val());
	 		console.log(tutorids);
	 		for(var i=0; i<tutorids.length; i++) {
	 			var myUser = firebase.database().ref('users/' + tutorids[i]).child("subjects");
				myUser.on("value", snap => {
						var splitsubs = snap.val().split(",");
						var reqsubs = subject.split(", ");

						var overlap = intersect(splitsubs, reqsubs).length;
						//check whether request's subjects overlap tutor's subjects
						//if not, don't show request
						if(overlap > 0) {
							var tutoremail = firebase.database().ref('users/' + tutorids[i]).child("email");
							tutoremail.on("value", snap => {
								console.log(snap.val());
								Email.send("support@instatutors.org",
											snap.val(),
											"New Tutoring Session Requested for " + subject + " on " + splitDate(date),
											content,
											{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
							});
						}

				});
			}
		 });
		
		$("#bookedheader").html("Your tutoring request for " + date + " is logged.");
		$("#tutor2").html("Tutor: " + tutor);
		$("#time2").html("Time: " + time);
		$("#subject2").html("Subject: " + subject);
		$("#details2").html("Details: " + details);

		$("#mainbody").css("display", "none");
		$("#confirmedbody").fadeIn();
		$("#logout").css("display", "none");

		//send confirmation email to user
		Email.send("support@instatutors.org",
			email,
			"Tutoring Session Requested for " + subject + " on " + splitDate(date),
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
			//527d49d6-dba7-4334-8775-1b8ccd9b3eeb 

		return true;
	}
}

//add subject to user's subjects
function addSubject() {
	var email = firebase.auth().currentUser.email;
	var subject = $("#newsubject").val();
	var newEmail = splitEmail(email);

	var tuteeSubjects = firebase.database().ref('users/' + newEmail).child("subjects");

	var currentSubjects;

	tuteeSubjects.on("value", snap => {
		currentSubjects = snap.val();
	});

	if(subject != "") {
		if(currentSubjects == null) {
			$("#subjectmessage").css("color", "green");
			$("#subjectmessage").html(subject + " added as a subject!");
			firebase.database().ref('users/' + newEmail).update({ subjects: subject.toLowerCase() + "," + currentSubjects});
		} else if (currentSubjects.search(subject) === -1) {
			$("#subjectmessage").css("color", "green");
			$("#subjectmessage").html(subject + " added as a subject!");
			firebase.database().ref('users/' + newEmail).update({ subjects: subject.toLowerCase() + "," + currentSubjects});
		} else {
			$("#subjectmessage").css("color", "red");
			$("#subjectmessage").html("You already have " + subject + " as a subject!");
		}
	} else {
		$("#subjectmessage").css("color", "red");
		$("#subjectmessage").html("Please enter a subject.")
	}
}

//delete all subjects from user's subjects
function deletesubjects() {
	alert("Deleting all subjects.");
	var email = firebase.auth().currentUser.email;
	var newEmail = splitEmail(email);
	firebase.database().ref('users/' + newEmail).update({ subjects: ""});
}

//find a tutor
function matchTutors() {
	var user = firebase.auth().currentUser;
	var split = splitEmail(user.email);
	var tuteeSubjects = firebase.database().ref('users/' + split).child("subjects");
	var tuteeSubArray = "";

	tuteeSubjects.on("value", snap => {
		tuteeSubArray = snap.val();
	});

	tuteeSubArray = tuteeSubArray.split(",");

	var tutordata;
	var matchedtutors = "";
	var goodtutors = "";

	var ref = firebase.database().ref('users');
	//get uids of all tutors
	ref.orderByChild("stat").equalTo("tutor").on("value", snap => {
	 	tutordata = snap.val();
	 	var tutorids = Object.keys(snap.val());

	 	for(var i=0; i<tutorids.length; i++) {
	 		var tutorSub = firebase.database().ref('users/' + tutorids[i]).child("subjects");

	 		//determine overlap between user subjects & tutor subjects
	 		tutorSub.on("value", snap => {
	 			var tutorSubArray = snap.val().split(",");
	 			var inCommon = intersect(tuteeSubArray, tutorSubArray);

	 			if(inCommon.length > 1) {
	 				matchedtutors += tutorids[i] + ",";
	 			} else if (inCommon.length == 1) {
	 				goodtutors += tutorids[i] + ",";
	 			}
	 		});
	 	}

	 	var mytutors = "";

	 	var matches = matchedtutors.split(",");
	 	var good = goodtutors.split(",");

	 	//add tutors to "great matches"
		for(var i=0; i<matches.length; i++) {
			var tutorRef = firebase.database().ref('users/' + matches[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor great\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add tutors to "good matches"
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('users/' + good[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor good\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add DOM elements to matched tutors
		if(mytutors == "") {
			$("#mytutorsarea").html("<p>No tutors found.  Sorry.</p>");
		} else {
			$("#mytutorsarea").html(mytutors);
		}
	});
}

function viewTutors() {
	var tuteeSubArray = $("#subject").val().split(", ");
	console.log(tuteeSubArray);

	var tutordata;

	var matchedtutors = "";
	var goodtutors = "";

	var ref = firebase.database().ref('users');
	//get uids of all tutors
	ref.orderByChild("stat").equalTo("tutor").on("value", snap => {
	 	tutordata = snap.val();
	 	var tutorids = Object.keys(snap.val());

	 	for(var i=0; i<tutorids.length; i++) {
	 		var tutorSub = firebase.database().ref('users/' + tutorids[i]).child("subjects");

	 		//determine overlap between user subjects & tutor subjects
	 		tutorSub.on("value", snap => {
	 			var tutorSubArray = snap.val().split(",");
	 			var inCommon = intersect(tuteeSubArray, tutorSubArray);

	 			if(inCommon.length > 1) {
	 				matchedtutors += tutorids[i] + ",";
	 			} else if (inCommon.length == 1) {
	 				goodtutors += tutorids[i] + ",";
	 			}
	 		});
	 	}

	 	var mytutors = "";

	 	var matches = matchedtutors.split(",");
	 	var good = goodtutors.split(",");

	 	//add tutors to "great matches"
		for(var i=0; i<matches.length; i++) {
			var tutorRef = firebase.database().ref('users/' + matches[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				console.log(subjects);
				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"viewtutor great\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add tutors to "good matches"
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('users/' + good[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"viewtutor good\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add DOM elements to matched tutors
		if(mytutors == "") {
			$("#tutorspace").html("<p>No tutors found.  Sorry.</p>");
		} else {
			$("#tutorspace").html(mytutors);
		}
	});
}

function selectTutor() {
	var name = event.currentTarget.childNodes[1].innerHTML;
	$("#tutor").val(name);
	$("#formerrors").css("color", "#444");
	$("#formerrors").html("Selected " + name + " as a tutor.");
}

//validate message on homepage
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
		$("#formStatus").css("color", "red");
		$("#formStatus").html("Please enter the following: " + missing + ".");
	} else {
		$("#formStatus").css("color", "green");
		$("#formStatus").html("Message Sent!  We will try to get back to you within 24 hours.");
		var content = "<h3>New Message</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>email:</strong> " + email + "</p> <p><strong>Message:</strong> " + message + "</p>"; 
		document.getElementById("contactForm").reset();

		Email.send("inquiries@instatutors.org",
			"tutors@instatutors.org",
			"New Message from " + name,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
	}
}


//filter function 

//TO DO: make this dynamic
$(document).ready(function() {
    $("#all").click(function(event) {
    	$("#filtertext").html("All");
        $("#matthewcho").show();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").show();
		$("#nitin").show();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").show();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").show();
		$("#alex").show();
		$("#luigi").show();
    });

    $("#math").click(function(event) {
    	$("#filtertext").html("Math");
        $("#matthewcho").show();
		$("#varsha").show();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").show();
		$("#rohit").show();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").show();
		$("#alex").show();
		$("#luigi").show();
    });

    $("#physics").click(function(event) {
    	$("#filtertext").html("Physics");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").show();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#bio").click(function(event) {
    	$("#filtertext").html("Biology");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").show();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").show();
    });

    $("#chem").click(function(event) {
    	$("#filtertext").html("Chemistry");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").show();
		$("#conner").show();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").show();
		$("#keshav").show();
		$("#chirag").show();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").show();
    });

    $("#writing").click(function(event) {
    	$("#filtertext").html("Writing");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").show();
		$("#sangita").show();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").show();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").show();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").show();
		$("#rohun").hide();
		$("#alex").show();
		$("#luigi").show();
    });

    $("#history").click(function(event) {
    	$("#filtertext").html("History");
        $("#matthewcho").hide();
		$("#varsha").show();
		$("#reedit").hide();
		$("#matthewsheh").show();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").show();
		$("#rukmini").show();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#webdev").click(function(event) {
    	$("#filtertext").html("Web Development");
        $("#matthewcho").hide();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").show();
		$("#rukmini").hide();
		$("#rohun").show();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#java").click(function(event) {
    	$("#filtertext").html("Java");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").show();
		$("#kyle").show();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").show();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").show();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#python").click(function(event) {
    	$("#filtertext").html("Python");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").show();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#business").click(function(event) {
    	$("#filtertext").html("Business");
        $("#matthewcho").hide();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").show();
		$("#dan").hide();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });

    $("#spanish").click(function(event) {
    	$("#filtertext").html("Spanish");
        $("#matthewcho").show();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").hide();
		$("#nitin").show();
		$("#sahana").show();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").show();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });

   $("#french").click(function(event) {
    	$("#filtertext").html("French");
        $("#matthewcho").hide();
		$("#varsha").hide();
		$("#reedit").hide();
		$("#matthewsheh").hide();
		$("#sangita").hide();
		$("#conner").hide();
		$("#kyle").hide();
		$("#stuti").hide();
		$("#dan").show();
		$("#nitin").hide();
		$("#sahana").hide();
		$("#keshav").hide();
		$("#chirag").hide();
		$("#sophie").hide();
		$("#rohit").hide();
		$("#samyang").hide();
		$("#rukmini").hide();
		$("#rohun").hide();
		$("#alex").hide();
		$("#luigi").hide();
    });
});
