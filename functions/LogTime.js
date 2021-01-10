class LogTime {
    static start = 0;
    static end = 0;
  
    static setStart = () => {
      this.start = new Date().getTime();
    };
    static setEnd = () => {
      this.end = new Date().getTime();
    };

    static setStartMiddleware = (req, res, next) => {
        this.start = new Date().getTime();
        next();
    };
    static setEndMiddleware = (req, res, next) => {
        this.end = new Date().getTime();
        next();
    };
  
    static getStart = () => {
      return this.start;
    };
  
    static getEnd = () => {
      return this.end;
    };
  
    static getResult = (obj = {}) => {
      if (obj.seconds) {
        return (this.end - this.start) / 1000;
      }
      return this.end - this.start;
    };
  }
  
  module.exports.LogTime = LogTime;
  