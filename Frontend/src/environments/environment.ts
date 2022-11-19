// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  registerUrl: "http://localhost:3001/api/auth/register/",
  usersUrl: "http://localhost:3001/api/users/",
  citiesUrl: "http://localhost:3001/api/cities/",
  loginUrl: "http://localhost:3001/api/auth/login/",
  categoryUrl: "http://localhost:3001/api/products/categories/",
  productsUrl: "http://localhost:3001/api/products/",
  searchProductsUrl: "http://localhost:3001/api/products/search/",
  productsCountsUrl: "http://localhost:3001/api/products/count/",
  productImagesUrl: "http://localhost:3001/api/products/images/",
  productsByCategoryUrl: "http://localhost:3001/api/products/by-category/",
  ordersUrl: "http://localhost:3001/api/orders/",
  ordersCountUrl: "http://localhost:3001/api/orders/count/",
  cardsUrl: "http://localhost:3001/api/cards/",
  cardsProductsUrl: "http://localhost:3001/api/cards-products/",
  searchCardsProductsUrl: "http://localhost:3001/api/cards-products/search/",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
