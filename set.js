const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });

const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

module.exports = {
    session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU50c1JlV2ZFeDErUnNQZmYrWGNscmYrUG5kU0s1ZGdObUZMWGU5NXNsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFlxQVJPaThsMHVGRHRGU2Y5QzdZR2VNTGtta2haaUR1M1ZJSlRJOEd5az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQ25xVi9QTWlsaEhBbzc2TFhuZDYyU0daemkzZ3JGNzFMRjZMVlNSY2xRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWVHVYNGpvNSs3eGtLbUUrQU5UVnErcWpjaUZaUEZwQ3lxcndvT1BlR1NzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9KVE9ubXRvS05RcEhxTnZlay9wcDE5eTNNc3VqQmg3K1FxTWlaTnFmbm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJwZG1nSEdxTTRqYU80a21EQ0lGalhkSy82WWRSY2xTdC8xSnRvQUZpR0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0tOazVXMHNHYkc2QjNwRVFmQm9pVWhLdHVDUjc0Q1h1dXdWOHRiZ1JrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmxVL2tuaWd1dUQrUHZrT2FGUWRLOXA4Q3dMRlFUTWlnTDdqL3g2QTlYTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVYaDltdjV1dlRCRWVIN1hPUVVjOFdGUzBId0Z3YzBsbDlsRlRPNXdUYVkyYUhkRW11aEZ5ZnljT2FZTi80V1FuNWFXWklOVURhV1BMWHRydjBwY2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMyLCJhZHZTZWNyZXRLZXkiOiI2b21XcmFzeTN5d2ZQL2xnc2t6dk8xN2xiRGtqU3RRNGJDUG5Xb2FCODh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTQ3ODY5NzcxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQTc1RTg3QURBNkRFNEFERjA1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgzMTg5ODN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyNTQ3ODY5NzcxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBOTFEMjRDQkFFRTlBNTc2MUE2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgzMTg5ODV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjJWWTY2R05MIiwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRWc9PSJ9LCJtZSI6eyJpZCI6IjIyNTQ3ODY5NzcxOjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuG0m8qc4bSA4bSb4bSLyarhtIXjg4MiLCJsaWQiOiI5NTkxNTcxMzAxMTkyMjoxMUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BIR3ovTUlFUDcxMU1FR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZVakE1RXova1FqZUlnMm94ZTBVcHd4dkNKeC9kT203Zzg0ZnIybmlEaHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkduK25DZ25GRlg4K2FIak83eHJkRWFLVVRaU2ZGdTJjS3ByUXpPQlBtWHZlL2FSbnZnOTN3UFZqcklKckZBYnlld0t6aEtqWlRrSnRiVnZTdXNTQWlnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJoWGZ3WDRBVFl3Qks2ek1EUElabWVibjNJWkJ6eG9velR2SE5rbkw1SkxUaWhvMkNITWZndWpxaWJiYndIUUdSYmFDL3ZMYUVjSFFpRmpFemNZTkZoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTQ3ODY5NzcxOjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVsSXdPUk0vNUVJM2lJTnFNWHRGS2NNYndpY2YzVHB1NFBPSDY5cDRnNGMifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDgzMTg5NzcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTXVKIn0=',
    ETAT: process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Hacking-Md",
    NUMERO_OWNER: process.env.NUMERO_OWNER,
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    CODE_PAYS: process.env.CODE_PAYS || '223',
    BOT: process.env.NOM_BOT || 'Hacking_MD',
    URL: process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    CHAT_BOT: process.env.CHAT_BOT || 'non',
    DP: process.env.STARTING_BOT_MESSAGE || 'oui',
    CHATBOT: process.env.PM_CHATBOT || "non",
    ATD: process.env.ANTI_DELETE_MESSAGE || 'non',
    ANTI_VV: process.env.ANTI_VUE_UNIQUE || 'non',
    LIKE_STATUS: process.env.LIKE_STATUS || 'non',
    DATABASE_URL,
    DATABASE:
        DATABASE_URL === databasePath
            ? "postgresql://neondb_owner:npg_P0NqknRwAl9S@ep-bitter-term-a5vafgtto-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
"
            : DATABASE_URL,
    DB: process.env.DB || 'postgresql://neondb_owner:npg_P0NqknRwAl9S@ep-bitter-term-a5vafgtto-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
',
    
    /*sequelize: new Sequelize(DATABASE_URL, {
        dialect: DATABASE_URL === databasePath ? 'sqlite' : 'postgres',
        storage: DATABASE_URL === databasePath ? DATABASE_URL : undefined,
        ssl: DATABASE_URL !== databasePath,
        protocol: 'postgres',
        dialectOptions: DATABASE_URL !== databasePath
            ? {
                native: true,
                ssl: { require: true, rejectUnauthorized: false },
            }
            : undefined,
        logging: false,
    }), */
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
