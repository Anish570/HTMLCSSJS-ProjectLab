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

document.querySelector('.share-button').addEventListener('click', function () {
  const shareData = {
    title: 'Gladiator II',
    text: 'Check out this movie!',
    url: window.location.href, // You can change this URL to the specific movie URL
  };

  if (navigator.share) {
    // For mobile or browsers that support the Web Share API
    navigator.share(shareData)
      .then(() => console.log('Movie shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
  } else {
    // For desktop or browsers that don't support the Web Share API
    const tempInput = document.createElement('input');
    tempInput.value = shareData.url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('URL copied to clipboard!');
  }
});
