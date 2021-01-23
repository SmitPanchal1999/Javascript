//signup




function handleSubmit(event) {
    
    let username=document.signUpForm.username;
    let password=document.signUpForm.password;

    let confirm=document.signUpForm.confirmPassword;
    console.log("hello");
    if (password.value!==confirm.value){
        alert("Password and Confirm password field didn't Match.");
        return false
    }
    else if (String(password.value).length<8){
        alert("Password length must be greater than 8.");
        return false;
    }
    else if(username.value=="" || username.value==undefined){
        alert("Username can't be null");
        return false;
    }
    else{
        if (localStorage.getItem(username.value)!==null){
            alert("Username already exists")
            return false;
        };
        let studentOrAdmin=document.signUpForm.userType;
        console.log(studentOrAdmin[0].checked);
        console.log(studentOrAdmin[1].checked);
        if (studentOrAdmin[0].checked){
            
            let obj={password:password.value,userType:"student"};
            localStorage.setItem(username.value,JSON.stringify(obj));
            
            document.signUpForm.action="./student.html";
        }
        else{
            let obj={password:password.value,userType:"admin"};
            localStorage.setItem(username.value,JSON.stringify(obj));
            
            document.signUpForm.action="./admin.html";
        }
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()];
        const asString = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');
        document.signUpForm.action+="?"+asString;
       document.signUpForm.submit();
    }
    
  }
  document.signUpForm.addEventListener('submit', handleSubmit);