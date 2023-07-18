import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as notionController from "./controllers/notionController";

dotenv.config();

// App
const app = express();
const port = process.env.PORT;

/**
 * Returns Daily Codes
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/**
 * Returns Daily Codes
 */
app.get("/daily-code/api/pages/:pageId", notionController.getPage);
app.get("/daily-code/api/pages", notionController.getPages);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
