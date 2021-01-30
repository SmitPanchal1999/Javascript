let urlParams;
let username;
function showCourses(){
    
    
    const content=document.getElementById("content");
    let userObj=JSON.parse(localStorage.getItem(username));
    document.getElementById("content").innerHTML="";
    if (userObj.courses==undefined || userObj.courses==[]){
        console.log(document.getElementById("content"));
      
       document.getElementById("content").innerHTML=`You have no courses assigned, Please ask your instructor to assign a course`;
      
    }
    else{
      
        for (let key of Object.keys(userObj.courses)){
            content.innerHTML+=key+" "
        }
    }
      

}

function showUserDetails(){
     urlParams = new URLSearchParams(location.search);
     username=urlParams.get("username");
     let userObj=JSON.parse(localStorage.getItem(username));
     let userDetails=document.getElementById("userDetails");
     userDetails.innerHTML=`<p><span style="color:green;font-size:20px;font-weight:400">Username :</span><span style="color:orange;font-size:20px;font-weight:400">${username}</span></p>`
     for (let key of Object.keys(userObj)){
         if (key!="courses"){
        userDetails.innerHTML+=`<p><span style="color:green;font-size:20px;font-weight:400">${key} :</span><span style="color:orange;font-size:20px;font-weight:400">${userObj[key]}</span></p>`
         } 
    }
}