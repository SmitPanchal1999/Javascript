const names=["Ashish Shah",
    "Rashmin Chhatrala",
    "Yash Dubey",
    "Prakash Jain",
    "Yashraj Singh",
    "Viraj Sinha",
    "Rajesh Kumar",
    "Mahesh Marwadi",
    "Suresh Sahni",
    "Amar Vilas",
    "Virdas Singhania",
    "Rajeshwari Bindra",
    "Birendra Bhalerao",
    "Virendra Bhupati",
    "Bhupendra Singh",
    "Bhuvam Bam",
    "Shri Raj",
    "Prashant Kamle",
    "Kamlesh Tomar",
    "Risabh Khare",
    "Rishi Kohli",
    "Kunwar Kharwanda",
    "Kartik Koli",
    "Komal Jain",
    "Kartikey Pandey"]


function searchNamesWith(){
  
    let search=document.getElementById("search");
    let result=document.getElementById("showSearchResult");
    console.log(search.value.length,search.value);
    
    let searchWords=search.value.replace(/\s+/g, ' ').trim();
    console.log(searchWords);
    if (searchWords.length>=2){
        
        let msg=document.getElementById("showMsg");
        msg.innerHTML="";
        
    result.innerHTML="";
    names.forEach((name)=>{
        let index=Number(String(name.toLowerCase()).indexOf(searchWords.toLowerCase()));
        console.log(index,name);
        console.log(name.slice(0,index),name.slice(index,searchWords.length),name.slice(index+searchWords.length))
        if (index!=-1){
            result.innerHTML+= `<p><span>${name.slice(0,index)}</span><span style="color: black;font-weight: 500;background-color: yellow;">${name.slice(index,index+searchWords.length)}</span><span>${name.slice(index+searchWords.length)}</span></p>`
        }
    })
}
else{
        let msg=document.getElementById("showMsg");
        msg.innerHTML="Write atleast two characters";
        printAllNames();
}

}

function printAllNames(){
    let result=document.getElementById("showSearchResult");
    let msg=document.getElementById("showMsg");
    msg.innerHTML="Write atleast two characters";
    result.innerHTML="";
    names.forEach((name)=>{
        result.innerHTML+=`<p>${name}</p>`;
    })
}
