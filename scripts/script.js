document.addEventListener("DOMContentLoaded", function () {
  // Handle comment submission on the blog post page
  const commentForm = document.getElementById("comment-form");
  const commentList = document.getElementById("comment-list");

  if (commentForm) {
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const commentText = document.getElementById("comment-text").value;
      if (commentText.trim() !== "") {
        const newComment = document.createElement("p");
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        document.getElementById("comment-text").value = "";
      }
    });
  }

  // Handle create post form submission
  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.getElementById("post-title").value;
      const content = document.getElementById("post-content").value;
      if (title.trim() && content.trim()) {
        alert("Post created: " + title);
        // Reset form fields
        document.getElementById("post-title").value = "";
        document.getElementById("post-content").value = "";
      }
    });
  }

  // Handle report issue form submission
  const reportIssueForm = document.getElementById("report-issue-form");
  if (reportIssueForm) {
    reportIssueForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const description = document.getElementById("issue-description").value;
      if (description.trim()) {
        alert("Issue reported: " + description);
        // Reset form fields
        document.getElementById("issue-description").value = "";
      }
    });
  }
});
