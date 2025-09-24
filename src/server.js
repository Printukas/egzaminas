import app from "./app.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveris paleistas http://localhost:${PORT}`);
});
