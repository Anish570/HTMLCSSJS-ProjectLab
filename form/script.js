const baseapi_url = "https://rest-api-7esz.onrender.com/api/user";

function showDiv() {
  document.getElementById("responsetable").style.display = "table";
}

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
      allUsers(); // Refresh the table with the latest data
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

async function allUsers() {
  try {
    const response = await fetch(`${baseapi_url}/all`);
    const result = await response.json();

    if (response.ok) {
      console.log("All users:", result.data);

      // Clear the table before adding new rows
      const tableBody = document.querySelector("#responsetable tbody");
      tableBody.innerHTML = ""; // Clear any previous rows
      let count = 1;
      result.data.forEach((user) => {
        const row = tableBody.insertRow();
        const snCell = row.insertCell();
        const nameCell = row.insertCell();
        const emailCell = row.insertCell();
        const statusCell = row.insertCell();
        snCell.innerText = count;
        nameCell.innerText = user.name;
        emailCell.innerText = user.email;
        statusCell.innerText = user.status ? "Active" : "Success";
        statusCell.style.color = "green";

        count++;
      });

      // Make the table visible
      showDiv();
    } else {
      console.error("Error fetching users:", response.status);
      alert("Failed to fetch users!");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    alert("An error occurred while fetching all users.");
  }
}

// Fetch all users when the page loads
window.onload = allUsers;
