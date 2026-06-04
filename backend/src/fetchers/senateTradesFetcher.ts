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

export async function fetchGovTrades(): Promise<RawGovTrade[]> {
  const url =
    "https://disclosures-clerk.house.gov/FinancialDisclosure/ViewSearch";

  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html);

  const trades: RawGovTrade[] = [];

  // NOTE: We will refine selectors after inspecting real DOM structure
  $("table tbody tr").each((_, row) => {
    const cols = $(row).find("td");

    if (cols.length < 6) return;

    const politicianName = $(cols[0]).text().trim();
    const ticker = $(cols[1]).text().trim();
    const transactionType = $(cols[2]).text().trim();

    const amountRange = $(cols[3]).text().trim();

    const transactionDate = new Date($(cols[4]).text().trim());
    const disclosureDate = new Date($(cols[5]).text().trim());

    const [min, max] = amountRange
      .replace(/\$/g, "")
      .split("-")
      .map((x) => Number(x.replace(/,/g, "").trim()));

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