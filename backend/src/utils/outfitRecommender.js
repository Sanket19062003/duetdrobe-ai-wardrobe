const axios = require('axios');

class OutfitRecommender {
  constructor() {
    this.colorCompatibility = {
      'blue': ['white', 'black', 'gray', 'brown', 'navy'],
      'black': ['white', 'gray', 'red', 'pink', 'blue', 'green'],
      'white': ['black', 'blue', 'red', 'green', 'gray', 'brown'],
      'red': ['black', 'white', 'gray', 'blue'],
      'green': ['black', 'white', 'brown', 'gray'],
      'brown': ['white', 'black', 'blue', 'green'],
      'gray': ['black', 'white', 'blue', 'red', 'green'],
      'pink': ['black', 'white', 'gray', 'navy']
    };
  }

  // Get weather data for location
  async getWeatherData(city) {
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        console.log('No OpenWeather API key found, skipping weather data');
        return null;
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Weather API error:', error.message);
      return null;
    }
  }

  // Determine season based on weather
  getSeasonFromWeather(weather) {
    if (!weather) return 'all';
    
    const temp = weather.main.temp;
    const month = new Date().getMonth();
    
    if (temp < 10) return 'winter';
    if (temp > 25) return 'summer';
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 8 && month <= 10) return 'fall';
    return 'all';
  }

  // Find compatible items
  findCompatibleItems(wardrobe, baseItem, maxItems = 3) {
    const compatible = [];
    const baseColor = baseItem.color.toLowerCase();
    const compatibleColors = this.colorCompatibility[baseColor] || [];

    wardrobe.forEach(item => {
      if (item._id.toString() === baseItem._id.toString()) return;
      
      const itemColor = item.color.toLowerCase();
      const isCompatible = compatibleColors.includes(itemColor) || 
                          baseColor === itemColor ||
                          itemColor === 'black' || 
                          itemColor === 'white';

      if (isCompatible && item.category !== baseItem.category) {
        compatible.push(item);
      }
    });

    return compatible.slice(0, maxItems);
  }

  // Generate outfit recommendations
  async generateOutfits(wardrobe, city = 'Mumbai') {
    if (wardrobe.length < 2) {
      return { message: 'Need at least 2 items for outfit suggestions' };
    }

    const weather = await this.getWeatherData(city);
    const season = this.getSeasonFromWeather(weather);
    
    const outfits = [];
    const tops = wardrobe.filter(item => item.category === 'top');
    const bottoms = wardrobe.filter(item => item.category === 'bottom');
    const dresses = wardrobe.filter(item => item.category === 'dress');

    // Generate top + bottom combinations
    tops.forEach(top => {
      const compatibleBottoms = this.findCompatibleItems(bottoms, top);
      compatibleBottoms.forEach(bottom => {
        outfits.push({
          id: `${top._id}-${bottom._id}`,
          top: top,
          bottom: bottom,
          season: season,
          weather: weather ? `${weather.main.temp}°C, ${weather.weather[0].description}` : 'Weather unavailable'
        });
      });
    });

    // Add dresses
    dresses.forEach(dress => {
      outfits.push({
        id: `${dress._id}-dress`,
        dress: dress,
        season: season,
        weather: weather ? `${weather.main.temp}°C, ${weather.weather[0].description}` : 'Weather unavailable'
      });
    });

    return {
      outfits: outfits.slice(0, 10), // Limit to 10 outfits
      weather: weather,
      season: season
    };
  }
}

module.exports = OutfitRecommender;