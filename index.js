import express from "express";
import roomRoutes from "./src/routes/roomRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();


app.use(express.json());
app.use("/rooms", roomRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
