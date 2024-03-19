// event handler for deleting a post
const deleteFormHandler = async (event) => {
    event.preventDefault();
  
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    const userInput = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (userInput.ok) {
      document.location.replace("/dashboard");
    } else {
      alert('Failed to delete post');
    }
  };
  
  // event listener for deleting a post
  document.getElementById("delete").addEventListener("click", deleteFormHandler);