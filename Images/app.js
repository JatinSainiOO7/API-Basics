const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const imageGallery = document.getElementById('image-gallery');

// Unsplash API key (replace with your own API key)
const API_KEY = 'YOUR_UNSPLASH_API_KEY';

// Function to fetch images from the API
async function fetchImages(query) {
  if (!query.trim()) {
    imageGallery.innerHTML = '<p>Please enter a search query.</p>';
    return;
  }

  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${'-xYpu-KSGbvNfSCjxvso6BVRUah3nYZL5GtFnjGI9FA'}&per_page=30`);
  const data = await response.json();

  const images = data.results.map(image => image.urls.small);
  displayImages(images);
}

// Function to display images in the gallery
function displayImages(images) {
  if (images.length === 0) {
    imageGallery.innerHTML = '<p>No images found. Try a different search term.</p>';
    return;
  }

  imageGallery.innerHTML = images
    .map(imageUrl => `<img src="${imageUrl}" alt="Related image" />`)
    .join('');
}

// Add event listeners for the search functionality
searchButton.addEventListener('click', () => {
  const query = searchBar.value;
  fetchImages(query);
});

searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    fetchImages(event.target.value);
  }
});
