class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "Add";
  }

  showPost(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `
  <div class="card mb-3">
  <div class="card-body">
    <h4 class="card-title">${post.title}</h4>
    <p class="card-text">${post.body}</p>
    <a href="#" class="edit card-link" data-id="${post.id}"><i class = "fa fa-pencil"></i></a>
    <a href="#" class="delete card-link" data-id="${post.id}"><i class = "fa fa-remove"></i></a>
    </div>
</div>
  `;
    });
    this.post.innerHTML = output;
  }

  // Show alert
  showAlert(message, className) {
    // Create a div element
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    // Define message

    div.appendChild(document.createTextNode(message));

    // Get container
    const container = document.querySelector(".postsContainer");
    // Get post
    const posts = this.post;

    container.insertBefore(div, posts);

    this.clearAlert();
  }
  // Clear alert
  clearAlert() {
    // Set time
    setTimeout(() => {
      const currentAlert = document.querySelector(".alert");
      if (currentAlert) {
        currentAlert.remove();
      }
    }, 3000);
  }
  // Clear input field
  clearfield() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    // change the form state
    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // create a cancel element

      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      // Get parent
      const cardForm = document.querySelector(".card-form");
      // Get element to insert before
      const formEnd = document.querySelector(".form-end");

      // Insert button before the element with class of form-end
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // Get cancel button
      const postCancel = document.querySelector(".post-cancel");
      // Remove cancel button if it's there
      if (postCancel) {
        postCancel.remove();
      }
      this.clearIdInput();
      this.clearfield();
    }
  }
}

export const ui = new UI();
