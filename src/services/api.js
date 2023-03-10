// Realiza a importação das categorias dos produtos.
export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT);
  const categories = response.json();
  return categories;
}

// Realiza a importação de produtos conforme categoria e/ou palavra-chave.
export async function getProductsFromCategoryAndQuery({ category, query }) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`;
  const response = await fetch(ENDPOINT);
  const categoriesAndQuery = response.json();
  return categoriesAndQuery;
}

// Realiza a importação dos dados de um produto específico.
export async function getProductData(productID) {
  const ENDPOINT = `https://api.mercadolibre.com/items/${productID}`;
  const response = await fetch(ENDPOINT);
  const productData = response.json();
  return productData;
}
