# PartsNPrice Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-DB7093)

A React + Vite application for managing hardware projects and parts. Users can create projects, add components, track quantities and calculate total cost.

---

## 🚀 Features

* Create, edit, delete projects
* Add and manage global parts
* Add project-specific parts and update quantities
* Automatic calculation of total cost and item counts
* Secure authentication using JWT & cookies
* Backend integration (Node.js + Express + MongoDB)

---

## 📂 Tech Stack

* **Frontend:** React.js, Vite, Axios, React Router, Context API, React Hot Toast
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Styling:** CSS / custom components
* **Hosting:** Vercel (Frontend) + Render (Backend)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
 git clone https://github.com/shaileshadole/PartsNPrice-frontend.git
 cd PartsNPrice-frontend
```

### 2️⃣ Install Dependencies

```bash
 npm install
```

### 3️⃣ Create Environment File

Create a `.env` file in root:

```bash
VITE_SERVER=https://partsnprice-backend.onrender.com/api/v1
```

### 4️⃣ Start Development Server

```bash
 npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 📁 Folder Structure

```
src/
 ├─ components/
 ├─ pages/
 ├─ context/
 ├─ main.jsx
 ├─ App.jsx
 ├─ styles
```

---

## 🌍 Deployment

### Deploy on Vercel

```bash
npm run build
```

Upload `dist` folder or connect GitHub repo.


---

## ✨ Future Enhancements

* Image upload instead of link
* Export project as PDF
* Sharing feature

---

## 🧑‍💻 Author

**Shailesh Adole**  
GitHub: [shaileshadole](https://github.com/shaileshadole)

---

## 🔗 Related Repositories

[PartsNPrice Backend](https://github.com/shaileshadole/partsnprice-backend)

---

## 🚀 Let's Connect

- 🌐 [LinkedIn](https://www.linkedin.com/in/shailesh-adole-01306a303/)
- ✉️ [Email](adoleshailesh2@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).