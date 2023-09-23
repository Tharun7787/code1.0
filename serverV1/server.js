const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/DigitalLog", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
phoneNo:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

const User=mongoose.model("User",userSchema)



  const router = express.Router();
  
  router.get("/login", (req, res) => {
    const str=User.find()
    .then(users => {
      console.log(users);
    })
    .catch(err => {
      console.error(err);
    });
    res.end(JSON.stringify(str));
  });
  
  router.post("/addLogin", (req, res) => {
    res.end("NA");
  });
  app.use("/",router)


PORT=4000 || process.env.PORT
app.listen(PORT,()=>{
    console.log(`server on ${PORT}`)
})
app.get("/",(req,res)=>{
    res.send("<h1>Hello server</h1>")
})