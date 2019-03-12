function onLoad() {
    var list_of_apps = JSON.parse(localStorage.getItem('list_of_apps'));
    console.log(list_of_apps);
    $("#menu").append(returnOpenApps(list_of_apps));
    $("#allApps").append(allApps(list_of_apps, true));
    $("#menu").menu();

    $("ul button").click(function(){
        $(".viewing_container div").html("");
        let name = $(this).text().trim();
        switch(name){
            case "mHall.cpp":
                $(".viewing_container div").append(
                    `
                    <h3 style='margin:0'>${name}
                    <button class='saveDataBtn' onClick='saveData()'>Save</button> </h3>
                    <img id="app_img" src="${app_imgs[name].img}">
                    <textarea class='textbox' id='codeToCommentBox' rows='30'>
                    ${localStorage.getItem('inProgressCode')}
                    </textarea>
                    `
                );
                break;
            case "code.js":
                $(".viewing_container div").append(
                    `
                    <h3 style='margin:0'>${name}
                    <button class='saveDataBtn' onClick='saveData()'>Save</button> </h3>
                    <img id="app_img" src="${app_imgs[name].img}">
                    <textarea class='textbox' id='codeToCommentBox' rows='30'>
                    ${localStorage.getItem('codeJSFile')}
                    </textarea>
                    `
                );
                break;
            default:
                $(".viewing_container div").append(
                    `
                    <h3 style='margin:0'>${name}</h3>
                    <img id="app_img" src="${app_imgs[name].img}">
                    `
                );
                if(app_imgs[name].content){
                  $(".viewing_container div").append(
                      "<br><textarea class='textbox' rows='30'>" +
                      app_imgs[name].content +
                      "</textarea>"
                  );
                }
        }
    });
};
