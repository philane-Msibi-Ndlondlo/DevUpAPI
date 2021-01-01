const express = require('express');
const cors = require("cors");
const volleyball = require("volleyball");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 1337;

dotenv.config();

mongoose.connect("mongodb://localhost:27017/devUpDB", { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if ( err ) return console.log(err);
    console.log("DB Connected");
})

app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const meetingsRouter = require("./routes/meetings");
const projectsRouter = require("./routes/projects");
const innovationsRouter = require("./routes/innovation");

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/meetings", meetingsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/innovations", innovationsRouter);


app.get('/', (req, res) => {
    res.json({ greeting: "www" });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
