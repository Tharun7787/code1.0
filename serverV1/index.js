// const express = require("express");
// const bodyParser = require("body-parser");
// const routesHandler = require("./routes/handler.js");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("/", routesHandler);

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
// const app = express();
// const port = 4000; // Adjust this to match your server port

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

// // Your API routes and other middleware here...

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const routesHandler = require("./routes/handler.js");
const cors = require("cors"); // Import the cors middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use("/", routesHandler);

app.post("/signin", async (req, res) => {
  try {
    const { name, phoneNo, email, password } = req.body;
    console.log(name);
    console.log(phoneNo);
    console.log(email);
    console.log(password);

    if (!name || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
