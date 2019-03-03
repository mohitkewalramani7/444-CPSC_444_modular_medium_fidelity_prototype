function returnOpenApps(apps_object){
    let str = "";
    for (let key in apps_object){
        if (apps_object[key]["type"] === "folder"){
            str += "<li><div>" + key + "</div><ul>" + 
                returnOpenApps(apps_object[key]["children"]) + "</ul></li>"
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

function allApps(apps_object, main_level){
    let str = "";
    let counter = 0;
    for (let key in apps_object){
        if (apps_object[key]["type"] === "folder"){
            str += "<div class='folder'>" + key + "<button type='button' style='float:right' onClick='move(\""+key+"\")'>move</button>" +
                "<hr><div>" + allApps(apps_object[key]["children"], false) +
                "</div></div>"
        }
        else{
            let c = "app";
            if(main_level) c = "folder";
            str += "<div class='"+c+"'>" + key
            str += "<button type='button' style='float:right' onClick='move(\""+key+"\")'>move</button></div>"
        }
        if(counter % 3 == 2) str +="<div style='height:1px;clear:both'></div>"
        counter ++;
    }
    return str;
}

function move(item){
  console.log(item)
}

function loginButtonClick(){
    window.location.replace("project_list.html");
    localStorage.setItem('inProgressCode', codeToComment);
    localStorage.setItem('codeJSFile', selectionSortAlgorithm);
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

function saveData(){
    let codeInBox = document.getElementById('codeToCommentBox').value;
    localStorage.setItem('inProgressCode', codeInBox);
    alert("File Saved");
}

function openPopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "block";
}

function closePopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "none";
}
