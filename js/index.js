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

	$('[data-toggle="popover"]').popover();

	$("#tutorbio").prop("readonly", true);

	$("#loading").css("opacity", "0");
	$("#loading").css("top", "-500px");
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
    $("#contact").css({
    	'background-position' : 20 + (winTop/60) + "%"
    });
    $("#howitworks").css({
    	'background-position' :  10 + (winTop/60) + "%"
    });
    $("#aboutbody").css({
    	'background-position' :  60 + (winTop/60) + "%"
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

$(document).ready(function(){
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

    $("#weekly").on("click", function(){
    	$("#numberofsessions").show();
    	$("#timingcount").show();
    });

    $("#bi-weekly").on("click", function(){
    	$("#numberofsessions").show();
    	$("#timingcount").show();
    });

    $("#one-time").on("click", function(){
    	$("#numberofsessions").hide();
    	$("#timingcount").hide();
    });

    //tutor filter function 
	$( "#tutors .dropdown-item" ).each(function(index) {
	    $(this).not("#all").on("click", function(){
	        $("#tutors h4 strong").html(this.innerHTML);
	        $("#filtertext").html(this.innerHTML);
	        var subject = this.innerHTML.toLowerCase();
	        $( ".tutor" ).each(function( index ) {
			  var content = this.innerHTML.toLowerCase();
			  if(content.search(subject) == -1) {
			  	$(this).hide();
			  } else {
			  	$(this).show();
			  }
			});
	    });
	});

	$("#all").on("click", function(){
		$("#tutors h4 strong").html(this.innerHTML);
	    $("#filtertext").html(this.innerHTML);
		$( ".tutor" ).each(function(index) {
			$(this).hide();
			$(this).show();
		});
	});

	$( ".tutor" ).each(function(index) {
	    $(this).on("click", function(){
			var name = event.currentTarget.childNodes[3].innerHTML;
			firebase.database().ref('names/' + name).child('id').on("value", snap => {
		 		var tutorids = snap.val();
		 		console.log(tutorids);
		 		var tutorinfo = firebase.database().ref('users/' + tutorids);
				tutorinfo.on('value', snap => {
					var tutorname = snap.child("name").val();
					var tutorsubjects = snap.child("subjects").val().split(",");
					for(var k=0; k<tutorsubjects.length; k++) {
						tutorsubjects[k] = tutorsubjects[k].charAt(0).toUpperCase() + tutorsubjects[k].slice(1);
					}
					tutorsubjects = tutorsubjects.join(", ");
					var tutorbio = snap.child("bio").val();
					$("#bioname").html(tutorname);
					$("#biosubjects").html(tutorsubjects);
					$("#biobio").html(tutorbio);
				});
		 	});
		 	$("#biomask").fadeIn();
			$("#biopopup").fadeIn();	        
	    });
	});

	$( "#subjectmenu .dropdown-item" ).each(function(index) {
	    $(this).on("click", function(){
	        // For the boolean value
	        var subjectslength = $("#subject").val().split(", ").length;

		    if($("#subject").val().search(this.innerHTML.toLowerCase()) != -1) {
		    	$("#subjectfielderror").html("You have " + this.innerHTML.toLowerCase() + " as a subject already");
		    } else if(subjectslength == 3) {
		    	$("#subjectfielderror").html("You can request up to 3 subjects per session.");
		    } else {
		        if($("#subject").val() == "") {
		        	$("#subject").val(this.innerHTML.toLowerCase());
		        } else {
		        	$("#subject").val($("#subject").val() + ", " + this.innerHTML.toLowerCase()); 
		        }
		        $("#subjecttext2").html(this.innerHTML);
		        $("#subjectfielderror").html("");
		    }
	    });
	});

	$( "#applysubjectmenu .dropdown-item" ).each(function(index) {
		$(this).on("click", function(){
			if($("#applysubjects").val() == "") {
			   $("#applysubjects").val(this.innerHTML);
			} else {
			    $("#applysubjects").val($("#applysubjects").val() + ", " + this.innerHTML); 
			}
			$("#subjecttext3").html(this.innerHTML);
		});
	});

	$("#applysubjectclear").on("click", function(){
		$("#applysubjects").val('');
	});

	$("#subjectclear").on("click", function(){
		$("#subject").val('');
		$("#subjectfielderror").html("");
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

function convertMilitary(time) {
	var arr = time.split(":");
	var hours = arr[0];
	var minutes = arr[1];
	var ampm = "AM";
	if(hours > 12) {
		hours = hours - 12;
		ampm = "PM";
	}
	return(hours + ":" + minutes + " " + ampm);
}

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    var split = splitEmail(user.email);
    /*if(user.email != null) {
	   	var split = splitEmail(user.email);
	   	console.log(user.email);
	   	var reference = firebase.database().ref("users/" + split);
	   	reference.once('value', snap => {
		   	var value = snap.child("email").val();
		   	console.log(value);
		   	if(value == null) {
		   		firebase.database().ref('users/' + split).set({
					name: user.displayName,
				    email: user.email,
				    stat: "tutee",
				    pastSessions: 0
				 });

				firebase.database().ref('names/' + user.displayName).set({
					id: splitEmail(user.email)
				});
		   	}
		});
		$("#fberrordiv").hide();
	} else {
		user.delete();
		$("#fberrordiv").show();
		console.log("deleted");
		$(".main-div").css("transform", "scale(0)");
		$("#mainbody").css("transform", "scale(0)");
	    $("#email_div").css("display", "none");
	    $("#logout").css("transform", "scale(0)");
	    $("#sidelogin").html("LOGIN");
	    $("#tutorsessions").css("transform", "scale(0)");
	}*/

	if(user.emailVerified == false) {
		$("#email_div").fadeIn();
		$(".main-div").css("display", "none");
	} else {
	   	var isTutor = firebase.database().ref('users/' + split).child('stat');

			isTutor.on('value', snap => {
				if(snap.val() == "tutor") {
					$("#email_div").css("display", "none");
					$(".main-div").css("display", "none");
				    $("#logout").fadeIn();
				    $(".create-div").css("display", "none");
				    $("#bookasession a").html("See All Requests");
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

					var tutorbio = firebase.database().ref('users/' + split).child("bio");

					tutorbio.on("value", snap => {
						$("#tutorbio").html(snap.val());
					});


					var tutorPastSess = firebase.database().ref('users/' + split).child("pastSessions");

					tutorPastSess.on("value", snap => {
						var pastSessions = snap.val();
						if(pastSessions > 0) {
							firebase.database().ref('users/' + split).child("totalStars").on("value", snap => {
								$("#tutorrating").html((snap.val()/pastSessions).toFixed(2) + " <i class=\"fas fa-star\"></i>");
							});
						}
					});

				    var mySession = firebase.database().ref('users/' + split);

					mySession.on("child_added", snap => {
						var date = snap.child("date").val();
						var email = snap.child("email").val();
						var subject = snap.child("subject").val();
						var details = snap.child("details").val();
						var time = convertMilitary(snap.child("time").val());

						var selectedDate = new Date(splitDate(splitDate(date)));
	   					var now = new Date();

						if(now < selectedDate && date != null) {
								$("#tutormysessionsbody").append("<div class=\"tutorreq\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>Email: " + email + "</h4>");
							} else {
								if(date != null) {
									$("#tutorpastsessionsbody").append("<div class=\"tutorreq lightblue\"> <h2>Date: " + date + "</h2> " + "<h4>time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>Email: " + email + "</h4>");				
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
					$("#email_div").css("display", "none");
					$("#mainbody").fadeIn();
				    $(".main-div").css("display", "none");
				    $("#logout").fadeIn();
				    $(".create-div").css("display", "none");
				    $("#bookasession a").html("Request a Session")
				    $("#sidelogin").html("Request a Session");
				    $("#login2").html("Request a Session");

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
						var time = convertMilitary(snap.child("time").val());
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
								$("#sessionsbody").append("<div class=\"req" + color + "\"> <div class=\"cancel\" onclick=\"cancel()\"><i class=\"fas fa-times\"></i></div> <h2>Date: " + date + "</h2> " + "<h4>Time: " + time + "</h4> </h4>" + "<h4>Subjects: " + subject + "</h4> <h4>Details: "+ details + "</h4> <h4>Tutor: " + tutor + "</h4> </div>");
							} else {
								if(date != null) {
									$("#pastsessionsbody").append("<div class=\"req lightblue\"> <div class=\"star\" id=\"" + splitEmail(email) + date + "\"> <i onclick=\"openStar()\" class=\"fas fa-star\"></i> </div> <h2>Date: " + date + "</h2> " + "<h4>Time: " + time + "</h4> </h4>" + "<h4>Subjects: " + subject + "</h4> <h4>Details: "+ details + "</h4> <h4>Tutor: " + tutor + "</h4> </div>");
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
	}

    var tutorReq = firebase.database().ref('requests');

    var allReqs = "";

    tutorReq.on("child_added", snap => {
		var date = snap.child("date").val();
		var done = snap.child("done").val();
		var email = snap.child("email").val();
		var subject = snap.child("subject").val();
		var details = snap.child("details").val();
		var time = convertMilitary(snap.child("time").val());
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
					$("#tutorsessionsbody").append("<div class=\"tutorreq\" style=\"display: " + display + "\" onclick=\"takeSession()\"> <h2>Email: " + email + "</h2> " + "<h4>Date: " + date + "</h4> " + "<h4>Time: " + time + "</h4> <h4>Subjects: " + subject + "</h4> <h4>Details: " + details + "</h4> <h4>tutor: " + tutor + "</h4> </div>");
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
    $("#sidelogin").html("LOGIN");
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
	var details = event.currentTarget.childNodes[9].innerHTML.slice(9);

	var split = splitEmail(firebase.auth().currentUser.email);

	firebase.database().ref('users/' + split).on('value', function(snapshot) {
		var sessionsCount = 0;
		var prevdates = [];
		snapshot.forEach(function(childSnapshot) {
			var date2 = new Date(childSnapshot.child("date").val());
			var now = new Date();
			if(date2 > now && date2 != null) {
				sessionsCount++;
				prevdates.push(childSnapshot.child("date").val());
			}		
		});
		console.log(prevdates.indexOf(newdate));
		if(prevdates.indexOf(newdate) != -1) {
			alert("You cannot take more than one session in the same day.");
		} else {
			var r = confirm("Confirm that you can commit to tutoring this session?");
			var yes = "yes";
			if(r == true) {
				var userName = firebase.database().ref('users/' + split).child('name');
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

				var content = "<h3 style=\"color: #30CFD0\">Tutor Contact: " + firebase.auth().currentUser.email + "</h3> <p><strong>Date:</strong> " + date + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subjects:</strong> " + subject + "</p>  <p><strong>Details</strong>" + details + "</p> <p>Your tutor will email you within 24 hours!</p>";

				Email.send("support@instatutors.org",
					email,
					"Confirmed: Tutoring Session on " + date,
					content,
					{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb", callback: function done(message) { console.log("sent") }});

				var content2 = "<h3><strong>Date:</strong> " + date + "</h3> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject(s):</strong> " + subject + "</p> <p><strong>Details</strong>" + details + "</p> <p>Make sure to email your tutee with the appropriate appear.in link, and set a reminder for yourself so you do not forget to show up for your session.  Good luck!</p>";

				Email.send("support@instatutors.org",
					firebase.auth().currentUser.email,
					"Confirmed: Tutoring Session on " + date,
					content2,
					{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb", callback: function done(message) { console.log("sent") }});
				}
			}

	});
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
		
		var ref = firebase.database().ref('users');
					//get uids of all tutors
						ref.orderByChild("stat").equalTo("tutor").on("value", snap => {
					 		var tutorids = Object.keys(snap.val());
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
											var content = "<h3 style=\"color: red\">Tutoring Session Canceled -</h3>  <p><strong>Date:</strong> " + newdate + "</p> <p><strong>Reason:</strong> " + reason + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p>"; 
											tutoremail.on("value", snap => {
												Email.send("support@instatutors.org",
													"tutors@instatutors.org",
													"New Tutoring Session Requested for " + subject + " on " + newdate,
													content,
													{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb", callback: function done(message) { console.log("sent") }});
												});
										}

								});
							}
						 });
		
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

function fadebiomask() {
	$("#biomask").fadeOut();
	$("#biopopup").fadeOut();
}

//initialize database
var database = firebase.database();

//send account data to firebase
function writeAccount(name, email, stat) {
	var split = splitEmail(email);

		firebase.database().ref('users/' + split).set({
			name: name,
		    email: email,
		    stat: stat,
		    pastSessions: 0
		 });

		firebase.database().ref('names/' + name).set({
			id: splitEmail(email)
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

function googlelogin() {
	firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result) {
	  if (result.credential) {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // ...
	  }
	  // The signed-in user info.
	  var user = result.user;
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
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
	//$("#errormessage").html("");
	//$("#errormessage2").html("");
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
	var timing;

	if($('#weekly:checked').val() == "on") {
		timing = "weekly";
	} else if ($('#bi-weekly:checked').val() == "on") {
		timing = "bi-weekly";
	} else {
		timing = "one-time";
	}
	var numberofsessions = parseInt($("#timingcount").val());
	if(timing == "one-time") {
		numberofsessions = 1;
	}

	var missing = [];

	firebase.database().ref('users/' + splitEmail(email)).on('value', function(snapshot) {
		var sessionsCount = 0;
		var prevdates = [];
		snapshot.forEach(function(childSnapshot) {
			var date2 = new Date(childSnapshot.child("date").val());
			var now = new Date();
			if(date2 > now && date2 != null) {
				sessionsCount++;
				prevdates.push(childSnapshot.child("date").val());
			}		
		});
		console.log(prevdates);
		if(numberofsessions + sessionsCount > 5) {
			$("#formerrors").css("color", "red");
			$("#formerrors").html("You can only have 5 active requests at a time.");
			event.preventDefault();
		} else {
			var selectedDate = new Date(date);
		   	var now = new Date();


			if(date == "" || selectedDate < now.setDate(now.getDate() + 3)) {
				missing.push(" valid date (date must be at least 4 days ahead of today)");
			}
			if(time == "") {
				missing.push(" time");
			}
			if(subject == "") {
				missing.push(" subject");
			}
			if(missing != "") {
				$("#formerros").css("color", "red");
				$("#formerrors").html("Please enter the following: " + missing);
				event.preventDefault();
			} else {
				var dates = [];
				if(timing == "weekly") {
						for(var i=0; i<numberofsessions; i++) {
							var newdate = new Date(new Date(date).toString());
							newdate = newdate.addDays(7*i);
							newdate = newdate.setTimezoneOffset(-1600);
							newdate = newdate.toString("MM-dd-yyyy");
							dates.push(newdate);
						} 
				} else if(timing == "bi-weekly") {
						for(var i=0; i<numberofsessions; i++) {
							var newdate = new Date(new Date(date).toString());
							newdate = newdate.addDays(14*i);
							newdate = newdate.setTimezoneOffset(-1600);
							newdate = newdate.toString("MM-dd-yyyy");
							dates.push(newdate);
						}
				}
				if(intersect(prevdates, dates).length > 0 || prevdates.indexOf(splitDate(date)) != -1) {
					if(timing == "bi-weekly" || timing == "weekly") {
						console.log(intersect(prevdates, dates).length);
						$("#formerrors").html("You already have sessions booked on the following dates: " + intersect(prevdates, dates));
					} else {
						var dateindex = prevdates.indexOf(splitDate(date));
						$("#formerrors").html("You already have a session booked on the following date: " + prevdates[dateindex]);
					}
				} else {
					var content;
					if(timing == "weekly") {
						var polishdates = "";
						for(var p=0; p<dates.length; p++) {
							console.log(dates[p]);
							writeRequest(email, splitDate(splitDate(dates[p])), time, subject, details, "no", tutor);
							if(p>0) {
								polishdates += (", " + dates[p]);
							} else {
								polishdates += dates[p];
							}
						}
						console.log(polishdates);
						content = "<h3 style=\"color: #30CFD0\">New Tutoring PLAN Requested -</h3>  <p><strong>Dates:</strong> " + polishdates + "</p> <p><strong>Time:</strong> " + time + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Details:</strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
						$("#bookedheader").html("Your tutoring requests for " + polishdates + " are logged.");
						date = polishdates;

					} else if(timing == "bi-weekly") {
						var polishdates = "";
						for(var p=0; p<dates.length; p++) {
							writeRequest(email, splitDate(splitDate(dates[p])), time, subject, details, "no", tutor);
							if(p>0) {
								polishdates += (", " + dates[p]);
							} else {
								polishdates += dates[p];
							}
						}
						content = "<h3 style=\"color: #30CFD0\">New Tutoring PLAN Requested -</h3>  <p><strong>Dates:</strong> " + polishdates + "</p> <p><strong>Time:</strong> " + convertMilitary(time) + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Details:</strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
						$("#bookedheader").html("Your tutoring requests for " + polishdates + " are logged.");
						date = polishdates;

					} else {
						writeRequest(email, date, time, subject, details, "no", tutor);
						content = "<h3 style=\"color: #30CFD0\">New Tutoring Session -</h3>  <p><strong>Date:</strong> " + splitDate(date) + "</p> <p><strong>Time:</strong> " + convertMilitary(time) + "</p> <p><strong>Subject:</strong> " + subject + "</p> <p><strong>Details:</strong>" + details + "</p> <p><strong>Tutee Contact:</strong> " + email + "</p> <p><strong>Tutor:</strong> " + tutor + "</p>";
						date = splitDate(date);
						$("#bookedheader").html("Your tutoring request for " + date + " is logged.");
					}


					var ref = firebase.database().ref('users');
					//get uids of all tutors
						ref.orderByChild("stat").equalTo("tutor").on("value", snap => {
					 		var tutorids = Object.keys(snap.val());
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
												Email.send("support@instatutors.org",
															snap.val(),
															"New Tutoring Session Requested for " + subject + " on " + date,
															content + "<p>Take this session <a href=\"https://www.instatutors.org/login\">here</a>.</p>",
															{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
											});
										}

								});
							}
						 });
						
						$("#tutor2").html("Tutor: " + tutor);
						$("#time2").html("Time: " + convertMilitary(time));
						$("#subject2").html("Subject: " + subject);
						$("#details2").html("Details: " + details);

						$("#mainbody").css("display", "none");
						$("#confirmedbody").fadeIn();
						$("#logout").css("display", "none");
						console.log(content);
						//send confirmation email to user
						Email.send("support@instatutors.org",
							email,
							"New Tutoring Session(s) Requested for " + subject + " on " + date,
							content + "<p>Check out your account <a href=\"https://www.instatutors.org/login\">here</a>.</p>",
							{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});

						return true;
				}
			}
		}
	});
}

//let tutor edit their bios
function editBio() {
	$("#tutorbio").css("border", "2px solid #30CFD0");
	$("#tutorbio").prop("readonly", false);
	$("#submitBio").fadeIn("fast");
}

function submitBio() {
	var content = $("#tutorbio").val();
	var wordcount = content.split(" ").length;
	if(wordcount < 100) {
		$("#tutorbio").css("border", "1px solid #ccc");
		$("#tutorbio").prop("readonly", true);
		alert("Thank you for submitting your bio!");
		$("#submitBio").fadeOut("fast");
		var user = firebase.auth().currentUser;
		var split = splitEmail(user.email);

		firebase.database().ref('users/' + split).child("bio").set(content);
	} else {
		$("#bioerror").html("Please keep your bio under 100 words.");
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
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor great\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add tutors to "good matches"
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('users/' + good[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"mytutor good\"> <h2>" + name + "</h2> <h4>Tutor Contact: <a>" + email + "</a></h4> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
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
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				console.log(subjects);
				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"viewtutor great\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
			});
		}

		//add tutors to "good matches"
		for(var i=0; i<good.length; i++) {
			var tutorRef = firebase.database().ref('users/' + good[i]);
			tutorRef.on("value", snap => {
				var name = snap.child("name").val();
				var email = snap.child("email").val();
				var bio = snap.child("bio").val();
				if(bio == null) {
					bio = "";
				}
				var subjects = snap.child("subjects").val().split(",");
				var intersection = intersect(subjects, tuteeSubArray);

				var subjectLabels = "";
				for(var k=0; k<intersection.length; k++) {
					subjectLabels += "<h5 class=\"label " + intersection[k] + "\">" + intersection[k] + "</h5> ";
				}

				mytutors += "<div class=\"viewtutor good\" onclick=\"selectTutor()\"> <h2>" + name + "</h2> <p>" + bio + "</p> <h4>Subjects in common:</h4> " + subjectLabels + "</div>"; 		
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

function submitApplication() {
	var name = $("#applyname").val();
	var email = $("#applyemail").val();
	var grade = $("#applygrade").val();
	var school = $("#applyschool").val();
	var subjects = $("#applysubjects").val();
	var q1 = $("#applyq1").val();
	var q2 = $("#applyq2").val();
	var q3 = $("#applyq3").val();
	var q4 = $("#applyq4").val();
	var validemail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var missing = [];
	console.log(name + email + grade + school + subjects);
	if(name == "") {
		missing.push("name");
	}
	if(email.search(validemail) == -1) {
		missing.push(" valid email");
	}
	if(grade == "") {
		missing.push(" your grade");
	}
	if(school == "") {
		missing.push(" your school");
	}
	if(subjects == "") {
		missing.push(" your subjects");
	}
	if(q1 == "" || q2 == "" || q3 == "" || q4 == "") {
		missing.push(" responses to one or more supplemental questions");
	}
	if(missing != "") {
		$("#applyerrors").css("color", "red");
		$("#applyerrors").html("You are missing : " + missing + ".");
	} else {
		$("#applyerrors").css("color", "green");
		$("#applyerrors").html("Thank you for submitting!  We will get back to you within 48 hours.");
		var content = "<h3 color=\"#30CFD0\">New Tutor Application</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>Email:</strong> " + email + "</p> <p><strong>School + Grade:</strong> " + school + ", " + grade + "</p> <p><strong>Subject(s):</strong> " + subjects + "<p><strong> 1. Why do you want to tutor for InstaTutors? </strong></p> <p>" + q1 + "</p> <p><strong>What qualifies you to tutor for InstaTutors? </strong></p> <p> " + q2 + "</p> <p><strong> Describe your most significant academic experience. </strong></p> <p>" + q3 + "</p> <p><strong>What does \"volunteering\" mean to you?</strong></p> <p> " + q4 + "</p>";
		Email.send("support@instatutors.org",
			"instatutorsteam@gmail.com",
			"New Tutor Application from " + name,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb", callback: function done(message) { console.log("sent") }});
		$("#applyname").val("");
		$("#applyemail").val("");
		$("#applygrade").val("");
		$("#applyschool").val("");
		$("#applysubjects").val("");
		$("#applyq1").val("");
		$("#applyq2").val("");
		$("#applyq3").val("");
		$("#applyq4").val("");
	}
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
		var content = "<h3 color=\"#30CFD0\">New Message</h3> <p><strong>Name:</strong> " + name + "</p> <p><strong>email:</strong> " + email + "</p> <p><strong>Message:</strong> " + message + "</p>"; 
		document.getElementById("contactForm").reset();

		Email.send("inquiries@instatutors.org",
			"support@instatutors.org",
			"New Message from " + name,
			content,
			{token: "527d49d6-dba7-4334-8775-1b8ccd9b3eeb"});
	}
}
