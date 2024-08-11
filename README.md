# To-Do List Manager

A simple To-Do List Manager built using React (with Vite) for the frontend and Node.js with Express for the backend. This application allows users to add tasks, mark them as completed, delete tasks, and provides an undo functionality for accidental deletions.

## Features
- **Add Tasks**: Users can add new tasks with a description and optional due date and tags.
- **Mark as Completed**: Tasks can be marked as completed.
- **Delete Tasks**: Tasks can be deleted from the list.
- **Undo Deletion**: Recently deleted tasks can be restored with an undo feature.
- **Filter Tasks**: Users can filter tasks based on their completion status.

## Tech Stack
- **Frontend**: React.js (using Vite for development)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Bootstrap

## API Endpoints
Task Endpoints
- GET /api/tasks: Retrieve all tasks (excluding deleted tasks).
- POST /api/tasks: Create a new task.
- PUT /api/tasks/
: Update an existing task.
- DELETE /api/tasks/
: Soft delete a task.
- POST /api/tasks/undo/
: Undo the deletion of a task.
