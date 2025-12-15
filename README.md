# 🚚 PeerShip

PeerShip is a **peer-to-peer delivery platform** that connects users with **verified travelers** who are already traveling on the same route, enabling secure and reliable item delivery.

---

## ✨ Features

### ✅ Implemented Features

- **Authentication & Authorization**
  - User **Sign Up / Sign In** using **JWT-based authentication**
  - **Google OAuth** integration for secure and seamless login
  - Protected routes for authenticated users

- **User Profile Management**
  - Create and update user profiles
  - View personal account details

- **Document Verification Workflow**
  - Delivery partners can upload **government-authorized identity documents**
  - Documents are securely stored using **Cloudinary**
  - Verification workflow designed to improve trust and prevent fraud

- **Delivery Posting Interface**
  - Users can create delivery requests
  - Clean and intuitive post delivery UI

- **Frontend Implementation**
  - Authentication pages (Sign In / Sign Up)
  - User profile pages
  - Post deliveries interface
  - Responsive UI built with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Google OAuth

### Database & Storage
- MongoDB
- Cloudinary (for document uploads)

---

## 📌 Project Objective

PeerShip focuses on building a **trusted delivery ecosystem** by:
- Connecting users with verified travelers
- Using secure authentication mechanisms (JWT & Google OAuth)
- Ensuring safety through identity verification
- Providing a smooth and user-friendly delivery posting experience

---

## 🚀 Getting Started (Local Setup)

```bash
# Clone the repository
git clone https://github.com/your-username/peership.git

# Navigate to the project directory
cd peership

# Install dependencies
npm install

# Run the development server
npm run dev
