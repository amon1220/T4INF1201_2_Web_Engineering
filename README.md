![ReadMeWebEngineering](https://github.com/user-attachments/assets/b4584261-a01d-4d38-a64c-01c54670502d)

# Getting Started Guide

---

## Prerequisites

- **Git** (to clone the repo)

- **Node.js & npm** (v14+ recommended)

- **Python 3.10+**

- **virtualenv** (optional, but recommended)


---

## 1. Clone the Repository

```bash
git clone https://github.com/amon1220/T4INF1201_2_Web_Engineering.git
cd T4INF1201_2_Web_Engineering
```

---

## 2. Frontend Setup

1. **Navigate into the frontend folder**

    ```bash
    cd Frontend/frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm start
    ```

   - The app will launch in your browser at `http://localhost:3000`

---

## 3. Backend Setup

1. **If the app is not running in the background, open a new terminal and navigate into the root folder**

    ```bash
    cd T4INF1201_2_Web_Engineering
    ```

2. **Create & activate a virtual environment** (optional, but keeps deps isolated)

    ```bash
    python -m venv .venv
    source .venv/bin/activate      # macOS / Linux
    .venv\Scripts\activate    # Windows PowerShell
    ```

3. **Upgrade pip & install Python dependencies**

    ```bash
    pip install --upgrade pip
    pip install -r ..\requirements.txt
    ```

4. **Start Backend**
    ```bash
   flask --app Backend\app.py run
    ```

## 4. Verify everything works and get started

1. **Frontend** → open `http://localhost:3000` in your browser

2. **Backend** (optional) → hit `http://localhost:5000/api/test_db` (adds a test_user(username:"2",pw:2"))

## 5. Enjoy the Retro OS

1. Click on **Register** and register.
2. Enjoy the desktop apps such as **Notepad**, **Calculator**, **Weather**, **GameCenter,** and **HackingTool3000**.
3. You can also **change your password** or **log out** in the start menu

---
