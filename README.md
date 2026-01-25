# 🛠️ Local Service Booking App

A full-stack web application for discovering local service providers and booking services securely.  
Users can register, verify their email, log in, and manage bookings through a protected dashboard.

Built to demonstrate real-world full-stack development with secure authentication, scalable architecture, and modern tooling.

---

🚀 Features

- User authentication with JWT & HTTP-only cookies  
- Email verification flow  
- Browse local services & providers  
- Book services and manage bookings  
- Protected routes & user dashboard  
- Secure backend APIs  
- Global state management with Zustand  
- Dockerized backend  
- Cloud deployment support (AWS Amplify)  

---

🧱 Tech Stack

Frontend  
- React (Vite)  
- TypeScript  
- Tailwind CSS  
- Material UI (MUI)  
- Axios  
- Zustand  

Backend  
- Node.js  
- Express  
- TypeScript  
- MongoDB  
- Passport.js  

Authentication & Security  
- JWT  
- HTTP-only cookies  
- Email verification  

DevOps / Tools  
- Docker  
- AWS Amplify  

---

🏗️ Architecture Overview

- Frontend communicates with backend via Axios  
- Authentication is handled using JWT stored in HTTP-only cookies  
- Protected routes are enforced both client-side and server-side  
- Email verification ensures valid user accounts  
- Zustand manages global client state  

---

📸 Screenshots  
(Add screenshots or GIFs here)

🌐 Live Demo  
(Add deployed URL here)

---

⚙️ Environment Variables

Create a `.env` file in the backend:

```env
# Backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
