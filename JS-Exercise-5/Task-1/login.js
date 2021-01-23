




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
        const asString = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');
        document.login.action+="?"+asString;
       document.login.submit();
        }
    
  }
  document.login.addEventListener('submit', handleSubmit);