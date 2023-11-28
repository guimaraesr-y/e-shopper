import app from "./app";

import { config as dotenv } from "dotenv-safe";
dotenv();

app.listen(process.env.PORT || 3000, () => {
    console.log(`[+] Listening on port ${process.env.PORT || 3000}`);
})