const redis = require("redis");

const client = redis.createClient(6379);
client.on("error", (err) => {
  console.log("REDIS INIT ERROR:", err);
});

const checkCache = (req, res, next) => {
  let search = req.params.search;
  client.get(search, (err, data) => {
    if (err) throw err;
    if (!data) {
      return next();
    } else {
      return res.json({ data: JSON.parse(data), info: "data from cache" });
    }
  });
};

module.exports = {
  client, checkCache
}