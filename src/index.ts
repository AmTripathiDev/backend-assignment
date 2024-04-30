import { initServer } from "./app";
import dotenv from 'dotenv';
dotenv.config();
async function initApp() {
  try {
    const app = await initServer();
    app.listen(8000, () => {
      console.log("Server Initialized");
    });
  } catch(e: any) {
    console.log(e.message, " message is not coming");
  }
}

initApp();