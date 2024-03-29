import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as notionController from "./controllers/notionController";

dotenv.config();

// App
const app = express();
const port = process.env.PORT;


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Get all pages
app.get("/daily-code/api/pages", notionController.getPages);

// Get random page
app.get("/daily-code/api/pages/random", notionController.getRandomPage);

// Get page by id
app.get("/daily-code/api/pages/:pageId", notionController.getPage);



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
