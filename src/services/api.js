export async function getCategories() {
  const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/categories`);
  const categories = resposta.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const categoriesAndQuery = resposta.json();
  return categoriesAndQuery;
}

