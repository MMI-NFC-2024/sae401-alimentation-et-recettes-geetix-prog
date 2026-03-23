source .env
bunx pocketbase-typegen --url https://sae401dev.mathis-guellati.fr --email "$PB_EMAIL" --password "$PB_PASSWORD" --out ./src/pocketbase-types.ts
