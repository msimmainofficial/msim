document.getElementById("loginBtn").addEventListener("click", login);

function showPage(page){

document.getElementById("profilePage").style.display="none";
document.getElementById("dutiesPage").style.display="none";
document.getElementById("announcementsPage").style.display="none";
document.getElementById("contactsPage").style.display="none";

document.getElementById(page+"Page").style.display="block";

}

async function login(){

const mobile=document.getElementById("mobile").value.trim();
const password=document.getElementById("password").value.trim();
const message=document.getElementById("message");

if(!mobile||!password){

message.innerHTML="Enter Mobile Number & Password";
return;

}

message.innerHTML="Checking...";

try{

const {data,error}=await supabaseClient

.from("members")

.select("*")

.eq("mobile",mobile)

.eq("password",password)

.maybeSingle();

if(error){

message.innerHTML=error.message;
return;

}

if(!data){

message.innerHTML="Invalid Mobile Number or Password";
return;

}

document.querySelector(".login-page").style.display="none";

document.getElementById("dashboard").style.display="block";

document.getElementById("memberPhoto").src=
data.photo_link||"https://placehold.co/200x200";

document.getElementById("memberName").innerHTML=
"Name : "+data.name;

document.getElementById("memberMobile").innerHTML=
"Mobile : "+data.mobile;

document.getElementById("memberMemberId").innerHTML=
"Member ID : "+data.member_id;

document.getElementById("memberBranch").innerHTML=
"Branch : "+data.branch;

document.getElementById("memberStatus").innerHTML=
"Status : "+data.status;

document.getElementById("memberJoiningDate").innerHTML=
"Joining Date : "+data.joining_date;

if(data.id_card_link){

document.getElementById("memberIdCard").href=data.id_card_link;

}else{

document.getElementById("memberIdCard").style.display="none";

}

message.innerHTML="";

}catch(err){

console.error(err);

message.innerHTML=err.message;

}

}

function logout(){

location.reload();

}
