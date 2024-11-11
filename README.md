# Smart Shopper: Personalized Product Recommendation System

## Project Overview
Smart Shopper is a web-based personalized product recommendation system aimed at providing users with tailored electronic product suggestions. This project leverages big data technology and full-stack development, utilizing a rule-based approach to deliver relevant product recommendations based on user-defined criteria.

## Course
This project is part of the **Big Data Technology** course and demonstrates the application of big data tools in building a responsive and scalable recommendation system.

## Key Features
- **User Authentication**: Secure login system, with JWT-based authentication.
- **Personalized Recommendations**: Rule-based filtering and recommendation based on product specifications.
- **Product Categories**: Supports various electronics categories, including Laptops, Mobiles, Tablets, Earbuds, Headphones, Cameras, Speakers, and TVs.
- **Advanced Filtering**: Filter options for each category to find products that match specific requirements (e.g., brand, screen size, battery life, etc.).
- **Wishlist Management**: Allows users to add products to their wishlist (requires login).
- **Interactive UI**: Responsive and user-friendly interface built with React.

## Tech Stack
### Frontend
- **React**: For building dynamic and interactive user interfaces.
- **CSS**: For styling and layout.

### Backend
- **Node.js**: Server-side environment to handle API requests.
- **Express.js**: Web framework for managing API routes and middleware.
- **MongoDB**: NoSQL database for storing product data and user information.
- **JWT**: Used for secure authentication.

### Big Data Tool
- **Apache Spark**: Used for data processing and handling big data tasks. Spark is connected to MongoDB, enabling efficient data handling and filtering for real-time recommendations.

### Project Structure
- **Backend API**: Provides endpoints for authentication, product data retrieval, filtering, and recommendation.
- **Frontend Components**: 
  - `Header`, `Hero`, `Footer`, `ProductList`, `Product`, `LoginPopup`, `Wishlist`, `UpcomingReleases`, and `ExclusiveOffers` components.
  - Each component is responsible for rendering specific parts of the UI or handling user interactions.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-shopper.git
   cd smart-shopper
