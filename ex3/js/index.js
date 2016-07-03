$(document).ready(function() {
    $("#authorized").hide();
    $("#error").hide();
    
    firebase.auth().getRedirectResult()
        .then(signInSucceed)
        .catch(signInError);
});

function signIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
            .then(signInSucceed)
            .catch(signInError);
}

function signInSucceed(result) {
    if (result.credential) {
        facebookAccountToken = result.credential.accessToken;
        user = result.user;

        $("#photo").attr("src", user.photoURL);
        $("#displayName").html(user.displayName);
        $("#email").html(user.email);
        $("#refreshToken").html(user.refreshToken);
        $("#uid").html(user.uid);

        $("#authorized").show();
        $("#signIn").hide();
    }
}

function signInError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

    var errmsg = errorCode + " " + errorMessage;

    if(typeof(email) != 'undefined') {
        errmsg += "<br />";
        errmsg += "Cannot sign in with your facebook account: " + email;
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
}

function signInWithRedirect() {
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithRedirect(provider);
}

function back() {
    $("#" + lastWork).show();
    $("#error").hide();
}