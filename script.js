// ========================================
// MSIM WEBSITE
// SCRIPT.JS
// PART 1 OF 2
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    closeMenu();

});

// =========================
// PAGE NAVIGATION
// =========================

function showPage(page){

    const pages = [
        "profile",
        "duties",
        "announcements",
        "contacts",
        "settings"
    ];

    pages.forEach(p=>{

        const element=document.getElementById(p+"Page");

        if(element){
            element.style.display="none";
        }

    });

    const current=document.getElementById(page+"Page");

    if(current){
        current.style.display="block";
    }

    closeMenu();

}

// =========================
// DRAWER
// =========================

function openMenu(){

    const drawer=document.getElementById("drawer");
    const overlay=document.getElementById("drawerOverlay");

    if(drawer){
        drawer.classList.add("active");
    }

    if(overlay){
        overlay.classList.add("active");
    }

}

function closeMenu(){

    const drawer=document.getElementById("drawer");
    const overlay=document.getElementById("drawerOverlay");

    if(drawer){
        drawer.classList.remove("active");
    }

    if(overlay){
        overlay.classList.remove("active");
    }

}

function toggleMenu(){

    const drawer=document.getElementById("drawer");

    if(!drawer) return;

    if(drawer.classList.contains("active")){
        closeMenu();
    }else{
        openMenu();
    }

}

// =========================
// LOGIN
// =========================

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

        document.querySelector(".login-page").style.display="none";

        document.getElementById("dashboard").style.display="block";

        document.getElementById("memberPhoto").src =
        data.photo_link || "https://placehold.co/200x200";

        document.getElementById("memberName").innerHTML =
        "Name : " + data.name;

        document.getElementById("memberMobile").innerHTML =
        "Mobile : " + data.mobile;

        document.getElementById("memberMemberId").innerHTML =
        "Member ID : " + data.member_id;

        document.getElementById("memberBranch").innerHTML =
        "Branch : " + data.branch;

        document.getElementById("memberStatus").innerHTML =
        "Status : " + data.status;

        document.getElementById("memberJoiningDate").innerHTML =
        "Joining Date : " + data.joining_date;

        if(data.id_card_link){

            document.getElementById("memberIdCard").href=data.id_card_link;

            document.getElementById("memberIdCard").style.display="inline-block";

        }else{

            document.getElementById("memberIdCard").style.display="none";

        }

        message.innerHTML="";

        showPage("profile");

    }catch(err){

        console.error(err);

        message.innerHTML=err.message;
      // ========================================
// MSIM WEBSITE
// SCRIPT.JS
// PART 2 OF 2
// ========================================

// =========================
// LOGOUT
// =========================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        closeMenu();

        location.reload();

    }

}

// =========================
// ACTIVE MENU
// =========================

function setActiveMenu(element){

    const items=document.querySelectorAll(".drawer-menu a");

    items.forEach(item=>{

        item.classList.remove("active");

    });

    if(element){

        element.classList.add("active");

    }

}

// =========================
// MENU CLICK EVENTS
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const menuItems=document.querySelectorAll(".drawer-menu a");

    menuItems.forEach(item=>{

        item.addEventListener("click",function(){

            setActiveMenu(this);

        });

    });

});

// =========================
// CLOSE DRAWER WHEN
// OVERLAY CLICKED
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const overlay=document.getElementById("drawerOverlay");

    if(overlay){

        overlay.addEventListener("click",closeMenu);

    }

});

// =========================
// ESC KEY SUPPORT
// =========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMenu();

    }

});

// =========================
// RIPPLE BUTTON EFFECT
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const buttons=document.querySelectorAll("button,.gold-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            button.style.transform="scale(.96)";

            setTimeout(()=>{

                button.style.transform="";

            },150);

        });

    });

});

// =========================
// IMAGE FALLBACK
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const photo=document.getElementById("memberPhoto");

    if(photo){

        photo.onerror=function(){

            this.src="https://placehold.co/200x200?text=Member";

        };

    }

});

// =========================
// PREVENT DOUBLE LOGIN CLICK
// =========================

let loginProcessing=false;

const originalLogin=login;

login=async function(){

    if(loginProcessing) return;

    loginProcessing=true;

    try{

        await originalLogin();

    }finally{

        loginProcessing=false;

    }

};

// =========================
// END
// =========================

    }

}
