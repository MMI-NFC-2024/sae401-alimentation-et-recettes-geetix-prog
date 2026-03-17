source .env
bunx pocketbase-typegen --url https://nura.mathis-guellati.fr --email "$PB_EMAIL" --password "$PB_PASSWORD" --out ./src/pocketbase-types.ts
