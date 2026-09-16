# Modern Suites | Boutique Workspaces in Mahalaxmi, Mumbai

An original, ultra-luxury portfolio website and backend service created for **Modern Suites**, the premium commercial real-estate development by **Modern Estates** (Modern India Limited).

---

## 🏛️ Project Objective & Aesthetic

Designed with the visual language of high-end architectural publications and luxury property presentations:
- **Obsidian & Dark Charcoal Visual Language**: Deep negative space (`#08080a`, `#101014`), warm off-white typography (`#f4f1ea`), and muted gold accents (`#c5a880`).
- **Oversized Editorial Typography**: Pairing serif elegance (`Cormorant Garamond`) with modern geometric display type (`Syne` and `Plus Jakarta Sans`).
- **Restrained Motion Design**: Purposeful, slow Framer Motion scroll reveals, parallax backgrounds, and subtle image transitions.
- **Single-Tenant Exclusivity Storytelling**: Emphasizing privacy, IGBC Platinum pre-certification, three-side ventilation, and 88 car parks.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **React.js** (v18) + **Vite** (JavaScript only, no TypeScript)
- **React Router** (v6)
- **Framer Motion** (v11) for scroll reveals, parallax, lightboxes, & page transitions
- **Lucide React** for minimalist line iconography
- **CSS Modules & Global CSS Custom Properties** for lightweight, performance-tuned styling

### Backend (`/server`)
- **Node.js** + **Express.js** (JavaScript)
- **MongoDB** + **Mongoose** (ODM with schema validation and fallback connection handling)
- **express-validator** for request payload sanitization and error extraction
- **cors** & **dotenv**

---

## 📁 Directory Structure

```
Modern India LP/
├── client/                     # Vite React Frontend
│   ├── public/
│   │   └── images/modern-suites/ # High-resolution architectural assets
│   ├── src/
│   │   ├── components/         # 14 Section Components
│   │   │   ├── Preloader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProjectIntro.jsx
│   │   │   ├── ProjectStats.jsx
│   │   │   ├── Architecture.jsx
│   │   │   ├── WorkspaceExperience.jsx
│   │   │   ├── Amenities.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Location.jsx
│   │   │   ├── LocationAdvantage.jsx
│   │   │   ├── Developer.jsx
│   │   │   ├── EnquiryForm.jsx
│   │   │   └── Footer.jsx
│   │   ├── data/
│   │   │   └── projectData.js  # Centralized project copy & metadata
│   │   ├── hooks/
│   │   │   ├── useScrollDirection.js
│   │   │   └── useIntersectionObserver.js
│   │   ├── pages/
│   │   │   ├── ModernSuites.jsx
│   │   │   └── ThankYou.jsx
│   │   ├── services/
│   │   │   └── api.js          # REST API client wrapper
│   │   ├── styles/
│   │   │   ├── globals.css     # Resets & utility classes
│   │   │   └── variables.css   # Luxury color & font design tokens
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express REST Backend
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── controllers/
│   │   └── enquiryController.js# Form submission controller
│   ├── middleware/
│   │   └── errorMiddleware.js  # Centralized error handler
│   ├── models/
│   │   └── Enquiry.js          # Mongoose schema
│   ├── routes/
│   │   └── enquiryRoutes.js    # API endpoints
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── package.json                # Root workspace orchestration
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (or MongoDB Atlas URI)

### 2. Environment Setup

Create `.env` in the `/server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/modern_suites
CLIENT_URL=http://localhost:5173
```

Create `.env` in the `/client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Running Locally

#### Install Dependencies
From the project root directory:
```bash
npm run install:all
```
*(Or navigate into `/server` and `/client` independently and run `npm install`)*

#### Start Backend Server
```bash
# In /server or from root:
npm run dev:server
```
Runs Express server at `http://localhost:5000`.

#### Start Frontend Client
```bash
# In /client or from root:
npm run dev:client
```
Runs Vite development server at `http://localhost:5173`.

---

## 🔌 API Documentation

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "online",
  "service": "Modern Suites Luxury Real Estate API",
  "timestamp": "2026-09-16T06:36:32.351Z"
}
```

### 2. Submit Project Enquiry
- **Endpoint**: `POST /api/enquiries`
- **Request Body**:
```json
{
  "firstName": "Rajesh",
  "lastName": "Mehta",
  "email": "rajesh@mehtacapital.com",
  "mobile": "9820098200",
  "company": "Mehta Capital",
  "message": "Interested in securing a single-office floor plate."
}
```
- **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Thank you. Our executive team will be in touch with you shortly.",
  "data": {
    "referenceId": "6aaa38f0912e726f643fd47e",
    "createdAt": "2026-09-16T06:36:32.488Z"
  }
}
```
- **Validation Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Validation failed. Please check your form inputs.",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address" }
  ]
}
```

---

## ☁️ Vercel Deployment Guide

The project is fully pre-configured for **Vercel** with full-stack support (Vite Static Frontend + Express Serverless Node.js API).

### Method A: Deploying via Vercel CLI (Recommended & Fast)

1. Open your terminal in the project root (`Modern India LP`) and run:
   ```bash
   npx vercel
   ```
2. Follow the prompts:
   - Set up and deploy? **`Y`**
   - Which scope? **Select your account**
   - Link to existing project? **`N`**
   - What's your project's name? **`modern-suites`**
   - In which directory is your code located? **`./`**
3. Once deployed, run for production:
   ```bash
   npx vercel --prod
   ```

---

### Method B: Deploying via GitHub & Vercel Dashboard

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy Modern Suites to Vercel"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/modern-suites-portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Import Project**.
3. Select your GitHub repository (`modern-suites-portfolio`).
4. **Environment Variables**:
   Under **Environment Variables**, add:
   - `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/modern_suites?retryWrites=true&w=majority`
   - `NODE_ENV`: `production`
5. Click **Deploy**. Vercel will build the frontend (`client/dist`) and deploy the serverless Express API (`api/index.js`).

---

## 📦 Production Build locally

To build the client application for production deployment:
```bash
npm run build:client
```
Outputs optimized static assets in `/client/dist/`.

---

## 🔒 Security & Performance Features
- **Frontend Input Validation**: Real-time regex pattern matching for phone numbers and emails.
- **Backend Sanitization**: `express-validator` input trimming and escaping before saving.
- **Safe Error Handling**: Prevents exposing raw database stack traces or credentials to clients.
- **Image Optimization**: WebP/PNG lazy loading with fluid responsive clamp sizes.

---

## 📄 Licensing & Copyright
© Modern Estates India Private Limited. All Rights Reserved.
