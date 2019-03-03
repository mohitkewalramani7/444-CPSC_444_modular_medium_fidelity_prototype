$(document).ready(function () {
    var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
    $("#menu").append(returnOpenApps(list_of_apps));
    $("#menu").append(returnAddFileOrFolderButton());
    $("#allApps").append(allApps(list_of_apps, true));
    $("#menu").menu();

    $("ul button").click(function(){
        $(".gridMain div").html($(this).text());
        switch($(this).text().trim()){
            case "mHall.cpp":
                $(".gridMain div").append(
                    "<br><br><button onClick='saveData()'>Save</button>" +
                    "<br><textarea id='codeToCommentBox' rows='60'>" +
                    localStorage.getItem('inProgressCode') +
                    "</textarea>"
                );
                break;
            case "code.js":
                $(".gridMain div").append(
                    "<br><br><button onClick='saveData()'>Save</button>" +
                    "<br><textarea id='codeJSBox' rows='60'>" +
                    localStorage.getItem('codeJSFile') +
                    "</textarea>"
                );
                break;
            case "Slack":
                $(".gridMain div").append(
                    `
                    <br><br>
                    <p>John: Hey there! Can you add the file called
                        'demo.docx' to your workspace and keep it open.
                        It'll come in handy.
                        Ensure to add it to the Submission folder </p>
                    `
                );
                break;
            case "Messenger":
                $(".gridMain div").append(
                    `
                    <br><br><br>
                    <p>Sally: Hey there! Can you add the file
                            code.js to your workspace</p>
                    `
                );
                break;
            case "Readme":
                $(".gridMain div").append(
                    `
                    <br>
                    <p>Your mission, should you choose to accept it, is to
                    configure this workspace...</p>
                    `
                );
                break;
            case "Photoshop":
                $(".gridMain div").append(
                    `
                    <br>
                    <p>All the photos you edit!</p>
                    `
                );
                break;
            case "A2.A":
                $(".gridMain div").append(
                    `
                    <br>
                    <h3>A2.A</h3>
                    `
                );
                break;
            case "A2.B":
                $(".gridMain div").append(
                    `
                    <br>
                    <h3>A2.B</h3>
                    `
                );
                break;
            case "Webstorm":
                $(".gridMain div").append(
                    `
                    <br>
                    <h3>Webstorm</h3>
                    <p>Your web development code!</p>
                    `
                );
                break;
        }
    });
});
