🥘 Tomato - Full Stack Food Delivery Application
A robust, full-stack e-commerce platform built with the MERN stack. This project features a polished user storefront, a comprehensive admin dashboard for management, and a secure backend integrated with Stripe for payments.

📁 Project Structure
The repository is divided into three main folders:

frontend/: The client-side React application where users browse food and place orders.

admin/: The React-based dashboard for restaurant owners to manage inventory and track orders.

backend/: The Node.js/Express API that handles the database, authentication, and payments.

✨ Key Features
🛒 User Frontend
Dynamic Menu: Filter food items by category.

Cart System: Real-time cart updates and persistent storage.

Stripe Integration: Secure credit card processing.

Order Tracking: Monitor the status of your meal from "Processing" to "Delivered."

🛠 Admin Dashboard
Inventory Control: Add new dishes with image uploads or remove existing ones.

Live Order Management: View all incoming orders and update delivery status in real-time.

Responsive UI: Manage your business from both desktop and mobile devices.

🔐 Backend & Security
JWT Authentication: Secure user login and protected routes.

Database: Scalable NoSQL storage using MongoDB.

Image Handling: Managed via Multer middleware.

🛠 Tech Stack
Frontend & Admin: React.js, Vite, Axios, React Context API

Backend: Node.js, Express.js

Database: MongoDB

Payments: Stripe API

Styling: Pure CSS / CSS Grid & Flexbox

🚀 Getting Started
1. Clone the project
Bash

git clone https://github.com/Aayuiiitmg/Food-Delivery-App-Tomato.git
cd Food-Delivery-App-Tomato
2. Setup Backend
Bash

cd backend
npm install
# Create a .env file with:
# MONGODB_URI=your_mongodb_url
# STRIPE_SECRET_KEY=your_stripe_key
nodemon run server
3. Setup Frontend & Admin
Repeat these steps inside both the frontend and admin folders:

Bash

npm install
npm run dev
📝 License
Distributed under the MIT License. See LICENSE for more information.
