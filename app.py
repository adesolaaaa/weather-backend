from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from environment variables
API_KEY = os.getenv('OPENWEATHERMAP_API_KEY') 

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if city:
        #current weather by city
        weather_url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
        print(f"Fetching weather data for city: {city}")
        response = requests.get(weather_url)
        if response.status_code == 200:
            weather_data = response.json()
            lat = weather_data['coord']['lat']
            lon = weather_data['coord']['lon']
        else:
            return jsonify({'error': 'City not found'}), 404
    elif lat and lon:
        lat = float(lat)
        lon = float(lon)
        print(f"Fetching weather data for coordinates: {lat}, {lon}")
        weather_url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
        response = requests.get(weather_url)
        if response.status_code != 200:
            return jsonify({'error': 'Could not fetch weather data'}), 500
    else:
        return jsonify({'error': 'City or coordinates not provided'}), 400

    weather_data = response.json()
    return jsonify({
        'city': weather_data['name'],
        'temperature': weather_data['main']['temp'],
        'description': weather_data['weather'][0]['description'],
        'icon': weather_data['weather'][0]['icon'],
    })

if __name__ == '__main__':
    app.run(debug=True)
