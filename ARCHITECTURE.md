# PublicTrades Architecture

## Tech Stack

- Frontend: Angular
- Backend Node.js + Express
- Language: TypeScript
- Database: PostgreSQL
- Deployment: Vercel, Render,Neon

## MVP Data Model

### Politcian

Reperesents a member of Congress.

Fields:
- id
- first_name
- last_name
- party
- state
- chamber

### Ticker

Represents a publicly traded asset.

Fields:
- id
- symbol
- name
- excahnge

### Trade

Represents a publicly disclosed congressional trade.

Fields:
- id
- politician_id
- ticker_id
- transaction_type
- amount_min
- amount_max
- transaction_date
- disclosure_date

### ImportJob

Tracks data import.

Fields:
- id
- source
- imported_at
- status
- records_imported

## Notes

Congressional disclosures usually report transaction amounts as ranges instead of exact values. PublicTrades stores these as 'amount_min' and 'amount_max' so the app can support future analytics such as estimated exposure, average trade size, and performance simulations.
