//log Middle ware

const logData = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} , Request to ${req.originalUrl}`);
  next();
};



module.exports = logData;
