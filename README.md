# 🏦 Loan Management System

The **Loan Management System** is a **full-stack web application** that enables businesses to **manage loans, customers, and repayments** effectively. It provides an **Angular frontend** connected to a **Java Spring Boot backend with MySQL**, allowing seamless data management.

🚀 This project was developed collaboratively:
- **Frontend Developer:** Wamuyu Gitonga (Built with **Angular & Bootstrap**)
- **Backend Developer:** Morgan (Built with **Spring Boot & MySQL**)

---

## 📜 **Features**
### **Frontend (Angular)**
 **User Authentication**
   - Login & Registration (JWT-based authentication)

 **Customer Management**
   - Add, edit, delete customers
   - Search & filter customers dynamically

 **Loan Issuance & Repayments**
   - Assign loans to customers
   - Define **amount, interest rate, repayment period, and frequency**
   - View **automated repayment schedules**

 **Dashboard & Analytics**
   - **Graphical insights** into loan distribution & repayments
   - **Sortable & filterable tables**
   - **Pagination for large datasets**

 **User-Friendly UI**
   - Responsive **Angular UI with Bootstrap**
   - **Material Design** components
   - **Lottie Animations** for enhanced UX

---

### **Backend (Spring Boot & MySQL)**
 **Spring Boot REST API** for handling:
   - **User Authentication & Authorization** (Spring Security with JWT)
   - **Customer Management**
   - **Loan Processing & Repayment Scheduling**
   - **Statistical Reports & Data Fetching**
   - **CRUD Operations with MySQL Database**

 **MySQL Database**
   - Stores user, customer, and loan data persistently
   - Optimized **SQL queries for fast transactions**
   - **Entity Relationships:** One-to-Many (Customer to Loans)

---

## 🛠️ **Technologies Used**
### **Frontend**
-  **Angular 16+** (Component-based UI)
-  **Angular Material + Bootstrap 5** (Styling & UI)
-  **Lottie Animations** (Enhanced UI/UX)
-  **Charts.js / Recharts** (Data visualization)

### **Backend**
-  **Java (Spring Boot 3+)** (Backend API)
-  **MySQL Database** (Data Storage)
-  **Spring Security + JWT** (Authentication)
-  **Spring Data JPA** (Database ORM)
-  **RESTful API with Spring MVC**

---

##  **Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/loan-management-system.git
cd loan-management-system

###  **Install Dependencies**

### **Run the Angular App**
- ng serve