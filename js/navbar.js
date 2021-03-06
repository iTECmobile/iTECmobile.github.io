function orientationDynamic() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        $(".box").hide();
        $(".avatar").hide();
        $("#nav-mobile").show();
    } else {
        $(".box").show();
        $(".avatar").show();
        $("#nav-mobile").hide();
    }
}
$(document).ready(function () {
    orientationDynamic();
    window.addEventListener("resize", orientationDynamic, false);
    $("#brand").click(function () {
        document.location = "/";
    });
    $(".link").click(function() {
        document.location = $(this).data("go");
    });
});