# SmartSwap

SmartSwap is a web application designed for users to buy and sell second-hand smartphones easily. The platform allows users to create listings, browse available devices, comment on listings, like phones, and view other users' profiles. The application is built using **React** for the frontend and **Firebase** for authentication and data storage.

## Features

- **User Authentication:** Users can register and log in using Firebase Authentication.
- **Phone Listings:** Users can add, edit, and delete their smartphone listings.
- **Image Support:** Users can add images to their listings via URLs.
- **Like System:** Users can like and dislike phone listings.
- **Comments:** Users can leave comments on listings.
- **User Profiles:** Users can view other users' profiles and their listed devices.
- **Responsive Design:** The app is optimized for mobile and desktop use.

## Technologies Used

- **Frontend:** React, React Router
- **Backend & Database:** Firebase (Firestore, Authentication)
- **Styling:** CSS (or Tailwind, if applicable)
- **State Management:** useState, useEffect, useContext

## Installation & Setup

To run SmartSwap locally, follow these steps:

### Prerequisites
- Node.js (>=16.x)
- npm

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/smartswap.git
   cd client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## How the App Works

### User Experience
- Upon opening the app, visitors can see available phone listings but cannot interact with them.
- To add a listing, like a phone, or leave a comment, users must register and log in.
- The home page displays all available phones, with sorting and filtering options.
- Clicking on a phone listing shows details, including price, description, owner, and comments.
- Users can edit or delete their own listings but cannot modify others' listings.
- Each user has a profile page displaying their listed devices and basic information.

### Posting a Phone for Sale
1. Navigate to "Sell Phone" and fill out the form with details (brand, model, price, description, image URL).
2. Submit the listing, which will be added to the marketplace.

### Interacting with Listings
- **Like** a phone to show interest.
- **Comment** on a listing to ask questions or negotiate.
- **View the seller's profile** to see all their listings.

### Managing Listings
- Users can **edit** their own listings to update information.
- Users can **delete** their listings if the phone is no longer available.

## Deployment

## Future Enhancements
- Image upload via Firebase Storage instead of URLs.
- Chat functionality for buyers and sellers.
- Enhanced search and filtering options.

## License
