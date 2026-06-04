import { TradeProvider, RawGovTrade } from "../tradeProvider";

import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
const fetchWithCookies = fetchCookie(fetch, jar);
let csrfToken: string | undefined;

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

    await fetchWithCookies("https://efdsearch.senate.gov/search/home/");
    const cookies = await jar.getCookies("https://efdsearch.senate.gov");
        csrfToken = cookies.find(c => c.key === "csrftoken")?.value;

    const res = await fetchWithCookies(url, {
    method: "POST",
    headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        "x-csrftoken": csrfToken ?? "",
        "referer": "https://efdsearch.senate.gov/search/",
    },
    body: form.toString(),
    });

    // IMPORTANT: debug safety
    const text = await res.text();

    console.log("===== SENATE RAW RESPONSE START =====");
    console.log(text.slice(0, 1500));
    console.log("===== SENATE RAW RESPONSE END =====");

    return [];
    
  }

  private async fetchHouse(): Promise<RawGovTrade[]> {
    return [];
  }
}