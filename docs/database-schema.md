# PublicTrades Database Schema

## Politician

Represents a member of Congress.

Fields:
- id
- first_name
- last_name
- party
- state
- chamber

## Ticker

Represents a publicly traded asset.

Fields:
- id
- symbol
- name
- exchange

## Trade

Represents a disclosed congressional trade.

Fields:
- id
- politician_id
- ticker_id
- transaction_type
- amount_min
- amount_max
- transaction_date
- disclosure_date

## ImportJob

Tracks data imports.

Fields:
- id
- source
- imported_at
- status
- records_imported

## Relationships

A Politician can have many Trades.

A Ticker can have many Trades.

Each Trade belongs to exactly one Politician.

Each Trade belongs to exactly one Ticker.

## Keys

### Politician
Primary Key:
- id

### Ticker
Primary Key:
- id

### Trade
Primary Key:
- id

Foreign Keys:
- politician_id -> Politician.id
- ticker_id -> Ticker.id

### ImportJob
Primary Key:
- id