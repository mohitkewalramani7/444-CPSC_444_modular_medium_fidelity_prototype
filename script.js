
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
]

function returnOpenApps(){
    let str = "";
    for (let i = 0; i < apps.length; i++){
        if (typeof apps[i] === 'object'){
            let folderName = Object.keys(apps[i])[0];
            str += "<li><div>" + folderName + "  --> </div><ul>"
            for (let j = 0; j < apps[i][folderName].length; j++){
                str += "<li><div><button>" + apps[i][folderName][j] + "</button></div></li>"
            }
            str += "</ul></li>"
        }
        else{
            str += "<li><div><button>" + apps[i] + "</button></div></li>"
        }
    }
    return str;
}

function returnAddFileOrFolderButton(){
    return `
    <li>
        <div>Add App/File --></div>
        <ul>
            <li>
                <div>App</div>
            </li>
            <li>
                <div>File</div>
            </li>
        </ul>
    </li>
        `
}

function allApps(){
    let str = "";
    for (let i = 0; i < apps.length; i++){
        if (typeof apps[i] === 'object'){
            let folderName = Object.keys(apps[i])[0];
            str += "<div class='folder'>" + folderName + "<ul>"
            for (let j = 0; j < apps[i][folderName].length; j++){
                str += "<li><div>" + apps[i][folderName][j] + "</div></li>"
            }
            str += "</ul></div>"
        }
        else{
            str += "<div class='folder'>" + apps[i] + "</div>"
        }
        if(i % 3 == 2) str +="<div style='height:1px;clear:both'></div>"
    }
    return str;
}

function loginButtonClick(){
    window.location.replace("project_list.html");
}

function navigateToAllApps(){
    window.location.replace("all_applications.html");
}

function logOut(){
    window.location.replace("login.html");
}

function navigateToProjectPage(){
    window.location.replace("project_main.html")
}
