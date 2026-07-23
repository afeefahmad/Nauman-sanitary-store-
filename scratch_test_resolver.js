import { ALL_CATEGORIES, getProductImage } from './src/data/categories.js';

console.log('--- TESTING TOILET RESOLVER ---');
const toilets = ALL_CATEGORIES.find(c => c.slug === 'toilets');
if (toilets) {
  toilets.products.forEach((prod, i) => {
    const img = getProductImage('toilets', prod.name, prod.brand);
    console.log(`Product [${i+1}]: Brand: "${prod.brand}", Name: "${prod.name}", Image: "${img}"`);
  });
} else {
  console.log('Toilets category not found');
}
