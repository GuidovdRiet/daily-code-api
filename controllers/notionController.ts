import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  NOTION_CELL_VALUES,
  NOTION_COLUMNS,
} from "./constants/notion.constants";

dotenv.config();

const notionClient = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID;
// rtest
/**
 * Get all the pages of a given database id
 * Docs: https://developers.notion.com/reference/post-database-query
 */
export async function getPages(_: Request, res: Response) {
  if (!databaseId) return;

  const pages = await notionClient.databases
    .query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: NOTION_COLUMNS.STATUS,
            status: {
              equals: NOTION_CELL_VALUES.NOT_SENT,
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: "last_edited_time",
          direction: "ascending",
        },
      ],
    })
    .catch((err) => {
      res.status(404).json({ error: `❌ ${err.message}` });
    });

  if (pages) {
    res.status(200).json(pages);
  }
}

export async function getPage(pageId: string) {
  return;
}
