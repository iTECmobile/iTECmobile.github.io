var ITECAuthController = {
    login: function(email, pwd) {
            firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                   ITECAuthController.showError("Incorrect password.");
                } else {
                    ITECAuthController.showError(errorMessage);
                }
            });
    },
    logout: function() {
        firebase.auth().signOut().then(function() {
            document.location = "/";
        }, function(error) {
            ITECAuthController.showError(error);
        });
    },
    showError: function(text) {
        $(".badness").text(text);
        $(".badness").show();
    },
    isLoggedIn: false
};
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#logins").text("LOGOUT");
    $("#logins").attr("data-go", "/logout");
    $("#logins-mobile").text("LOGOUT");
    $("#logins-mobile").attr("data-go", "/logout");
    ITECAuthController.isLoggedIn = true;
    loginStateChange();
  } else {
      console.log("User not logged in.");
  }
});