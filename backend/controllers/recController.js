const { PythonShell } = require('python-shell');


const generateRecommendations = (userPreferences, restaurantData) => {
  return new Promise((resolve, reject) => {
    // Execute Python script to generate recommendations

    const options = {
      scriptPath: 'C:\\Users\\Polina\\Desktop\\FinalProject\\honours\\backend\\recommendations',
      args: [JSON.stringify(userPreferences), JSON.stringify(restaurantData)],
      pythonOptions: ['-u'],
    }
    PythonShell.run('recommend.py', options, (err, results) => {
      if (err) {
        console.error('Error executing Python script:', err);
        reject(err);
      } else {
        const recommendations = JSON.parse(results[0]);
        console.log('Recommendations controller:', recommendations);
        resolve(recommendations);
      }
    });
  });
};

module.exports = { generateRecommendations };