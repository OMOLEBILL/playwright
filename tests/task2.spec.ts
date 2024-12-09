import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartsPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Sauce Demo Site Automation', () => {
  test('Standard user checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    let productDetails!: { name: string; price: string };

    await test.step('Navigate to login page and log in', async () => {
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify that the user is on the product list page', async () => {
      await productsPage.verifyOnProductsPage();
    });

    await test.step('Change sorting to Price (Low to High) and verify', async () => {
      await productsPage.sortByPriceLowToHigh();
      await productsPage.verifySortedByPrice();
    });

    await test.step('Add Sauce Labs Bolt T-Shirt to the cart and verify', async () => {
      await productsPage.addItemToCart('Sauce Labs Bolt T-Shirt');
      await productsPage.verifyCartCount(1);
    });

    await test.step('Save product data and go to the cart', async () => {
      productDetails = await productsPage.getProductDetails('Sauce Labs Bolt T-Shirt');
      await productsPage.goToCart();
    });

    await test.step('Verify product details in the cart', async () => {
      await cartPage.verifyProductInCart(productDetails);
    });

    await test.step('Remove the product from the cart and verify', async () => {
      await cartPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
      await cartPage.verifyCartIsEmpty();
    });

    await test.step('Continue shopping and add Sauce Labs Backpack to the cart', async () => {
      await cartPage.continueShopping();
      await productsPage.addItemToCart('Sauce Labs Backpack');
      productDetails = await productsPage.getProductDetails('Sauce Labs Backpack');
    });

    await test.step('Go to cart and proceed to checkout', async () => {
      await productsPage.goToCart();
      await cartPage.checkout();
    });

    await test.step('Fill in the checkout form and continue', async () => {
      await checkoutPage.fillCheckoutForm('test', 'nix', 'soItBegins');
      await checkoutPage.continueToOverview();
    });

    await test.step('Verify item total on the Overview page', async () => {
      await checkoutPage.verifyItemTotal(productDetails.price);
    });

    await test.step('Finish the purchase', async () => {
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify that the Thank You screen is displayed', async () => {
      await checkoutPage.verifyThankYouScreen();
    });
  });
});
