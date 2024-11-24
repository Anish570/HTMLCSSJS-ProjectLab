// scripts/script.js
const likeButton = document.querySelector('.like-button');
const likeCount = document.getElementById('like-count');

// Initialize like count (can be fetched dynamically or from local storage if needed)
let currentLikes = 0;
let userHasLiked = false;

likeButton.addEventListener('click', () => {
  if (!userHasLiked) {
    currentLikes += 1; // Increment likes
    likeCount.textContent = currentLikes; // Update the displayed count
    userHasLiked = true; // Mark user as having liked
    likeButton.disabled = true; // Disable the button
  }
});

