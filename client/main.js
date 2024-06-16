const form = document.getElementById("visitorForm");

async function fetchAndRenderVisitorInfo() {
  const response = await fetch(
    "https://visitor-guestbook-89ko.onrender.com/visitor-information"
  );
  const visitorInfo = await response.json();
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  const visitorInfoDiv = document.getElementById("visitorInfo");
  visitorInfoDiv.innerHTML = "";

  visitorInfo.forEach((visitor) => {
    const visitorDiv = document.createElement("div");
    visitorDiv.innerHTML = `<p id="name-date">${visitor.name}</p> <p id="comment-box">${visitor.comment}</p><p id="rating">${visitor.rating}</p>`;
    visitorInfoDiv.appendChild(visitorDiv);
  });
  function updateScroll() {
    let element = document.getElementById("visitorInfo");
    element.scrollTop = element.scrollHeight;
  }
  updateScroll();
}

//   //adding auto content into view
//   const element = document.getElementById("visitorInfo");
//   element.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//     inline: "nearest",
//   });
// }

fetchAndRenderVisitorInfo();

form.addEventListener("submit", submitButton);

async function submitButton(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  try {
    const response = await fetch(
      "https://visitor-guestbook-89ko.onrender.com/visitor-information",
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
      form.reset();
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

// // now to add a delete button

// const deleteButton = document.querySelector(".delete-button");

// async function deletePost(event) {
//   event.preventDefault();

//   const formData = new FormData(form);
//   const formValues = Object.fromEntries(formData);

//   try {
//     const response = await fetch(
//       "https://visitor-guestbook-89ko.onrender.com/visitor-information",
//       {
//         method: "DELETE",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(formValues),
//       }
//     );
//     const data = await response.json();
//     if (data.success) {
//       console.log("Success! Data is deleted.");
//       fetchAndRenderVisitorInfo();
//     } else {
//       console.log("Error");
//     }
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }

// deleteButton.addEventListener("click", deletePost);
