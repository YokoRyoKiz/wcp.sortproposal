import { Client } from "@notionhq/client";

export async function handler(event) {
  const { title, url } = JSON.parse(event.body);
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const dbId = process.env.NOTION_DB_ID;

  try {
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        "タイトル": { title: [{ text: { content: title } }] },
        "URL": { url }
      }
    });
    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}

