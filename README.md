# 🎓 College Complaint Management System

> A modern, secure, and transparent way to turn campus problems into resolved outcomes.

A full-stack complaint management platform for colleges and universities. Students can report issues in seconds and track progress in real time, while administrators can triage complaints, manage users, and monitor resolution trends from one central dashboard.

[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](#-technology-stack)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](#-technology-stack)
[![Database](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)](#-technology-stack)
[![License](https://img.shields.io/badge/license-not%20declared-lightgrey)](#-license)

## 🌟 Why This Project?

Campus complaints often get lost in messages, paper forms, or disconnected spreadsheets. This system creates a single source of truth where every complaint has an owner, a status, a history, and a clear path to resolution.

- 📣 **Students are heard** with an accessible digital reporting workflow.
- 🔎 **Administrators stay organized** with search, filters, and actionable dashboards.
- 📈 **Institutions make better decisions** using complaint trends and analytics.
- 🤝 **Everyone sees progress** through transparent statuses and resolution remarks.

## ✨ Highlights

- Role-based authentication for students and administrators
- Student dashboard with complaint summaries and recent activity
- Complaint submission with category, priority, description, and PDF attachments
- Complaint lifecycle tracking: **Pending**, **In Progress**, **Resolved**, and **Rejected**
- Administrator tools for searching, filtering, reviewing, and updating complaints
- Student management and profile management
- Reports and analytics with interactive charts
- Responsive glassmorphic interface
- Dark and light themes
- JWT-based protected API routes

## 🧩 Core Modules

| Module | What it provides |
| --- | --- |
| 🔐 Authentication | Registration, login, role-based access, password recovery, and protected routes |
| 📝 Complaint reporting | Structured forms with category, priority, description, and PDF attachments |
| 🎒 Student portal | Dashboard, complaint history, details, status tracking, and profile settings |
| 🛠️ Admin portal | Complaint triage, status updates, student management, and administrator profile |
| 📊 Reports | Interactive charts for understanding department and status trends |
| 🎨 Experience | Responsive glassmorphic UI, dark/light themes, animations, and mobile support |

## 🔄 Complaint Lifecycle

```text
📝 Submitted → ⏳ Pending → 🔧 In Progress → ✅ Resolved
                                  └──────────→ 🚫 Rejected
```

## 👥 Screens and User Flows

### 🎒 Students

1. Register or sign in as a student.
2. Submit a complaint with its department/category, priority, description, and optional PDF files.
3. View all submitted complaints and open individual complaint details.
4. Follow status changes and administrator comments.
5. Manage profile information and preferences.

### 🛡️ Administrators

1. Sign in with an administrator account.
2. Review dashboard totals and recent complaints.
3. Search and filter complaints by status or student.
4. Open complaint details and change their status.
5. Manage registered students.
6. Review department and status trends in Reports.

## 🛠️ Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, React Router, Vite |
| Styling | Tailwind CSS, Headless UI |
| Icons and charts | Heroicons, Recharts |
| HTTP client | Axios |
| Backend | Node.js, Express |
| Authentication | JSON Web Tokens, bcryptjs |
| Database | MongoDB with Mongoose |
| Uploads and email | Multer, Nodemailer |

## 🗂️ Project Structure

```text
.
├── client/                 # React/Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Authentication and app context
│   │   ├── layouts/        # Shared dashboard layouts
│   │   ├── pages/          # Student, admin, and shared screens
│   │   └── services/       # API client
│   └── vercel.json         # SPA routing fallback for Vercel
├── server/                 # Express REST API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth and error middleware
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
│   └── uploads/            # Local uploaded files
└── README.md
```

## ✅ Prerequisites

- Node.js 18 or newer
- npm
- MongoDB locally, or a MongoDB Atlas cluster

## 🚀 Run Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/sreenivas-02/complaint-management-system.git
cd complaint-management-system

cd server
npm install
cd ../client
npm install
```

### ⚙️ Configure the backend

Create `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/complaint_management
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
cd server
npm start
```

The API runs at `http://localhost:5000`.

### 💻 Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

During development, Vite proxies `/api` requests to `http://127.0.0.1:5000`. To use a different API URL, set `VITE_API_PROXY_TARGET` before starting Vite.

## 📦 Available Scripts

### Client (`client/`)

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

### Server (`server/`)

```bash
npm run dev       # Start with Nodemon
npm start         # Start the production server
```

## 🔌 API Overview

All API endpoints are prefixed with `/api`.

| Area | Endpoints |
| --- | --- |
| Health | `GET /api/health` |
| Authentication | `/api/auth/*` |
| Student complaints | `/api/complaints/*` |
| Administrator operations | `/api/admin/*` |
| Uploaded files | `/api/uploads/*` |

Protected endpoints expect a bearer token:

```http
Authorization: Bearer <jwt-token>
```

## ☁️ Production Deployment

The application is deployed as separate frontend and backend services.

### 1. 🗄️ MongoDB Atlas

Create a MongoDB Atlas cluster, allow the backend service to connect, and copy its connection string.

### 2. ⚡ Deploy the backend on Render

Create a Render Web Service connected to this repository:

- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** `npm start`

Set these environment variables:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/complaint_management
JWT_SECRET=<long-random-production-secret>
NODE_ENV=production
CLIENT_URL=https://<your-frontend-domain>
```

Verify the deployment at:

```text
https://<your-backend-domain>/api/health
```

### 3. 🌐 Deploy the frontend on Vercel

Import the repository into Vercel with:

- **Root directory:** `client`
- **Build command:** `npm run build`
- **Output directory:** `dist`

Set:

```env
VITE_API_URL=https://<your-backend-domain>/api
```

Redeploy after saving the variable. `client/vercel.json` keeps direct visits to React routes working.

### ⚠️ File storage warning

The current upload implementation stores files on the server filesystem. Some hosting platforms use ephemeral filesystems, so uploaded PDFs may be lost after a restart or redeploy. For production, replace local storage with an object-storage provider such as S3, Cloudinary, or Supabase Storage.

## 🔒 Security Notes

- Never commit `.env` files or production secrets.
- Use a unique, high-entropy `JWT_SECRET` in production.
- Restrict MongoDB Atlas network access to trusted services where possible.
- Set `CLIENT_URL` to the exact frontend origin in production.
- Add persistent, private file storage before using uploads with real user data.

## 🧯 Troubleshooting

### The frontend shows network errors

Check that the backend is running and that `VITE_API_URL` points to the backend URL including `/api`.

### Login works locally but not after deployment

Confirm that `CLIENT_URL` matches the deployed frontend URL and that `JWT_SECRET` is configured on the backend.

### The API cannot connect to MongoDB

Check `MONGO_URI`, MongoDB Atlas credentials, and the Atlas network access/IP allowlist.

### Refreshing a nested frontend route returns 404

Confirm that the Vercel project root is `client` and that `client/vercel.json` is included in the deployment.

## 🤝 Contributing

1. Create a feature branch.
2. Make focused changes and test them locally.
3. Keep secrets and generated files out of commits.
4. Open a pull request with a clear description of the change.

## 📄 License

This project does not currently declare a software license. Add a `LICENSE` file before distributing it for reuse.
