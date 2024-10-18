
This is a weather application built using a Flask backend and a React.js frontend. The app fetches real-time weather data using the OpenWeatherMap API, allowing users to get the weather for their current location or a city they input.
Features
- Geolocation-based weather detection
- City-based weather search
- Dynamic weather advice based on temperature
- Background changes depending on weather conditions (e.g., sunny, rainy, cloudy)
- Search history for the last 5 cities
Requirements
1. Python (for running the Flask backend)
2. Node.js (for running the React frontend)
Setup and Installation
Step 1: Clone the Repository
git clone https://github.com/your-username/weather-backend
Step 2: Navigate to the Project Directory
cd weather-app
Running the Backend (Flask)
Step 1: Install Dependencies
pip install Flask Flask-Cors requests python-dotenv
Step 2: Run the Flask Backend
Since the API key is already included in the code, you can simply run the Flask backend by executing:
```bash
python app.py
```
The backend server should start at `http://localhost:5000`.
Running the Frontend (React)
Step 1: Navigate to the Frontend Directory
cd weather-frontend
Step 2: Install Node.js Dependencies
npm install
Step 3: Run the React App
Start the React frontend by running:
```bash
npm start
```
The React app will be available at `http://localhost:3000`.
API Key Information
The OpenWeatherMap API key is already provided within the project for convenience:

- **API Key**: `56059bd48eef1f4d5c33e1075b8064ee`

You don't need to sign up for a new API key unless you'd like to use your own. If you do want to use a different key, simply replace the API key in the `app.py` file.
Notes
- **Flask** runs the backend API for fetching weather data.
- **React.js** powers the frontend for user interaction.
- The app dynamically changes the background based on weather conditions (sunny, rainy, cloudy).
- **Geolocation** detects the user's current location and provides weather information.




