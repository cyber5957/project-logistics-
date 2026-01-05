const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Load listings from file or use defaults
let listings = [];
const listingsFile = path.join(__dirname, 'listings.json');

try {
  if (fs.existsSync(listingsFile)) {
    listings = JSON.parse(fs.readFileSync(listingsFile, 'utf8'));
  } else {
    // Default mock data
    listings = [
      {
        company: 'FastMove Trucking',
        truckType: 'Semi-Truck',
        route: 'New York to California',
        price: 2500,
        contact: 'fastmove@example.com',
        description: 'Reliable long-haul service with experienced drivers.',
        reviews: [{ rating: 5, comment: 'Great service!' }, { rating: 4, comment: 'On time.' }]
      },
      {
        company: 'QuickHaul Co.',
        truckType: 'Box Truck',
        route: 'Texas to Florida',
        price: 1200,
        contact: 'quickhaul@example.com',
        description: 'Affordable local moves with flexible scheduling.',
        reviews: [{ rating: 5, comment: 'Excellent!' }]
      },
      {
        company: 'City Movers',
        truckType: 'Pickup Truck',
        route: 'Los Angeles to San Francisco',
        price: 800,
        contact: 'citymovers@example.com',
        description: 'Small moves and deliveries within California.',
        reviews: [{ rating: 4, comment: 'Reliable for small jobs.' }]
      },
      {
        company: 'Nationwide Logistics',
        truckType: 'Semi-Truck',
        route: 'Chicago to Miami',
        price: 3200,
        contact: 'nationwide@example.com',
        description: 'Nationwide shipping with tracking services.',
        reviews: [{ rating: 5, comment: 'Professional and efficient.' }, { rating: 5, comment: 'Highly recommended.' }]
      },
      {
        company: 'Budget Moves',
        truckType: 'Box Truck',
        route: 'Boston to Washington DC',
        price: 1500,
        contact: 'budgetmoves@example.com',
        description: 'Budget-friendly options for mid-range moves.',
        reviews: [{ rating: 3, comment: 'Good value.' }]
      }
    ];
    fs.writeFileSync(listingsFile, JSON.stringify(listings, null, 2));
  }
} catch (error) {
  console.error('Error loading listings:', error);
}

// API Routes
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

app.post('/api/listings', (req, res) => {
  const newListing = req.body;
  listings.push(newListing);
  try {
    fs.writeFileSync(listingsFile, JSON.stringify(listings, null, 2));
    res.json({ success: true, message: 'Listing added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving listing.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`TruckFinder server running on http://localhost:${PORT}`);
});