//dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//asks express to create a route for every file in the public folder and use the '/' route.
app.use(express.static("public"));
//sets up express app to handle the parsing data e.g middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//starts the server, also known as an app listener
app.listen(PORT, () => {
  console.log(`Your server is available at http://localhost:${PORT}`);
});
