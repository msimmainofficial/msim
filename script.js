// ==========================================
// MSIM WEBSITE
// SCRIPT.JS
// PART 1 OF 2
// ==========================================

// ===========================
// LOGIN BUTTON
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

});

// ===========================
// MENU
// ===========================

function toggleMenu() {

    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");

    menu.classList.toggle("active");
    overlay.classList.toggle("active");

}

function closeMenu() {

    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("menuOverlay").classList.remove("active");

}

// ===========================
// PAGE NAVIGATION
// ===========================

function showPage(page){

const pages=[
"profile",
"duties",
"announcements",
"contacts",
"settings"
];

pages.forEach(function(item){

const section=document.getElementById(item+"Page");

if(section){

section.style.display="none";

}

});

document.getElementById(page+"Page").style.display="block";

closeMenu();

}

// ===========================
// LOGIN
// ===========================

async function login(){

const mobile=document.getElementById("mobile").value.trim();

const password=document.getElementById("password").value.trim();

const message=document.getElementById("message");

if(!mobile || !password){

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

document.getElementById("loginPage").style.display="none";

document.getElementById("dashboard").style.display="block";

document.getElementById("memberPhoto").src=
data.photo_link || "https://placehold.co/200x200";

document.getElementById("memberName").innerHTML=
data.name;

document.getElementById("memberMobile").innerHTML=
data.mobile;

document.getElementById("memberMemberId").innerHTML=
data.member_id;

document.getElementById("memberBranch").innerHTML=
data.branch;

document.getElementById("memberStatus").innerHTML=
data.status;

document.getElementById("memberJoiningDate").innerHTML=
data.joining_date;

if(data.id_card_link){

document.getElementById("memberIdCard").href=data.id_card_link;

}else{

document.getElementById("memberIdCard").style.display="none";

}
    
localStorage.setItem(
"memberMobile",
data.mobile
);

// loadDuties(data.mobile);
message.innerHTML="";

showPage("profile");

}catch(err){

console.error(err);

message.innerHTML=err.message
}

}
// ===========================
// LOAD LIVE DUTIES
// ===========================

async function loadDuties(memberMobile){

const container=document.getElementById("dutiesContainer");

container.innerHTML="<div class='card'><p>Loading duties...</p></div>";

const {data,error}=await supabaseClient

.from("duties")

.select("*")

.eq("member_mobile",memberMobile)

.order("created_at",{ascending:false});

if(error){

container.innerHTML=

"<div class='card'><p>"+error.message+"</p></div>";

return;

}

if(!data || data.length===0){

container.innerHTML=

`<div class="card">

<h3>No Duties Available</h3>

<p>No duty has been assigned yet.</p>

</div>`;

return;

}

let html="";

data.forEach(duty=>{

html+=`

<div class="card">

<h3>📋 ${duty.duty_title}</h3>

<p><strong>Description:</strong><br>${duty.duty_description}</p>

<br>

<p><strong>Assigned By:</strong> ${duty.assigned_by}</p>

<p><strong>Assigned Date:</strong> ${duty.assigned_date}</p>

<p><strong>Status:</strong> ${duty.status}</p>

<p><strong>Completed Date:</strong> ${duty.completed_date || "-"}</p>

</div>

`;

});

container.innerHTML=html;

}
// ==========================================
// MSIM WEBSITE
// SCRIPT.JS
// PART 2 OF 2
// ==========================================

// ===========================
// LOGOUT
// ===========================

function logout(){

if(confirm("Are you sure you want to logout?")){

closeMenu();

document.getElementById("dashboard").style.display="none";

document.getElementById("loginPage").style.display="flex";

document.getElementById("mobile").value="";

document.getElementById("password").value="";

document.getElementById("message").innerHTML="";

showPage("profile");

}

}

// ===========================
// IMAGE FALLBACK
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

const photo=document.getElementById("memberPhoto");

if(photo){

photo.onerror=function(){

this.src="https://placehold.co/200x200?text=Member";

};

}

});

// ===========================
// OVERLAY CLICK
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

const overlay=document.getElementById("menuOverlay");

if(overlay){

overlay.addEventListener("click",closeMenu);

}

});

// ===========================
// ESC KEY CLOSE
// ===========================

document.addEventListener("keydown",(event)=>{

if(event.key==="Escape"){

closeMenu();

}

});

// ===========================
// PREVENT DOUBLE LOGIN
// ===========================

let loginLoading=false;

const originalLogin=login;

login=async function(){

if(loginLoading){

return;

}

loginLoading=true;

const btn=document.getElementById("loginBtn");

if(btn){

btn.disabled=true;

btn.innerHTML="Please Wait...";

}

try{

await originalLogin();

}finally{

loginLoading=false;

if(btn){

btn.disabled=false;

btn.innerHTML="Login";

}

}

};

// ===========================
// BUTTON EFFECT
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

const buttons=document.querySelectorAll("button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

button.style.transform="scale(.97)";

setTimeout(()=>{

button.style.transform="";

},120);

});

});

});

// ===========================
// INITIAL PAGE
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

showPage("profile");

});

// ==========================================
// END OF SCRIPT.JS
// ==========================================

}

}
