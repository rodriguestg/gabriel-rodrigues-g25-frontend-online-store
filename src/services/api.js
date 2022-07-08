export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resposta = await fetch(ENDPOINT);
  const categories = resposta.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const resposta = await fetch(ENDPOINT);
  const categoriesAndQuery = resposta.json();
  return categoriesAndQuery;
}
