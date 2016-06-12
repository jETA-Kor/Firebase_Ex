$(document).ready(function() {
    $("#signIn").hide();
    $("#authorized").hide();
    $("#error").hide();
});

function signUp() {
    var id = $("#su_id").val();
    var pw = $("#su_pw").val();
    var cf = $("#su_cf").val();

    if(pw != cf) {
        alert("Password does not match the confirm password.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(id, pw)
            .then(function() {
                $("#signUp").hide();
                $("#signIn").show();
            })
            .catch(function(e) {
                lastWork = "signUp";
                $("#error #errmsg").html(e.message);
                $("#error").show();
                $("#signUp").hide();
                return;
            });
}

function signIn() {
    var id = $("#si_id").val();
    var pw = $("#si_pw").val();
    firebase.auth().signInWithEmailAndPassword(id, pw)
            .then(function() {
                $("#signIn").hide();
                $("#authorized").show();
            })
            .catch(function(e) {
                lastWork = "signIn";
                $("#error #errmsg").html(e.message);
                $("#error").show();
                $("#signIn").hide();
                return;
            });
}

function back() {
    $("#" + lastWork).show();
    $("#error").hide();
}