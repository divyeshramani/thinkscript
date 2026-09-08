#!/usr/bin/env python3
"""
Fetch all 12 pages of Finviz screener and save to CSV.
URL: https://finviz.com/screener.ashx?v=111&f=cap_midover,sh_avgvol_o2000,sh_price_o30,ta_averagetruerange_o3.5&ft=4&o=-price
"""

import csv
import re
import time
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

BASE_URL = "https://finviz.com/screener.ashx"
PARAMS = "v=111&f=cap_midover%2Csh_avgvol_o2000%2Csh_price_o30%2Cta_averagetruerange_o3.5&ft=4&o=-price"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def extract_text_from_cell(cell_html: str) -> str:
    """Extract link text from [text](url) or plain text from HTML."""
    # Match [text](url) pattern
    m = re.search(r"\[([^\]]*)\]\([^)]*\)", cell_html)
    if m:
        return m.group(1).strip()
    # Strip tags and return text
    text = re.sub(r"<[^>]+>", "", cell_html)
    return text.strip()


def fetch_page(page: int) -> str:
    """Fetch one page of the screener (1-based). Page 1 = no r, page 2 = r=21, etc."""
    r = (page - 1) * 20 + 1
    url = f"{BASE_URL}?{PARAMS}" if page == 1 else f"{BASE_URL}?{PARAMS}&r={r}"
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=15) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_table(html: str) -> list[list[str]]:
    """Parse the screener table from HTML. Returns list of rows (each row is list of cell texts)."""
    rows = []
    # Finviz uses <tr class="styled-row"> with <td> containing <a href="quote.ashx?t=TICKER">text</a>
    tr_pattern = re.compile(
        r'<tr[^>]*class="[^"]*styled-row[^"]*"[^>]*>(.*?)</tr>',
        re.DOTALL | re.IGNORECASE,
    )
    for tr in tr_pattern.findall(html):
        td_pattern = re.compile(r"<td[^>]*>(.*?)</td>", re.DOTALL | re.IGNORECASE)
        tds = td_pattern.findall(tr)
        if len(tds) < 10:
            continue
        cells = []
        for td in tds:
            # Get text from first <a> or raw text
            a_match = re.search(r"<a[^>]*>([^<]*)</a>", td, re.IGNORECASE)
            if a_match:
                cells.append(a_match.group(1).strip())
            else:
                cells.append(re.sub(r"<[^>]+>", "", td).strip())
        if cells[0].isdigit() and len(cells) >= 10:
            rows.append(cells[:11])
    return rows


def main():
    out_path = "finviz_screener.csv"
    all_rows = []
    columns = ["No.", "Ticker", "Company", "Sector", "Industry", "Country", "Market Cap", "P/E", "Price", "Change", "Volume"]

    for page in range(1, 13):
        print(f"Fetching page {page}/12...")
        try:
            html = fetch_page(page)
            page_rows = parse_table(html)
            all_rows.extend(page_rows)
        except (URLError, HTTPError, Exception) as e:
            print(f"  Error on page {page}: {e}")
        time.sleep(0.5)

    # Deduplicate by ticker (in case of overlap)
    seen = set()
    unique = []
    for row in all_rows:
        if len(row) >= 2 and row[1] not in seen:
            seen.add(row[1])
            unique.append(row[:11] if len(row) > 11 else row)

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(columns)
        for row in unique:
            w.writerow(row[: len(columns)])

    print(f"Wrote {len(unique)} rows to {out_path}")
    return out_path


if __name__ == "__main__":
    main()
