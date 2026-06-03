# PublicTrades Decisions

## 2026-06-04

### Database IDs

Decision:
Use integer primary keys for all entities.

Reason:
Avoid relying on names as identifiers and simplify relationships.

---

### Party Storage

Decision:
Store party as D, R, or I.

Reason:
Matches congressional data sources and simplifies filtering.

---

### MVP Scope

Decision:
Portfolio simulator excluded from MVP.

Reason:
Focus on trade tracking foundation first.