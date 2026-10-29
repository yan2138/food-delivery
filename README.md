# Food Delivery Frontend Project

Frontend study project for a food delivery service, built with pure native web technologies.

## Technology Stack
- **HTML5**
- **CSS3**
- **Vanilla JavaScript** (ES6+)
- **Client-side routing** with History API
- **LocalStorage** for data persistence

## Architecture Overview
The application follows a Single Page Application (SPA) architecture:
- **Router**: `js/utils/router.js` handles client-side navigation.
- **State Management**: `js/state/store.js` manages LocalStorage state.
- **API Layer**: `js/api/api.js` handles fetch requests (simulated).
- **Pages**: Individual modules in `js/pages/` render the UI.

![Architecture Diagram](./architecture.png)
*Figure 1: High-level frontend architecture.*

For more details, see the Knowledge Base article `01 Project overview`.

## Project Structure
```text
index.html
css/
  style.css
js/
  api/
    api.js
  pages/
    home.js
    login.js
    registration.js
    cart.js
    profile.js
    orders.js
  state/
    store.js
  utils/
    router.js

## Main Features

1. **User Authentication**: Secure registration and login interfaces with client-side form validation (email format, password length) and dynamic error handling.
2. **Dynamic Food Menu**: Browse a curated list of dishes including detailed names, prices, and descriptions.
3. **Real-time Search**: Instantly filter the food menu by dish name as the user types in the search input.
4. **Category Filtering**: Filter dishes by categories (All, Meat, Vegetable) to improve the browsing experience.
5. **Shopping Cart Management**: Seamlessly add items to the cart, with data persisted using the browser's LocalStorage.
6. **Cart Modifications**: Increase or decrease item quantities, remove items entirely, and view real-time subtotal and total price calculations.
7. **Clear Cart**: A dedicated button to empty the entire shopping cart, complete with a confirmation prompt to prevent accidental deletions.
8. **Order History & Status**: View a detailed list of past orders. Each order displays a color-coded status badge (Green for Delivered, Orange for Pending/Ordered, Red for Cancelled).
9. **User Profile**: View account details (name, email, phone, address) and securely log out of the session.
10. **Mobile Responsive Design**: Fully responsive UI optimized for smaller screens (under 600px) using modern CSS media queries.

## How to Run
See the Knowledge Base article 04 Local setup and troubleshooting for detailed instructions.
1. Download all project files or clone the repository: git clone https://github.com/yan2138/food-delivery.git
2.Open index.html directly with a modern web browser (Chrome, Edge, Firefox, etc.).
3. Alternatively, run a local HTTP server: python -m http.server 8000
4.All pages and functions can be used normally.

## Notes
This project uses LocalStorage to simulate shopping cart and order data for demonstration.