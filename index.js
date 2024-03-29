const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config()
const port = process.env.PORT || 3000

mongoose
    .connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true, useUnifiedTopology: true
        }
    )
    .then(() => console.log("DBConnection"))
    .catch((err) => {
        console.log(err);
    });


//middelware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use('/', (req, res) => {
    res.status(200).json("Hello world");
})
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
    console.log("hi...")
})