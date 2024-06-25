// scripts/create-post.js

document.addEventListener("DOMContentLoaded", () => {
  const mediaInput = document.getElementById("post-media");
  const mediaPreview = document.getElementById("media-preview");
  const maxMediaCount = 10;

  mediaInput.addEventListener("change", () => {
    if (mediaPreview.children.length >= maxMediaCount) {
      alert("You can only add up to 10 media items.");
      return;
    }

    Array.from(mediaInput.files).forEach((file) => {
      if (mediaPreview.children.length >= maxMediaCount) {
        alert("You can only add up to 10 media items.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const mediaCube = document.createElement("div");
        mediaCube.className = "media-cube";

        const mediaElement = file.type.startsWith("image/")
          ? document.createElement("img")
          : document.createElement("video");
        mediaElement.src = e.target.result;
        if (file.type.startsWith("video/")) {
          mediaElement.controls = true;
        }
        mediaCube.appendChild(mediaElement);

        const descDiv = document.createElement("div");
        descDiv.className = "description";
        descDiv.innerText = "Add Description";
        mediaCube.appendChild(descDiv);

        descDiv.addEventListener("click", () => {
          const description = prompt("Enter a description:");
          if (description) {
            descDiv.innerText = description;
          }
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "X";
        mediaCube.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
          mediaPreview.removeChild(mediaCube);
        });

        mediaPreview.appendChild(mediaCube);
      };
    });

    mediaInput.value = ""; // Clear the input after processing
  });

  let mediaRecorder;
  const recordButton = document.getElementById("record-voiceover");
  const voiceoverPreview = document.getElementById("voiceover-preview");

  recordButton.addEventListener("click", () => {
    if (recordButton.innerText === "Record Voiceover") {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        recordButton.innerText = "Stop Recording";
        mediaRecorder.ondataavailable = (e) => {
          const audioURL = URL.createObjectURL(e.data);
          voiceoverPreview.src = audioURL;
          voiceoverPreview.style.display = "block";
        };
      });
    } else {
      mediaRecorder.stop();
      recordButton.innerText = "Record Voiceover";
    }
  });

  const addLinkButton = document.getElementById("add-link");
  const linkList = document.getElementById("link-list");
  const linkInput = document.getElementById("post-links");

  addLinkButton.addEventListener("click", () => {
    const url = linkInput.value;
    if (url) {
      const linkItem = document.createElement("li");
      linkItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
      linkList.appendChild(linkItem);
      linkInput.value = "";
    }
  });
});
