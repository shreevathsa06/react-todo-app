# 📝 React To-Do App

🌐 **Live Demo:** [Check it out on Netlify](https://taskstore06.netlify.app/)

A clean, user-friendly To-Do List application built with **React** and **Vite**. This app helps you manage daily tasks efficiently with features like adding, editing, deleting, and marking tasks as done, all while saving your data locally using **localStorage**.

---

## ✨ Features

- ✅ **Add Tasks:** Quickly add new tasks to your list.  
- ✏️ **Edit Tasks:** Modify existing tasks with ease.  
- 🗑️ **Delete Tasks:** Remove tasks you no longer need.  
- 🎯 **Mark as Done:** Keep track of completed tasks.  
- 💾 **LocalStorage Persistence:** Tasks are saved even after refreshing the page.  
- 🖌️ **Clean UI:** Minimalistic and intuitive user interface for smooth task management.

---

## 🧠 Key Learnings

During development, I faced an interesting challenge with **localStorage persistence**. Initially, tasks weren’t saving correctly due to a subtle **race condition** with `useEffect`. After a **2-hour debugging session** (lots of console logs and head-scratching 😅), I realized I needed to carefully synchronize state updates and localStorage writes.  

I also gained practical experience with **React hooks**:  
- `useState` for managing tasks  
- `useEffect` for side-effects and persistence  
- `useRef` for handling input focus  

This project reinforced the importance of debugging, patience, and careful handling of React state.

---

## ⚙️ Setup & Installation

1. **Clone the repository**  
```bash
git clone https://github.com/shreevathsa06/react-todo-app.git
```
```bash
cd react-todo-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser to see the app.
