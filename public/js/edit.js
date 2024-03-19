// event handler for editing a post
async function editFormHandler(event) {
    event.preventDefault();
  
    const header = document.querySelector('#title').value.trim();
    const body = document.querySelector('#content').value.trim();
  
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
  
    const userInput = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        post_id,
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
      alert('Failed to edit post');
    }
  };
  
  // event listener for editing a post
  document.getElementById("edit-post-form").addEventListener("submit", editFormHandler);