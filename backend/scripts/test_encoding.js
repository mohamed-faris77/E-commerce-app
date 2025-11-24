// Quick test to see what the API returns
const testCategory = 'Kitchen & Home';
const encoded = encodeURIComponent(testCategory);

console.log('Original:', testCategory);
console.log('Encoded:', encoded);
console.log('URL would be:', `/products?category=${encoded}`);

// Test the backend filtering logic
const keyword = {};
const category = 'Kitchen & Home';
keyword.category = category;

console.log('\nBackend query object:', keyword);
