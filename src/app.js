/*Run the following command for setting up nodemon to restart whenever files with specified extensions are changed/saved.
command to run on terminal: nodemon src/app.js -e js,hbs
*/

const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/util");

// Importing the express npm package
const express = require("express");
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

// Storing the express function in an const
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setting up hanldle bars
app.set("view engine", "hbs");

// Customizing the path for the handle bars to look for view(Dynamic )
app.set("views", viewPath);

// Setting up the path for express to look for static files to serve.
app.use(express.static(publicDirectoryPath));

// Registering Partials
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    Name: "Mohit Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    Name: "Mohit Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    Name: "Mohit Sharma",
  });
});

// Query String(The query is written after the ? in the url. Most probably, query is written in Key, Value Pair)

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide search value",
    });
  }

  res.send({
    products: [],
  });
});

// Below function decides what to send back when user requests something may be at a specified URL.
// app.get("", (req, res) => {
//   //   res.send("Hello Express!");
// res.send(`<h1 style="color: cyan;">Hello Express!</h1>`);
// });

// app.get("/help", (req, res) => {
//   //   res.send("Help Page.");
//   //   res.send({
//   //     Name: "Mohit Sharma",
//   //     Age: 21,
//   //   });
//   // Whenever we pass an object, it will automatically get converted into JSON using the JSON.stringify(object) in the backend.
//   res.send([{ Name: "Mohit" }, { Name: "Rohit" }]);
// });

// app.com
// app.com/help
// app.com/about

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
Challenge1:

1. Setup an about route and render a page title.
2. Setup a weather route and render a page title.
3. Test your work by visiting both in the browser.
*/

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address!",
    });
  }

  geocode.mapBox(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      geocode.weatherAPI(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          address: req.query.address,
          location,
          forecast,
        });
      });
    }
  );
});

/* 
Challenge2:

1. Create a html page for about with "About" title.
2. Create a html page for help with "Help" title.
3. Remove/Comment the old route handlers for both.
4. Visit both in the browser to test your work.
*/

/* 
Challenge3:

1. Setup the template for the footer partial "Created by Some Name"
2. Render the partial at the bottom of all three pages.
3. Test your work by visiting all three pages.
*/

/* 
Challenge4:
Goal: Create and render a 404 page with handlebars.

1. SetUp the template to render the header and footer.
2. SetUp the template to render an error message in a paragraph.
3. Render the template for both 404 routes:
      - Page not found
      - Help Article not found.
4. Test your work. Visit /what and /help/units.
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404",
    errorMessage: "Help Article not found.",
    Name: "Mohit Sharma",
  });
});

// Adding handler which manages a request which is not available to serve

app.get("*", (req, res) => {
  // res.send("My 404 Page");
  res.render("404Page", {
    title: "404",
    errorMessage: "Page not found",
    Name: "Mohit Sharma",
  });
});

// To start the server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
