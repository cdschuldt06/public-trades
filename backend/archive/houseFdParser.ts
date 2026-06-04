import * as fs from "fs";
import * as cheerio from "cheerio";

export type RawGovTrade = {
  politicianName: string;
  ticker: string;
  transactionType: string;
  amountMin: number;
  amountMax: number;
  transactionDate: Date;
  disclosureDate: Date;
};

function parseAmount(range: string) {
  const cleaned = range.replace(/\$/g, "").replace(/,/g, "");
  const [min, max] = cleaned.split("-").map((x) => Number(x.trim()));
  return { min, max };
}

/**
 * Reads the downloaded House Financial Disclosure HTML file
 * and converts it into structured trade objects.
 */
export function parseHouseFdFile(filePath: string): RawGovTrade[] {
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(html);

  const trades: RawGovTrade[] = [];

  $("table tr").each((_, row) => {
    const cols = $(row).find("td");

    if (cols.length < 6) return;

    const politicianName = $(cols[0]).text().trim();
    const ticker = $(cols[1]).text().trim();
    const transactionType = $(cols[2]).text().trim();
    const amountRange = $(cols[3]).text().trim();
    const transactionDate = new Date($(cols[4]).text().trim());
    const disclosureDate = new Date($(cols[5]).text().trim());

    const { min, max } = parseAmount(amountRange);

    trades.push({
      politicianName,
      ticker,
      transactionType,
      amountMin: min,
      amountMax: max,
      transactionDate,
      disclosureDate,
    });
  });

  return trades;
}