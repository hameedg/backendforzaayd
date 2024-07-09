const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json'); // Ensure this is the correct path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://zaayd-personal-recommedation-default-rtdb.firebaseio.com' // Replace with your Firebase project URL
});

const db = admin.firestore();

const products = [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 999.99, image: 'image-url-1', description: 'High-performance laptop' },
  { id: '2', name: 'Headphones', category: 'Electronics', price: 199.99, image: 'image-url-2', description: 'Noise-cancelling headphones' },
  { id: '3', name: 'Book A', category: 'Books', price: 9.99, image: 'image-url-3', description: 'Fiction book' },
  { id: '4', name: 'Book B', category: 'Books', price: 14.99, image: 'image-url-4', description: 'Non-fiction book' },
  { id: '5', name: 'T-Shirt', category: 'Clothing', price: 29.99, image: 'image-url-5', description: 'Cotton t-shirt' },
  { id: '6', name: 'Jeans', category: 'Clothing', price: 49.99, image: 'image-url-6', description: 'Denim jeans' },
  { id: '7', name: 'Sofa', category: 'Home', price: 499.99, image: 'image-url-7', description: 'Comfortable sofa' },
  { id: '8', name: 'Chair', category: 'Home', price: 149.99, image: 'image-url-8', description: 'Ergonomic chair' },
  { id: '9', name: 'Camera', category: 'Electronics', price: 599.99, image: 'image-url-9', description: 'Digital camera' },
  { id: '10', name: 'Shoes', category: 'Footwear', price: 79.99, image: 'image-url-10', description: 'Running shoes' },
];

const users = [
  { id: 'user1', name: 'John Doe', email: 'john.doe@example.com', purchasedProducts: ['1', '3', '5'] },
  { id: 'user2', name: 'Jane Smith', email: 'jane.smith@example.com', purchasedProducts: ['2', '4', '6'] },
  { id: 'user3', name: 'Alice Johnson', email: 'alice.johnson@example.com', purchasedProducts: ['7', '8', '9'] },
  { id: 'user4', name: 'Bob Brown', email: 'bob.brown@example.com', purchasedProducts: ['2', '5', '10'] },
];

async function seedDatabase() {
  try {
    const batch = db.batch();

    products.forEach(product => {
      const productRef = db.collection('products').doc(product.id);
      batch.set(productRef, product);
    });

    users.forEach(user => {
      const userRef = db.collection('users').doc(user.id);
      batch.set(userRef, user);
    });

    await batch.commit();
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();
