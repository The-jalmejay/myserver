express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Contorl-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
var port = process.env.port || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port} !`));
let axios = require("axios");

app.post("/myserver", async function (req, res) {
  let rep = req.body;
  // console.log(req);
  let { data = {}, method, fetchUrl } = rep;
  if (method === "GET") {
    try {
      let response = await axios.get(fetchUrl);
      // console.log(response.data);
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("error",status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  } else if (method === "POST") {
    try {
      let body = data;
      console.log(body);
      let response = await axios.post(fetchUrl, body);
      console.log("resp",response.data);
      res.send(response.data);
    } catch (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log("Error", status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(error);
    }
  }
});
