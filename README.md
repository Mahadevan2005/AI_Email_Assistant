# MailPilot 

**MailPilot** is a **smart email assistant** that works as both a **web app** and a **Chrome extension**, powered by **Spring Boot** and **Google Gemini API**.  
It helps you draft, summarize, rewrite, and organize emails directly from your browser or a dedicated web dashboard.


---

## Table of Contents

- [Project Overview](#project-overview)  
- [Architecture & Flow](#architecture--flow)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  
- [Usage](#usage)  
- [Sample Screenshots](#sample-screenshots)  

---

## Project Overview

MailPilot helps users compose professional emails effortlessly. With just a single click users can generate reply mails maintaing the context of previous conversations. All powered by Gemini via a Spring Boot API.

---

## Architecture & Flow

1. **Utility-Client (Python)**  
   - Runs on each monitored machine (Windows/macOS/Linux).  
   - Collects system details (disk encryption, OS updates, antivirus status, sleep timeout).  
   - Detects changes and sends reports to backend API every 30 minutes.  

2. **Backend-Server (FastAPI + SQLite)**  
   - Accepts authenticated reports via REST API.  
   - Stores reports in SQLite database with timestamps.  
   - Provides endpoints to list machines and filter by OS and health status.

3. **Admin-Dashboard (React + MUI)**  
   - Fetches machine data from backend API.  
   - Displays machines in a sortable, paginated table.  
   - Filters machines by OS type and issue status (e.g., unencrypted disk, outdated OS).  
   - Highlights machines with potential issues for easy identification.

---

## Project Structure

```
/
├── utility-client/
│ └── sysutil.py # Python client utility for data collection and reporting
| └── requirements.txt
├── backend-server/
│ ├── main.py # FastAPI backend server
│ └── sysutil.db # SQLite database
  └── requirements.txt
├── admin-dashboard/
│ ├── src/
│ │ └── App.jsx # React admin dashboard component
│ ├── package.json # React project metadata & dependencies
│ └── ... # Other React files
├── README.md # Project documentation 
```
---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Mahadevan2005/Cross_Platform_System_Utility_Checker.git
```

### 2. Create & activate virtual environment
- #### Create Virtual Environment
```bash
python -m venv venv
```
- ### Activate virtual environment
For Linux/macOS:
```
source venv/bin/activate
```
For Windows:
```
venv\\Scripts\\activate
```
### 3. Install required backend package dependencies
```bash
pip install -r requirements.txt
```
### 4. In terminal move into the directory "/backend-server" and start the server
```bash
cd backend-server
uvicorn main:app --reload --port 8000
```
### 5. In terminal move into the directory "utility-client" and start the process
```bash
cd utility-client
python sysutil.py
```
### 6. In terminal move into the directory "admin-dashboard" and start the frontend server
```bash
cd admin-dashboard
npm install
npm run dev
```
---

## Usage

- The backend server receives and stores system reports securely using an API key.
- The client utility runs continuously on each endpoint machine.
- The frontend dashboard provides real-time insight with filtering options by OS and system health issues.
- Machines with issues (unencrypted disk, outdated OS, missing antivirus, or high inactivity timeout) are highlighted for easy identification.

---

## Sample Screenshots
![Admin Dashboard](https://github.com/user-attachments/assets/ae1bb7a3-ac53-4579-9e6b-da8abed5bbf1)


<h3 align="center">
Thank You ❤️
</h3>
