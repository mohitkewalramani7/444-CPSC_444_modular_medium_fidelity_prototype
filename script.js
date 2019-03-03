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
            str += "<div class='folder'"
            if(!main_level){
              str+="style='width:80%'"
            }
            str += ">"+key + "<button type='button' style='float:right' onClick='move(\""+key+"\")'>move</button>" +
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

function move(item){
  str = `<h2>Move${item}</h2>Parent Directory: <select id="move_dir"><option value="">No folder</option>`
  let folderNames = getAllFolderNames([], apps);
  for (var i = 0; i < folderNames.length; i++) {
    str += `<option value="${folderNames[i]}">${folderNames[i]}</option>`
  }
  str +=`</select><br><br><br>
          <button type="button" onclick="closePopup('move')">Cancel</button>
          <button type="button" onclick="saveMove('${item}')" style="float:right">Add</button>`
  document.getElementById("move_content").innerHTML = str;
  openPopup("move");
}

function saveMove() {
  
}

function getAllFolderNames(folderNames, parent){
  for(let k in parent){
    if(parent[k].type == "folder"){
      folderNames.push(k);
      if(parent[k].children){
        folderNames = getAllFolderNames(folderNames, parent[k].children);
      }
    }
  }
  return folderNames;
}

function openPopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "block";
  if(id=="addFolder"){
    str = ` Name: <input type="text" id="addFolder_name" value="">
            Parent Directory: <select id="addFolder_dir"><option value="">No folder</option>`
    let folderNames = getAllFolderNames([], apps);
    for (var i = 0; i < folderNames.length; i++) {
      str += `<option value="${folderNames[i]}">${folderNames[i]}</option>`
    }
    str +=`</select><br><br><br>
            <button type="button" onclick="closePopup('addFolder')">Cancel</button>
            <button type="button" onclick="save('addFolder')" style="float:right">Add</button>`
    document.getElementById("addFolder_content").innerHTML = str;
  }
}

function closePopup(id){
  var popup = document.getElementById(id);
  popup.style.display = "none";
}

function save(id){
  var popup = document.getElementById(id);
  switch (id) {
    case "addFolder":
      let name = document.getElementById("addFolder_name").value
      let dir = document.getElementById("addFolder_dir").value
      if(name){
        if(dir){
          apps[dir].children[name] = {"type":"folder", children:{}}
        } else {
          apps[name] = {"type":"folder", children:{}}
        }
      }
      document.getElementById("addFolder_name").value = ""
      document.getElementById("addFolder_dir").value = ""
      break;
    case "addFile":
      let filelink = document.getElementById("addFile_link").value
      let filename = document.getElementById("addFile_name").value.split("C:\\fakepath\\")[1]
      if(filelink) apps[filelink] = {"type":"app"}
      if(filename) apps[filename] = {"type":"app"}
      document.getElementById("addFile_link").value = ""
      document.getElementById("addFile_name").value = ""
      break;
    case "addApp":
      let appname = document.getElementById("addApp_name").value.split("C:\\fakepath\\")[1]
      if(appname) apps[appname] = {"type":"app"}
      document.getElementById("addApp_name").value = ""
      break;
  }
  closePopup(id);
  document.getElementById("allApps").innerHTML = allApps(apps, true);
}
