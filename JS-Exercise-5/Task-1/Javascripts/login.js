




function handleSubmit(event) {
    
    let username=document.login.username;
    let password=document.login.password;
console.log("hello");
        if (localStorage.getItem(username.value)===null){
            alert("Please enter valid username and password");
            return false
        }
        else if (JSON.parse(localStorage.getItem(username.value)).password!==password.value)
        {
            alert("Please enter valid username and password");
            return false
        }
        else{
            if (JSON.parse(localStorage.getItem(username.value)).userType=="student"){
                document.login.action="./student.html";
            }
            else{
                document.login.action="./admin.html";
                

            }
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()];
        data[0]=`${encodeURIComponent(data[0][0])}=${encodeURIComponent(data[0][1])}`
        const asString = data[0];
       
        document.login.action+="?"+asString;
       document.login.submit();
        }
    
  }
  document.login.addEventListener('submit', handleSubmit);
