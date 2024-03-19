// event handler for adding a new post
async function createFormHandler(event) {
	event.preventDefault();
  
	const header = document.querySelector('#create-header').value.trim();
	const body = document.querySelector('#create-body').value.trim();
  
	const userInput = await fetch(`/api/posts`, {
	  method: "POST",
	  body: JSON.stringify({
		header,
		body,
	  }),
	  headers: {
		"Content-Type": "application/json",
	  },
	});
  
	if (userInput.ok) {
	  document.location.replace("/dashboard");
	} else {
	  alert('Failed to create post');
	}
  }
  
  // event listener for adding a new post
  document
	.querySelector(".create-post-form")
	.addEventListener("submit", createFormHandler);