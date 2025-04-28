# LS Project

LS is a full-featured chat application similar to Discord, built using the latest web development technologies to provide an efficient and secure communication experience. LS offers multiple systems including authentication, profile management, notifications, chat, room management, and a payment system for upgrading cloud storage.

---

## ⚙️ Technologies Used

### Backend:
- **Express.js** with **TypeScript** to build the server and APIs.
- **Mongoose** with **TypeScript** for MongoDB database management ([Mongoose Official Site](https://mongoosejs.com/)).
- **Authentication System** based on JWT.
- **Profile Management System**.
- **Notification System**.
- **Chat System**.
- **Rooms System**: Users can create private chat rooms with friends.
- **Payment System**: Users can upgrade their storage.
- **Cloud Storage System**: Each user gets 100 MB of storage for images and videos on a cloud server.

### Frontend:
- **Nuxt.js** (based on Vue 3) for building a modern, powerful user interface ([Nuxt Official Site](https://nuxt.com/)).

---

## 📚 Project Features

- **User Registration and Login** via JWT tokens ([jsonwebtoken NPM](https://www.npmjs.com/package/jsonwebtoken)).
- **Editable Profile Page** including profile picture and personal info.
- **Instant Notifications** when receiving messages or room invites.
- **One-on-One and Group Chats** supporting text, image, and small video messages.
- **Private Room Creation** for friends.
- **Online Payment Integration** to upgrade storage capacity beyond 100 MB.
- **Default Cloud Storage** for every user with media upload capabilities.

---

## 🗂️ Project Structure

```
/backend
  /src
    /controllers
    /models
    /routes
    /middlewares
    /services
/frontend
  /pages
  /components
  /store
  /plugins
```

---

## 🚀 Getting Started

### Prerequisites:
- Node.js >= 18 ([Node.js Official Site](https://nodejs.org/))
- MongoDB Database ([MongoDB Atlas](https://www.mongodb.com/atlas/database))
- Payment account (e.g., Stripe or PayPal) ([Stripe Payment API](https://stripe.com/docs/api))

### Run Backend:
```bash
cd backend
npm install
npm run dev
```

### Run Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 🧐 Future Plans

- Add voice and video calling using WebRTC.
- Expand payment options and introduce various subscription plans.
- Add Bot System for automatic room management.
- Enable large file uploads with additional upgrade plans.

---

## 📜 Official References

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [JWT Authentication](https://jwt.io/introduction)
- [Stripe Payment Integration](https://stripe.com/docs)

---

# Thank you for checking out LS Project! 🚀

