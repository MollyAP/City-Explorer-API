class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  
    getDescription() {
      return this.description;
    }
  
    getDate() {
      return this.date;
    }
  }
  
  module.exports = Forecast;  
