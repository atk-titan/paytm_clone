const express = require("express");
const mainRouter = require("./routes/index")
const PORT=3000;
const cors = require("cors");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(PORT,()=>{
    console.log(`server starting on http://localhost:${PORT}`);
})