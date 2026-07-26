function showPage(page){

document.getElementById("profilePage").style.display="none";
document.getElementById("dutiesPage").style.display="none";
document.getElementById("announcementsPage").style.display="none";
document.getElementById("contactsPage").style.display="none";

if(page==="profile"){
document.getElementById("profilePage").style.display="block";
}

if(page==="duties"){
document.getElementById("dutiesPage").style.display="block";
}

if(page==="announcements"){
document.getElementById("announcementsPage").style.display="block";
}

if(page==="contacts"){
document.getElementById("contactsPage").style.display="block";
}

}

async function login(){

const mobile=document.getElementById("mobile").value.trim();
const password=document.getElementById("password").value.trim();

if(!mobile||!password){

document.getElementById("loginStatus").innerHTML="Enter Mobile & Password";

return;

}

document.getElementById("loginStatus").innerHTML="Checking...";

/* Database Login next step */

}

function logout(){

location.reload();

}
