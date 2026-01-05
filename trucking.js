// Listings will be loaded from API
let listings = [];

// Load listings from API
async function loadListings() {
  try {
    const response = await fetch('/api/listings');
    listings = await response.json();
  } catch (error) {
    console.error('Error loading listings:', error);
    listings = [];
  }
}

// Save to API (for add listing)
async function saveListing(newListing) {
  try {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newListing)
    });
    const result = await response.json();
    if (result.success) {
      alert(result.message);
      await loadListings(); // Reload listings
    } else {
      alert('Error adding listing.');
    }
  } catch (error) {
    console.error('Error saving listing:', error);
    alert('Error adding listing.');
  }
}

// Search functionality - now redirects to results page
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const from = document.getElementById('fromLocation').value;
    const to = document.getElementById('toLocation').value;
    const date = document.getElementById('moveDate').value;

    // Redirect to results page with search params
    const params = new URLSearchParams({ from, to, date });
    window.location.href = `results.html?${params.toString()}`;
});

// Add listing functionality
if (document.getElementById('addForm')) {
  document.getElementById('addForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fromLocation = document.getElementById('fromLocation').value;
    const toLocation = document.getElementById('toLocation').value;
    const route = fromLocation + ' to ' + toLocation;
    const newListing = {
      company: document.getElementById('companyName').value,
      truckType: document.getElementById('truckType').value,
      route: route,
      price: parseFloat(document.getElementById('price').value),
      contact: document.getElementById('contact').value,
      description: document.getElementById('description').value,
      reviews: []
    };
    await saveListing(newListing);
    // Reset form
    e.target.reset();
  });
}

// Book listing
function bookListing(index) {
    alert(`Booking request sent for ${listings[index].company}. Contact: ${listings[index].contact}`);
}

// Toggle reviews
function toggleReviews(index) {
    const div = document.getElementById(`reviews-${index}`);
    div.style.display = div.style.display === 'none' ? 'block' : 'none';
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

