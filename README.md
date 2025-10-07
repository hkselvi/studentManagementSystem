# 🎓 Student Management System — Wisdom University

A simple **web-based Student Management System** built with **HTML, CSS, and JavaScript**.
This project allows users to manage students and lectures within Wisdom University by providing an intuitive interface for adding, listing, and managing both entities.

🔗 **GitHub Repository:** [https://github.com/hkselvi/studentManagementSystem](https://github.com/hkselvi/studentManagementSystem)

---

## 📋 Features

### 🧑‍🏫 Lecture Management

* Add new lectures with a **lecture code**, **name**, and **instructor**.
* Choose a **grading scale** (7-point or 10-point).
* Display all lectures in a structured table.
* Track the **number of enrolled students** for each lecture.
* Perform **edit** or **delete** operations (implemented in `script.js`).

### 🎓 Student Management

* Add students with **ID**, **name**, **surname**, **midterm**, and **final** scores.
* Assign each student to a **lecture**.
* Automatically calculate the **grade** based on scores.
* List, search, and filter students:

  * ✅ **Show Passed Students**
  * ❌ **Show Failed Students**
  * 📋 **Show All Students**

### 🔍 Search & Filter

* Instantly search for students by name or ID.
* Filter based on performance status (pass/fail).

---

## 🧠 Project Structure

```
studentManagementSystem/
│
├── index.html              # Main structure of the web app
├── styles.css              # Visual design and layout
├── script.js               # Interactive logic (data handling and DOM updates)
└── university-icon.svg     # Logo displayed in the header
```

---

## ⚙️ How It Works

1. **Navigation Buttons** toggle between student and lecture management sections.
2. Sections (`studentFormSection`, `lectureFormSection`, etc.) are dynamically displayed or hidden using JavaScript.
3. **Adding Data:**

   * When a user submits a form, the data is captured and displayed in the respective table.
   * The lecture list dynamically updates when new lectures are added.
4. **Filtering and Searching:**

   * The student list can be filtered or searched dynamically without page reloads.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hkselvi/studentManagementSystem.git
```

### 2. Navigate to the Project Folder

```bash
cd studentManagementSystem
```

### 3. Open in Browser

Simply open `index.html` in your preferred web browser.

---

## 💡 Technologies Used

* **HTML5** – Page structure and elements
* **CSS3** – Styling, layout, and responsive design
* **JavaScript (ES6)** – Form handling, data management, and dynamic content

---

## 🧩 Future Improvements

* Add **localStorage** for saving data persistently
* Include **form validation** and error messages
* Improve **mobile responsiveness**
* Export lecture and student data as **CSV or JSON**
* Add **edit/delete** functionality with confirmation dialogs

---

## 📸 Interface Overview

**Header:** Navigation bar with buttons for managing lectures and students
**Main Section:** Forms for data entry and tables for displaying records
**Footer:** Copyright

---

## 🏫 Author

Developed by **Hatice Selvi**
For **Wisdom University’s Student Management System Project**

📂 [GitHub Repository](https://github.com/hkselvi/studentManagementSystem)
© 2024 Wisdom University Management System. All rights reserved.
