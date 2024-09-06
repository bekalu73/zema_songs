# Zema Songs

## Overview

**Zema Songs** is a modern song management application designed with a robust and scalable architecture. This project is divided into two main parts: the frontend and the backend.

### Frontend

- **Technology Stack**: React, TypeScript, Redux, Redux-Saga, Vite
- **Features**:
  - Responsive UI with React components
  - State management using Redux and Redux-Saga
  - Modern styling with Emotion and Styled System
  - TypeScript for type safety

- **Folder Structure**:
  - `src/`:
    - `apis/`: Contains API call functions
    - `assets/`: Static assets like images and icons
    - `components/`: Reusable UI components
    - `pages/`: Page-level components
    - `store/`: Redux slices, actions, reducers, and sagas
    - `styles/`: Global styles and theme configuration
    - `theme/`: Theme and design system
    - `App.tsx`: Main application component
    - `index.css`: Global styles
    - `main.tsx`: Application entry point
    - `router.tsx`: Application routing configuration
    - `vite-env.d.ts`: Vite environment types

### Backend

- **Technology Stack**: Node.js, Express.js, MongoDB
- **Features**:
  - RESTful API for song management
  - CRUD operations (Create, Read, Update, Delete)
  - Integration with MongoDB using Mongoose

- **Folder Structure**:
  - `controllers/`: Route handlers and business logic
  - `models/`: Mongoose models
  - `routes/`: API route definitions
  - `services/`: Service layer for business logic
  - `server.js`: Main application setup

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (or yarn)
- Docker (for containerized development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/zema-songs.git
   cd zema-songs
