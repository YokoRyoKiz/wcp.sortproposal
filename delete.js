import { Client } from "@notionhq/client";

export async function handler(event) {
  const { id } = JSON.parse(event.body);
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  try {
    await notion.pages.update({ page_id: id, archived: true });
    return { statusCode: 200, body: "Deleted" };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
