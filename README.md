# 🧠 AI-Based Personal Task Management Assistant

A **full-stack MERN (MongoDB, Express.js, React.js, Node.js) application** that helps users efficiently manage their tasks with AI-enhanced features like natural language task creation and smart reminders. Built with a role-based access system, this assistant aims to boost productivity with a clean and responsive UI.

---

## Features
- **Role-Based Authentication**: Admins can manage all tasks; users can create and view their own tasks.
- **Natural Language Input** *(Planned)*: AI-powered task creation by typing instructions like “Remind me to submit the report at 5 PM”.
- **Smart Suggestions** *(Planned)*: Personalized reminders and scheduling assistance using AI models.
- **Interactive UI**: Built with React and Tailwind CSS to ensure a responsive and modern experience.
- **RESTful API Integration**: Full CRUD operations for task management.
- **JWT Security**: Secure session handling with JSON Web Tokens.

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router, React Icons, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **API Handling**: Axios
- **AI (Planned)**: OpenAI API / NLP.js / Rasa

---

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ai-task-assistant
   cd ai-task-assistant
2. Install dependencies for both frontend and backend:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Create a **.env** file in the server directory and add the necessary environment variables (e.g., MongoDB URI, JWT Secret).
4. Start the development server:
   ```sh
   cd server
   npm start
   ```
   In a separate terminal:
   ```sh
   cd client
   npm run dev
   ```


##Future Enhancements
- Add calendar synchronization (Google Calendar, Outlook).
- Implement smart scheduling, reminders, and productivity reports.
- Voice command support for hands-free task input.
- Advanced filters and sorting in the dashboard.
