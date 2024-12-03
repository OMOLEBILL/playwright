## Test Descriptions

### Task 1: Locked Out User Test
This test verifies the behavior of a locked-out user attempting to log in.
- **Steps**:
  1. Open the Sauce Demo login page.
  2. Enter username `locked_out_user` and password `secret_sauce`.
  3. Click the login button.
  4. Verify that the user is still on the login page by checking the presence of the `.login_logo` element.
  5. Verify that the warning message `Epic sadface: Sorry, this user has been locked out.` is displayed.
  6. Close the warning message.

### Task 2: Standard User Checkout Flow
This test covers the successful flow of a standard user logging in, adding a product to the cart, and completing checkout.
- **Steps**:
  1. Open the Sauce Demo login page.
  2. Enter username `standard_user` and password `secret_sauce`.
  3. Click the login button.
  4. Verify that the user is redirected to the product list page by checking for the `#inventory_container` element.
  5. Change product sorting to `Price (low to high)` and verify that sorting is applied.
  6. Add `Sauce Labs Bolt T-Shirt` to the cart and verify that the button changes to `Remove`.
  7. Verify that the cart counter shows `1` item.
  8. Save product details and go to the cart.
  9. Verify that the product data matches the previously saved details.
  10. Remove the product from the cart and ensure that the cart counter is not displayed.
  11. Return to the product page by clicking the `Continue Shopping` button.
  12. Add `Sauce Labs Backpack` to the cart and click on `Checkout`.
  13. Fill in the checkout form and click `Continue`.
  14. Verify the `Item total` field matches the price of the item.
  15. Click `Finish`.
  16. Verify that the `Thank You` screen contains an image with the attribute `alt='Pony Express'`.

### Notes
- The `locked_out_user` scenario is designed to verify that the application properly handles users who are not allowed to log in.
- The `standard_user` scenario tests the entire purchase process, including adding an item to the cart, checking out, and verifying details.

## Author
Developed by [Bill Omole], using Playwright for automation testing of the Sauce Demo website.
