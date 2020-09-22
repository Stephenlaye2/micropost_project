import { http } from "./http";
import { ui } from "./ui";

// Get post on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);
// Event listener for submitting post
document.querySelector(".post-submit").addEventListener("click", postSubmit);

// Event listener for editing post
document.querySelector("#posts").addEventListener("click", postEdit);

// Event listener for canceling edit
document.querySelector(".card-form").addEventListener("click", postCancel);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((res) => {
      ui.showPost(res);
    })
    .catch((err) => console.log(err));
}

function postSubmit() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;
  const data = {
    title,
    body,
  };
  if (title !== "" && body !== "") {
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          getPosts();
          ui.clearfield();
          ui.showAlert("Post Added", "alert-success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          ui.changeFormState("add");
          ui.showAlert("Post updated", "alert-success");
        })
        .catch((err) => console.log(err));
    }
  } else {
    ui.showAlert("Please fill in all fields", "alert-danger");
  }
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("Post removed", "alert-success");
          getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  e.preventDefault();
}

function postEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const id = e.target.parentElement.dataset.id;

    const data = {
      title,
      body,
      id,
    };

    // Fill form field
    ui.fillForm(data);
  }
  e.preventDefault();
}
function postCancel(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
