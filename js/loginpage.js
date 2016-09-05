$(document).ready(function () {
    $("#credentials").submit(function(e){
        e.preventDefault();
        ITECAuthController.login($("#email").val(), $("#pass").val());
    });
});
function loginStateChange() {
    document.location = "/";
}