const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  const str = [
    {
      name: "dummy",
      email: "dummy@gmail.com",
      password: "dummy@123",
    },
  ];
  res.end(JSON.stringify(str));
});

router.post("/addLogin", (req, res) => {
  res.end("NA");
});

module.exports = router;
