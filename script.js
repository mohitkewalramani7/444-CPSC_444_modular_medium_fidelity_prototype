
var apps = [
    {
        "Chats": ['Slack', 'Messenger']
    },
    "Readme",
    "Photoshop",
    {
        "Files":["A2.A", "A2.B"]
    },
    "Webstorm",
    {
        "Add App/File": ["App", "File"]
    }
]

function returnOpenApps(){
    let str = "";
    for (let i = 0; i < apps.length; i++){
        if (typeof apps[i] === 'object'){
            let folderName = Object.keys(apps[i])[0];
            str += "<li><div>" + folderName + "  --> </div><ul>"
            for (let j = 0; j < apps[i][folderName].length; j++){
                str += "<li><div>" + apps[i][folderName][j] + "</div></li>"
            }
            str += "</ul></li>"
        }
        else{
            str += "<li><div>" + apps[i] + "</div></li>"
        }
    }
    return str;
}

function loginButtonClick(){
    window.location.replace("project_list.html");
}

function logOut(){
    window.location.replace("login.html");
}

function navigateToProjectPage(){
    window.location.replace("project_main.html")
}
