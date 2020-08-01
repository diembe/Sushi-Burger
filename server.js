// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// =============================================================
var Tables = [
  {
    routeName:"TEST",
    ID: "007",
    Name: "Billy Jean",
    Email: "mj@neverland.com",
    Phone: "911",
  }
];

var Waitlist = [
  {
    routeName:"",
    ID: "",
    Name: "",
    Email: "",
    Phone: "",
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/HTML/home.html"));
});
// Route to a page where the user can book a new reservation.
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "/HTML/make.html"));
});
// Route to a page with a list of current reservations and the waitlist.
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/HTML/view.html"));
});

// Displays all reservations
app.get("/api/Tables", function(req, res) {
  return res.json(Tables);
});

// Displays a single table, or returns false
app.get("/api/Tables/:Table", function(req, res) {
  var chosen = req.params.Table;

  console.log(chosen);

  for (var i = 0; i < Tables.length; i++) {
    if (chosen === Tables[i].routeName) {
      return res.json(Tables[i]);
    }
  }

  return res.json(false);
});

app.get("/api/Tables/:Waitlist", function(req, res) {
  var chosen = req.params.Waitlist;

  console.log(chosen);

  for (var i = 0; i < Waitlist.length; i++) {
    if (chosen === Waitlist[i].routeName) {
      return res.json(Waitlist[i]);
    }
  }

  return res.json(false);
});

// Create New table reservations - takes in JSON input
app.post("/api/Tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTables = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  newTables.routeName = newTables.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTables);

  Tables.push(newTables);

  res.json(newTables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
