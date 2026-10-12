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
1. User registration and login with form validation
2. Browse food menu
3. Add products to shopping cart
4. Modify quantity and remove items in cart
5. Create orders and view order list
6. User profile and logout function
7. Clear entire shopping cart with confirmation

## How to Run
See the Knowledge Base article 04 Local setup and troubleshooting for detailed instructions.
1. Download all project files or clone the repository: git clone https://github.com/yan2138/food-delivery.git
2.Open index.html directly with a modern web browser (Chrome, Edge, Firefox, etc.).
3. Alternatively, run a local HTTP server: python -m http.server 8000
4.All pages and functions can be used normally.

## Notes
This project uses LocalStorage to simulate shopping cart and order data for demonstration.