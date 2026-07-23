import { ALL_CATEGORIES } from './src/data/categories.js';

const toilets = ALL_CATEGORIES.find(c => c.slug === 'toilets');
console.log('Total toilets products in categories.js:', toilets.products.length);

const brandList = Array.from(new Set(toilets.products.map(p => p.brand).filter(Boolean)));
console.log('Unique brands:', brandList);

// Let's count products per brand in categories.js
brandList.forEach(brand => {
  const count = toilets.products.filter(p => p.brand === brand).length;
  console.log(`Brand: "${brand}", Count: ${count}`);
});
