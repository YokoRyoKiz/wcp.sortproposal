import { Client } from "@notionhq/client";

export async function handler() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const dbId = process.env.NOTION_DB_ID;

  try {
    const response = await notion.databases.query({ database_id: dbId });
    const items = response.results.map(page => ({
      id: page.id,
      title: page.properties["タイトル"].title[0]?.plain_text || "無題",
      url: page.properties["URL"].url || ""
    }));
    return { statusCode: 200, body: JSON.stringify(items) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
