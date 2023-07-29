# Quiz App

A full stack quiz web app for creating, editing and taking quizzes. Users can use voice commands to control the flow of the quiz.

## Live Demonstration
[Quiz App](https://quizapp.fly.dev/)

## Motivation

While studying for a Japanese exam I realized that it would be helpful to be able to test myself on questions from the exam while doing something else, such as housework. My solution was to build a web app that would allow users to take a quiz using their voice.

## Screenshots
![Quiz App Screenshot](https://findrob.netlify.app/assets/quizScreen-84fc2e92.webp)

## Tech/ Framework
[React](https://react.dev/)
[Redux Toolkit](https://redux-toolkit.js.org/)
[Node](https://nodejs.org/)
[MongoDB](https://www.mongodb.com/)
[react-speech-recognition](https://github.com/JamesBrill/react-speech-recognition)

## Features
Users can:
- Take multiple choice quizzes, either by using on-screen controls or voice (currently only supported in Chrome-based browsers)
- View quizzes created by specific users
- Leave comments on quizzes
- Create a personal account to login for access to the following features:
- Create, edit and delete quizzes
- Add quizzes to and remove quizzes from list of 'liked' quizzes

## Installation

To run this project locally, please follow these steps:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/hummus-erectus/fullstack-quiz.git
```
2. Navigate to the backend directory:
```bash
cd backend
```
3. Install the backend dependencies by running the following command:

```bash
npm install
```
4. Once the backend dependencies are installed, start the backend server using the following command:
```bash
npm start
```
This will start the backend server, allowing the frontend and backend to communicate.

5. Now, open a new terminal window or tab, navigate to the frontend directory:
```bash
cd ../frontend
```
6. Install the frontend dependencies by running the following command:
```bash
npm install
```
7.After the frontend dependencies are installed, start the frontend server using the following command:
```bash
npm start
```
This will start the development server for the frontend application.

8. Once both the frontend and backend servers are running, you can access the application by opening your browser and navigating to http://localhost:3000/ (or the configured address).

9. Note that you will need to configure the backend to connect to your own MongoDB instance.