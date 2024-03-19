// event handler for adding a new comment
async function commentFormHandler(event) {
	event.preventDefault();
  
	const comment = document.querySelector('#comment').value.trim();
  
	const post_id = window.location.toString().split("/")[
	  window.location.toString().split("/").length - 1
	];
  
	const userInput = await fetch(`/api/comments`, {
	  method: "POST",
	  body: JSON.stringify({
		post_id,
		comment,
	  }),
	  headers: {
		"Content-Type": "application/json",
	  },
	});
  
	if (userInput.ok) {
	  document.location.reload();
	} else {
	  alert('Failed to create comment');
	}
  }
  
  // event listener for adding a new comment
  document
	.querySelector(".create-comment-form")
	.addEventListener("submit", commentFormHandler);