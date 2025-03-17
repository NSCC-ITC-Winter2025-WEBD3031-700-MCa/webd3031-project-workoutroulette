import 'dotenv/config'; // Loads API key from .env file
import fetch from 'node-fetch'; // Used to make requests to the API

const API_URL = 'https://api.api-ninjas.com/v1/exercises'; // The website URL for the exercises API
const API_KEY = process.env.API_NINJAS_KEY; // Get the API key from .env file

// Function to get exercises for a specific muscle
export async function getExercises(muscle) {
    try {
        // Make a request to the API to get exercises for the chosen muscle
        const response = await fetch(`${API_URL}?muscle=${muscle}`, {
            method: 'GET', // This is a GET request
            headers: { 'X-Api-Key': API_KEY } // Include the API key in the request
        });

        // If the request fails, show an error
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        // Convert the response to JSON (data)
        const data = await response.json();
        return data; // Return the list of exercises
    } catch (error) {
        // If there is an error, log it
        console.error('Failed to fetch exercises:', error);
        return null; // Return null if there was an error
    }
}
