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

### Database Hosting

Decision:
Use a local PostgreSQL instance during development.

Reason:
Simplifies learning and local development while avoiding cloud infrastructure setup during the MVP phase.

Future Plan:
Migrate to a hosted PostgreSQL provider (likely Neon) before deployment. The application will use environment variables and Prisma to ensure the migration requires minimal code changes.