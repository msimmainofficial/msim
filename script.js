document.getElementById("loginBtn").addEventListener("click", login);

function showPage(page) {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("dutiesPage").style.display = "none";
  document.getElementById("announcementsPage").style.display = "none";
  document.getElementById("contactsPage").style.display = "none";

  document.getElementById(page + "Page").style.display = "block";
}

async function login() {

  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!mobile || !password) {
    message.innerHTML = "Enter Mobile Number & Password";
    return;
  }

  message.innerHTML = "Checking...";

  try {

    const { data, error } = await supabase
      .from("members")
      .select("*");

    alert("Query Finished");

    console.log(data);
    console.log(error);

    if (error) {
      message.innerHTML = error.message;
      return;
    }

    if (!data || data.length === 0) {
      message.innerHTML = "No members found in database";
      return;
    }

    const member = data.find(
      m => m.mobile == mobile && m.password == password
    );

    if (!member) {
      message.innerHTML = "Invalid Mobile or Password";
      return;
    }

    document.querySelector(".login-page").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("memberName").innerHTML =
      "Name : " + member.name;

    document.getElementById("memberMobile").innerHTML =
      "Mobile : " + member.mobile;

    message.innerHTML = "";

  } catch (err) {

    alert(err.message);

    message.innerHTML = err.message;

  }

}

function logout() {
  location.reload();
}
