const express = require('express');
const db = require('./firebase');

const app = express();
const port = 5000;

app.use(express.json());

// Endpoint to get personalized recommendations
app.get('/api/recommendations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch user data
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const userData = userDoc.data();
    const purchasedProducts = userData.purchasedProducts;

    // Fetch all products
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => doc.data());

    // Simple recommendation logic: recommend products not purchased by the user
    const recommendedProducts = products.filter(product => !purchasedProducts.includes(product.id));

    res.json(recommendedProducts);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
