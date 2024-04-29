import { initServer } from "./app";

async function initApp() {
  try {
    const app = await initServer();
    app.listen(3000, () => {
      console.log("Server Initialized");
    });
  } catch(e: any) {
    console.log(e.message, " message is not coming");
  }
}

initApp();