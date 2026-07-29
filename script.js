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

    const { data, error } = await supabaseClient
      .from("members")
      .select("*")
      .eq("mobile", mobile)
      .eq("password", password)
      .single();

    if (error) {
      message.innerHTML = error.message;
      return;
    }

    if (!data) {
      message.innerHTML = "Invalid Mobile or Password";
      return;
    }

    document.querySelector(".login-page").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("memberName").innerHTML =
      "Name : " + data.name;

    document.getElementById("memberMobile").innerHTML =
      "Mobile : " + data.mobile;

    message.innerHTML = "";

  } catch (err) {

    message.innerHTML = err.message;
    console.error(err);

  }

}

function logout() {
  location.reload();
}
