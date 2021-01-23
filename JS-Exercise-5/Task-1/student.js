function showCourses(){
    
    const urlParams = new URLSearchParams(location.search);
    const username=urlParams.get("username");
    const content=document.getElementById("content");
    let userObj=JSON.parse(localStorage.getItem(username));

    if (userObj.courses==undefined || userObj.courses==[]){
        console.log(document.getElementById("content"));
      
       document.getElementById("content").innerHTML=`You have no courses assigned, Please ask your instructor to assign a course`;
      
    }
    else{
      
        for (let key of Object.keys(userObj.courses)){
            content.innerHTML+=key+" "
        }
    }
    document.getElementById("showButton").style.display="none"  ;

}