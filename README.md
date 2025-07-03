# 📇 Contact Manager 

## Backend
A simple backend project built using **Node.js**, **Express.js**, and **MongoDB** to manage contacts. The API is tested using **Postman**.

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 📂 CRUD operations for contacts (Create, Read, Update, Delete)
- 🛠️ Secure routes using middleware
- 🗃️ MongoDB for storing user and contact data
- ⚡ Express.js for API routing and handling
- 🔄 Tested with **Postman**

## 🏗 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Token (JWT)  
- **Testing:** Postman  

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Yashwanth030/Contact-Manager.git
cd Contact-Manager/mycontacts-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a **.env** file in the root directory and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Server
```sh
npm start
```

The server runs on **http://localhost:5000**.

## 🛠 API Endpoints  

| Method | Endpoint            | Description                 | Authentication |
|--------|---------------------|-----------------------------|---------------|
| POST   | /api/users/register | Register a new user        | ❌ No         |
| POST   | /api/users/login    | User login                 | ❌ No         |
| GET    | /api/contacts       | Get all contacts           | ✅ Yes        |
| POST   | /api/contacts       | Add a new contact          | ✅ Yes        |
| PUT    | /api/contacts/:id   | Update a contact           | ✅ Yes        |
| DELETE | /api/contacts/:id   | Delete a contact           | ✅ Yes        |

## 🎯 Testing in Postman
1. Open **Postman**  
2. Use **http://localhost:5000** as the base URL  
3. Test the endpoints with the required request body & headers  

## 📜 License
This project is open-source and free to use.  

---

This README provides a clean and professional introduction to your project. You can modify it further as needed! 🚀
