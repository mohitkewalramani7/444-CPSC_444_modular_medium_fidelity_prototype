$(document).ready(function () {
    $("#menu").append(returnOpenApps(apps));
    $("#menu").append(returnAddFileOrFolderButton());
    $("#allApps").append(allApps(apps));
    $("#menu").menu();

    $("ul button").click(function(){
        $(".gridMain div").html($(this).text());
        switch($(this).text().trim()){
            case "Slack":
                $(".gridMain div").append(
                    `
                    <br><br><br>
                    <p>Jack: Hey there! Can you add the app 
                            Webstorm to our workspace</p>
                    `
                );
                break;
            case "Messenger":
                $(".gridMain div").append(
                    `
                    <br><br><br>
                    <p>Sally: Hey there! Can you add the file 
                            a2.txt to our workspace</p>
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
