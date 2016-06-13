$(document).ready(function() {
    $("#authorized").hide();
    $("#error").hide();
});

function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                googleAccountToken = result.credential.accessToken;
                user = result.user;
        
                $("#photo").attr("src", user.photoURL);
                $("#displayName").html(user.displayName);
                $("#email").html(user.email);
                $("#refreshToken").html(user.refreshToken);
                $("#uid").html(user.uid);
        
                $("#authorized").show();
                $("#signIn").hide();
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;

                var errmsg = errorCode + " " + errorMessage;
        
                if(typeof(email) != 'undefined') {
                    errmsg += "<br />";
                    errmsg += "Cannot sign in with your google account: " + email;
                }
        
                if(typeof(credential) != 'undefined') {
                    errmsg += "<br />";
                    errmsg += credential;
                }
        
                lastWork = "signIn";
                $("#error #errmsg").html(errmsg);
                $("#error").show();
                $("#signIn").hide();
                return;
            });
}

function signOut() {
    if(!confirm("Do you really want to log out?")) {
        return;
    }
    
    firebase.auth().signOut().then(function() {
        location.reload();
    }, function(e) {
        lastWork = "authorized";
        $("#error #errmsg").html(e.message)
        $("#error").show();
        $("#authorized").hide();
    });
}

function back() {
    $("#" + lastWork).show();
    $("#error").hide();
}