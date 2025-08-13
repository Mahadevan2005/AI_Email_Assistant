# MailPilot 

**MailPilot** is a **smart email assistant** that works as both a **web app** and a **Chrome extension**, powered by **Spring Boot** and **Google Gemini API**. It helps you draft, summarize, rewrite, and organize emails directly from your browser or a dedicated web dashboard.


---

## Table of Contents

- [Project Overview](#project-overview)  
- [Architecture & Flow](#architecture--flow)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  
- [Live in action](#live-in-action)  
- [Sample Screenshots](#sample-screenshots)  

---

## Project Overview

MailPilot helps users compose professional emails effortlessly. With just a single click users can generate reply mails maintaing the context of previous conversations. All powered by Gemini via a Spring Boot API.

---

## Architecture & Flow

1. **E-mail-Assistant-Extension**  
   - Integrates directly with Gmail service in the browser.  
   - Captures email content and sends it to the backend for processing.  
   - Generates reply directly in the email composer.

2. **Email-Assistant (Spring Boot + Gemini API)**  
   - Exposes REST API endpoints for email drafting, summarization, and rewriting.  
   - Handles communication with the Gemini API.  
   - Manages request validation, security, and rate-limiting.

3. **Email-Assistant-React**  
   - Allows users to access MailPilot from any browser without installing the extension.  
   - Provides customization for tone and generate replies.

---

## Project Structure

```
/
├── Email-Assistant/
│ ├── src/main/java/... # Spring Boot API code
│ ├── pom.xml # Maven dependencies
│ └── mvnw # Maven wrapper
├── Email-Assistant-React/
│ ├── src/
│ │ └── App.jsx # React main component
│ ├── package.json
│ └── ...
├── Email-Assistant-Extension/
│ ├── manifest.json # Chrome extension configuration
│ ├── content.js # Injected scripts for Gmail
├── README.md
```
---

## Installation & Setup

### 1. Clone the repository
```bash
git clone git clone https://github.com/Mahadevan2005/AI_Email_Assistant.git
```

### 2. Backend Setup (Spring Boot)

```bash
cd Email-Assistant
chmod +x mvnw  # On Mac/Linux, make Maven wrapper executable
./mvnw clean package -DskipTests
java -jar target/*.jar

# By default backend will run at
http://localhost:8080
```

### 3. Frontend Setup (React)
```bash
cd Email-Assistant-React
npm install
npm run dev

# By default frontend will run at
http://localhost:5173
```

### 4. Chrome Extension Setup
- Go to chrome://extensions/ in Chrome.
- Enable Developer Mode (top right). 
- Click Load unpacked and select the /Email-Assistant-Extension folder.
- The extension should now appear in your Chrome toolbar.
---

## Usage

### Via Web App
- Open the frontend in your browser, type your prompt, and instantly get AI-powered email drafts.
### Via Chrome Extension
- Open Gmail, start composing a reply the "AI Reply" button appears, just click and get your reply content.

---

## Live in Action
[![Watch the demo]()](https://drive.google.com/file/d/1ca6-bRpfpQjxIedjWZec6mUDAj2MrF6k/view?usp=sharing)

<h3 align="center">
Thank You ❤️
</h3>
