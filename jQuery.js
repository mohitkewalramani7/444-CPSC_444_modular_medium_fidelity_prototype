$(document).ready(function () {
    $("#menu").append(returnOpenApps());
    $("#menu").menu();
});

$(document).ready(function () {
    $("#allApps").append(allApps());
});
