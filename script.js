
var apps = {
  "Chats": {
    "type": "folder",
    "children": {
      "Slack": {
        "type": "app"
      },
      "Messenger": {
        "type": "app"
      }
    }
  },
  "Readme": {
    "type": "app"
  },
  "Photoshop":{
      "type": "app"
  },
  "Files":{
      "type": "folder",
      "children":{
        "A2.A":{
            "type": "app"
        },
        "A2.B":{
            "type": "app"
        }   
      }
  },
  "Webstorm":{
      "type": "app"
  }
}

function returnOpenApps(apps_object){
    let str = "";
    for (let key in apps_object){
        if (apps_object[key]["type"] === "folder"){
            str += "<li><div>" + key + "</div><ul>" + returnOpenApps(apps_object[key]["children"]) + "</ul></li>"
        }
        else{
            str += "<li><div><button>" + key + "</button></div></li>";
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

function allApps(apps_object){
    let str = "";
    let counter = 0;
    for (let key in apps_object){
        if (apps_object[key]["type"] === "folder"){
            str += "<div class='folder'>" + key + "<ul>" + 
                "<li><div>" + allApps(apps_object[key]["children"]) +
                "</div></li>" +
                "</ul></div>"
        }
        else{
            str += "<div class='folder'>" + key + "</div>"
        }

        if(counter % 3 == 2) str +="<div style='height:1px;clear:both'></div>"
        counter ++;
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

function openPopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "block";
}

function closePopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "none";
}
