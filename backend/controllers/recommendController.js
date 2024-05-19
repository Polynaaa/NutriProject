const { spawn } = require('child_process');

const generateRestRecommendations = (userPreferences, restaurantData) => {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = 'C:/Users/Polina/Desktop/FinalProject/honours/backend/recommendations/recommend.py';
        const pythonProcess = spawn('python', [pythonScriptPath, JSON.stringify(userPreferences), JSON.stringify(restaurantData)]);
        let recommendations = '';
        pythonProcess.stdout.on('data', (data) => {
            recommendations += data.toString(); 
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error executing Python script: ${data}`);
            reject(data);
        });
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(recommendations);
            } else {
                console.error(`Python script exited with code ${code}`);
                reject(`Python script exited with code ${code}`);
            }
        });
    });
};

module.exports = { generateRestRecommendations };
