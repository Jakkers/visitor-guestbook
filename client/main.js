const form = document.getElementById("visitorForm");

async function fetchAndRenderVisitorInfo() {
  const response = await fetch(
    "https://visitor-guestbook-89ko.onrender.com/visitor-information"
  );
  const visitorInfo = await response.json();

  const visitorInfoDiv = document.getElementById("visitorInfo");
  visitorInfoDiv.innerHTML = "";

  visitorInfo.forEach((visitor) => {
    const visitorDiv = document.createElement("div");
    visitorDiv.innerHTML = `<p>ID: ${visitor.id}, Date: ${visitor.date}, Name: ${visitor.name}, Email: ${visitor.email}, Comments: ${visitor.comment}<p>`;
    visitorInfoDiv.appendChild(visitorDiv);
  });
}

fetchAndRenderVisitorInfo();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch(
      "https://visitor-guestbook-89ko.onrender.com/visitor_information",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await response.json();
    if (data.success) {
      console.log("Success! Data is saved.");
      fetchAndRenderVisitorInfo();
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}
