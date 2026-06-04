import { TradeProvider, RawGovTrade } from "../tradeProvider";

import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
const fetchWithCookies = fetchCookie(fetch, jar);

export class GovProvider implements TradeProvider {
  async fetchTrades(): Promise<RawGovTrade[]> {
    const senate = await this.fetchSenate();
    const house = await this.fetchHouse();

    return [...senate, ...house];
  }

  private async fetchSenate(): Promise<RawGovTrade[]> {
    const url = "https://efdsearch.senate.gov/search/report/data/";

    const form = new URLSearchParams();

    // required DataTables fields
    form.append("draw", "1");
    form.append("start", "0");
    form.append("length", "25");

    // filters
    form.append("report_types", "[]");
    form.append("filer_types", "[1]");
    form.append("submitted_start_date", "01/01/2012 00:00:00");

    const res = await fetchWithCookies(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        "x-csrftoken": process.env.SENATE_CSRF_TOKEN ?? "",
      },
      body: form.toString(),
    });

    // IMPORTANT: debug safety
    const text = await res.text();

    // Try parsing safely
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log("Non-JSON response received (first 500 chars):");
      console.log(text.slice(0, 500));
      throw new Error("Senate endpoint did not return JSON (session/auth issue likely)");
    }

    console.log("Senate rows returned count:", data?.data?.length);
    console.log("Sample row:", data?.data?.[0]);

    return data?.data ?? [];
  }

  private async fetchHouse(): Promise<RawGovTrade[]> {
    return [];
  }
}