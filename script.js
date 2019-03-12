function returnOpenApps(apps_object){
    let str = "";
    for (let key in apps_object){
        if (apps_object[key]["type"] === "folder"){
            str += "<li><div><img class='icon' src='app_images\\folder_icon.svg'>" + key + "</div><ul>" +
                returnOpenApps(apps_object[key]["children"]) + "</ul></li>"
        }
        else{
            str += "<li><div><button class='menu_button'>"
            if(apps_object[key].icon){
              str += `<img class='icon' src='${apps_object[key].icon}'>`
            } else {
              str += "<img class='icon' src='app_images\\doc_icon.svg'>"
            }
            str += key + "</button></div></li>";
        }
    }
    return str;
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
            str += "><img class='icon' src='app_images\\folder_icon.svg'>"+key + "<button type='button' style='float:right' onClick='move(\""+key+"\")'>move</button>" +
                "<hr><div>" + allApps(apps_object[key]["children"], false) +
                "</div></div>"
        }
        else{
            let c = "app";
            if(main_level) c = "folder";
            str += "<div class='"+c+"'>"
            if(apps_object[key].icon){
              str += `<img class='icon' src='${apps_object[key].icon}'>`
            } else {
              str += "<img class='icon' src='app_images\\doc_icon.svg'>"
            }
            str += key +"<button type='button' style='float:right' onClick='move(\""+key+"\")'>move</button></div>"
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
    localStorage.setItem('list_of_apps', JSON.stringify(apps));
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
  str = `<h2>Move ${item} to</h2><select id="move_dir"><option value="">No folder</option>`
  var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
  let folderNames = getAllFolderNames([], list_of_apps);
  for (var i = 0; i < folderNames.length; i++) {
    str += `<option value="${folderNames[i]}">${folderNames[i]}</option>`
  }
  str +=`</select><br><br><br>
          <button type="button" onclick="closePopup('move')">Cancel</button>
          <button type="button" onclick="saveMove('${item}')" style="float:right">Add</button>`
  document.getElementById("move_content").innerHTML = str;
  openPopup("move");
}

function saveMove(item) {
  var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
  let dir = document.getElementById("move_dir").value
  itemObj = getAndDeleteItem(item,list_of_apps)
  if(dir){
    list_of_apps[dir].children[item] = itemObj
  } else {
    list_of_apps[item] = itemObj
  }
  document.getElementById("move_dir").value = ""
  document.getElementById("allApps").innerHTML = allApps(list_of_apps, true);
  localStorage.setItem('list_of_apps', JSON.stringify(list_of_apps));
  closePopup("move");
}

function getAndDeleteItem(item, parent){
  var itemObj;
  if(parent[item]){
    itemObj = parent[item]
    delete parent[item]
    console.log(apps)
  } else {
    for(let k in parent){
       if(parent[k].type == "folder"){
        if(parent[k].children){
          temp = getAndDeleteItem(item, parent[k].children);
          if(temp) itemObj = temp
        }
      }
    }
  }
  return itemObj;
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
  var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
  var popup = document.getElementById(id);
  popup.style.display = "block";
  if(id=="addFolder"){
    str = ` <h2>Add Folder</h2> Name: <input type="text" id="addFolder_name" value="">
            Parent Directory: <select id="addFolder_dir"><option value="">No folder</option>`
    let folderNames = getAllFolderNames([], list_of_apps);
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
  var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
  var popup = document.getElementById(id);
  switch (id) {
    case "addFolder":
      let name = document.getElementById("addFolder_name").value
      let dir = document.getElementById("addFolder_dir").value
      if(name){
        if(dir){
          list_of_apps[dir].children[name] = {"type":"folder", children:{}}
        } else {
          list_of_apps[name] = {"type":"folder", children:{}}
        }
      }
      document.getElementById("addFolder_name").value = ""
      document.getElementById("addFolder_dir").value = ""
      break;
    case "addFile":
      let filelink = document.getElementById("addFile_link").value
      let filename = document.getElementById("addFile_name").value.split("C:\\fakepath\\")[1]
      if(filelink) list_of_apps[filelink] = {"type":"app"}
      if(filename) list_of_apps[filename] = {"type":"app"}
      document.getElementById("addFile_link").value = ""
      document.getElementById("addFile_name").value = ""
      break;
    case "addApp":
      let appname = document.getElementById("addApp_name").value.split("C:\\fakepath\\")[1]
      if(appname) list_of_apps[appname] = {"type":"app"}
      document.getElementById("addApp_name").value = ""
      break;
  }
  closePopup(id);
  document.getElementById("allApps").innerHTML = allApps(list_of_apps, true);
  localStorage.setItem('list_of_apps', JSON.stringify(list_of_apps));
}
