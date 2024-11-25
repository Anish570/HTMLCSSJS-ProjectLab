const baseapi_url = "https://rest-api-7esz.onrender.com/api/user";

const checkUser = () => {
  const access_Token = localStorage.getItem("accessToken");
  if (access_Token) {
    window.location.href = "./allusers.html";
  }
};
async function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("loader").style.display = "block";

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { name, email, password };

  try {
    const response = await fetch(`${baseapi_url}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const errorbox = document.getElementById("errormsg");

    if (response.ok) {
      console.log("Response from server:", result);
      errorbox.style.display = "none";
      document.getElementById("loader").style.display = "none";
      alert("Form submitted successfully!");
      localStorage.setItem("accessToken", result.accessToken);
      window.location.href = "./allusers.html";
    } else {
      document.getElementById("loader").style.display = "none";
      console.error("Error submitting form:", response.status);
      errorbox.innerText = result.message;
      errorbox.style.display = "block";
      alert("Failed to submit the form!");
    }
  } catch (error) {
    document.getElementById("loader").style.display = "none";
    console.error("Error during fetch:", error);
    alert("An error occurred while submitting the form.");
  }
}

window.onload = checkUser;
