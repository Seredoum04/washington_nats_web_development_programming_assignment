# How to Run Page & How I worked on the assignment

## Requirements
- Node.js (v18 or newer)
- npm (v9 or newer)
- Backend: SQLite
- Git LFS (for images)

## Setup

1. Clone the repository:

git clone https://github.com/Seredoum04/washington_nats_web_development_programming_assignment.git

cd washington_nats_web_development_programming_assignment 

2. Install dependencies for frontend and backend:

cd frontend
npm install

cd ../backend
npm install


3. Run the backend server:

cd backend
node server.js


4. Run the frontend:
cd frontend
npm start

5. Open browser at http://localhost:3001

## How I worked on the project



#### 1. Overall development process
For this project, I aimed to create a web application summarizing MLB 2025 pitching data by player. I followed an **iterative development process**, starting with planning the data model and API endpoints for the backend, then designing React components for the frontend.  

**Design decisions:**  
- I chose **React** for the frontend to quickly create reusable UI components, including the pitcher select dropdown and summary table.  
- **Node.js** and **Express** were used for the backend because of familiarity and simplicity in serving API endpoints.  
- SQLite was selected as the database for simplicity and portability.  

**Packages and technologies:**  
- **Axios** for HTTP requests between frontend and backend  
- **React Hooks** (`useState`, `useEffect`) for state management  
- **Git/GitHub** for version control  
- **Git LFS** for storing large image assets  

These choices were made based on familiarity, ease of integration, and project requirements.

---

#### 2. Experience with packages/frameworks/languages
Most technologies used were familiar, such as JavaScript, React, Node.js, and SQL. I have previously used React in academic projects, which made component-based development more efficient. I learned Git LFS specifically for this project to handle large media files like images.

---

#### 3. Use of AI tools
I used **Copilot** to help:
- Write clean CSS/SCSS for page styling  
- Debug git and Git LFS workflow issues  

**Effective prompts included:**  
- "Write SCSS for a page with a blue, red, and white theme with a logo in the corner."  

---

### Appendix
**Sample AI prompts used:**  
1. "Make the home page look nicer with red, white, and blue theme and include `nats_logo.png` in the corner."  
2. "Write step-by-step instructions for using Git LFS to handle images and push to GitHub."  

---

## **Step 4 — Include everything for submission**
- **Code** (`frontend/` and `backend/`)  
- **.git folder** (version control)  
- **Images** (tracked with Git LFS)  
- **README_RUN.md** with instructions  
- **Write-up PDF** (you can convert your write-up with Word, Google Docs, or Markdown → PDF)  
- **Screenshots** if needed  

---

## **Step 5 — Zip everything**
1. Stop all servers (backend/frontend).  
2. Open PowerShell in your project root.  
3. Run:

```powershell
Compress-Archive -Path .\* -DestinationPath ..\washington_nats_project.zip -Force -Exclude "backend\pitches.db"

