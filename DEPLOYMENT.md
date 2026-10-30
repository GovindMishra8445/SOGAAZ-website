# SOGAAZ — Deployment Guide (Render + Vercel + MongoDB Atlas)

```
Browser ──HTTPS──► Vercel (React frontend)
                     │  /api/*  (vercel.json rewrite = same-origin proxy)
                     ▼
                   Render (Node.js + Fastify backend)  ──TLS──►  MongoDB Atlas (db: sogaaz)
```

Frontend `/api/...` call karta hai → Vercel us request ko Render backend pe forward karta hai.
Isliye browser ke liye sab kuch **same domain** hai, aur admin login ka secure `httpOnly` cookie
Safari / Chrome / mobile sab me kaam karta hai.

---

## 0. Kya kya badla hai

| Pehle | Ab |
|---|---|
| Firebase Firestore | **MongoDB Atlas** (database `sogaaz`, collections `certificates`, `admins`) |
| Firebase Auth + `localStorage("admin")` | **Backend login** — bcrypt password, JWT in `httpOnly` + `Secure` + `SameSite=Strict` cookie |
| Frontend directly DB se baat karta tha | Frontend sirf `/api` se baat karta hai, DB credentials sirf backend ke paas |
| — | `backend/` — Node.js + Fastify API |

Security jo backend me laga hai: Helmet headers (HSTS, CSP, no-sniff, frame-deny), CORS allow-list,
HTTPS enforcement, global + login rate-limit, 5 galat password → 15 min account lock, strict JSON schema
validation (extra fields reject), NoSQL-injection protection, password change → baaki sab sessions logout,
production me internal errors hide.

**Data migration ho chuka hai:** Firestore ke 19 certificates MongoDB me copy ho gaye hain.
Agar go-live se pehle purane (Firebase wale) admin panel me koi naya certificate add hua ho, to ek baar fir chalao —
ye safe hai, duplicate nahi banata:

```bash
cd backend
npm run migrate:firebase
```

---

## 1. MongoDB Atlas

1. **Network Access → Add IP Address → `0.0.0.0/0`** (Allow access from anywhere).
   Render free/starter plan ka IP fixed nahi hota, isliye ye zaroori hai. Security password + TLS se hai.
2. **Database Access** me user `internationaloceaniek_db_user` ka role kam se kam *readWrite* ho.
3. ⚠️ Recommended: ye password pehle frontend `.env` file me pada tha — Atlas me is user ka **password badal do**
   (Database Access → Edit → Edit Password), phir naya password `MONGODB_URI` me daal do
   (`backend/.env` aur Render dono me).

> Note: frontend `.env` me jo `MONGODB_URL` tha usme **dusra username** tha jo login nahi hota tha.
> Sahi user `MONGODB_USER` wala tha — wahi `backend/.env*` me use hua hai.

---

## 2. Backend → Render

### Option A — Blueprint (aasaan)
1. Code GitHub pe push karo.
2. Render → **New + → Blueprint** → ye repo select karo. `render.yaml` apne aap service bana dega.
3. Jo secret values maangi jayengi, wo `backend/.env.production` se copy karo.

### Option B — Manual Web Service
| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm ci --omit=dev` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

### Environment variables (Render → service → **Environment**)

Sab values **`backend/.env.production`** file me ready hain. Render me *“Add from .env”* button se
poori file paste kar sakte ho.

| Key | Kya hai |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Atlas connection string (database `sogaaz`) |
| `JWT_SECRET` | Login token sign karne ka random secret (64 chars). Badla to sab admin logout. |
| `JWT_EXPIRES_IN` | `8h` — itni der admin logged-in rahega |
| `CORS_ORIGINS` | **Aapka Vercel URL / domain**, comma se alag, end me `/` nahi. e.g. `https://sogaaz.vercel.app,https://www.yourdomain.com` |
| `COOKIE_SAMESITE` | `strict` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Sirf tab use hote hain jab DB me koi admin na ho (pehla start). Admin pehle se ban chuka hai — neeche dekho. |
| `LOG_LEVEL` | `info` |

❌ `PORT` add **mat** karo — Render khud deta hai. ❌ `DNS_SERVERS` Render pe nahi chahiye (sirf local Windows fix).

Deploy ke baad check karo: `https://<your-service>.onrender.com/api/health` → `{"status":"ok","db":"connected"}`

> Free plan pe 15 min idle ke baad server so jata hai; pehli request ~50 sec le sakti hai.
> Live business site ke liye **Starter plan** better hai.

---

## 3. Frontend → Vercel

1. **`vercel.json`** me backend ka URL apne Render URL se match karo:
   ```json
   { "source": "/api/:path*", "destination": "https://sogaaz-backend.onrender.com/api/:path*" }
   ```
   (Agar Render service ka naam `sogaaz-backend` hi rakha, to kuch badalna nahi.)
2. Vercel me **koi env variable zaroori nahi**. Optional:
   - `VITE_SITE_URL` — QR code kis domain pe point kare (default `https://www.sogaaz.ru`, pehle jaisa).
3. Push karo → Vercel auto-deploy.
4. Render pe `CORS_ORIGINS` me Vercel ka final domain (aur custom domain) zaroor daalo.

⚠️ Frontend `.env` me ab sirf `VITE_*` values hain. `VITE_` wali har value browser me public hoti hai —
**DB password ya koi secret frontend me kabhi mat rakhna.** `.env` files ab `.gitignore` me hain.

---

## 4. Admin login & password

Admin account MongoDB me ban chuka hai:

- **Email:** `admin@sogaaz.com`
- **Password:** `backend/.env.production` file me `ADMIN_PASSWORD` (quotes ke andar wali value)

### Login / password kaise badle
**Tarika 1 — Admin panel se (recommended):** login → **Settings** →
- *Login email* → naya email + current password → **Change email**
- *Password* → current + naya password (10+ chars, upper, lower, number, symbol) → **Update password**

Badalte hi baaki sab devices logout ho jaate hain. Uske baad Render se `ADMIN_PASSWORD` delete kar sakte ho.

**Tarika 2 — Password bhool gaye / reset:**
```bash
cd backend
npm run create-admin -- admin@sogaaz.com "NayaStrong#Pass2026"
```
(Email exist karta hai to password reset + lock hat jaata hai, nahi to naya admin ban jaata hai.
Isi command se doosra admin bhi bana sakte ho.)

---

## 5. Local development

```bash
# Terminal 1 — backend (http://localhost:5000)
cd backend
npm install
npm run dev

# Terminal 2 — frontend (http://localhost:5173, /api → backend)
pnpm install
pnpm dev
```

`backend/.env` = local settings, `backend/.env.production` = Render ke liye. Dono git-ignored hain.
⚠️ Dono same Atlas database (`sogaaz`) use karte hain — local pe jo badloge wo live data hai.

---

## 6. Go-live ke baad (Firebase cleanup)

Firestore ke `certificates` abhi bhi **public readable** hain (koi bhi bina login padh sakta hai).
Naya system live hone ke baad Firebase Console → Firestore → **Rules** me sab band kar do:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
  }
}
```

---

## 7. Data note

- Document number **`260011E`** do baar hai (vessel EVA) — dono migrate hue. Ek ko delete/rename kar dena;
  naye certificates me duplicate number ab allowed nahi hai.
- **`260013E / 26 / HM`** (ANNE): start `29 Oct 2026`, end `28 Oct 2026` — end date shayad `2027` honi chahiye,
  isliye ye *Expired* dikh raha hai.

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Render log: `bad auth : Authentication failed` | `MONGODB_URI` ka user/password galat. Password me special chars ho to URL-encode karo. |
| Render log: `Server selection timed out` | Atlas Network Access me `0.0.0.0/0` nahi hai. |
| Login pe `Origin not allowed` | Render `CORS_ORIGINS` me exact Vercel URL daalo (https, bina `/`). |
| Login ho jaata hai par refresh pe logout | `vercel.json` rewrite missing/galat — frontend `/api` se hi call kare. |
| Local: `querySrv ECONNREFUSED` | `backend/.env` me `DNS_SERVERS=8.8.8.8,1.1.1.1` |
| Account locked | 15 min wait, ya `npm run create-admin -- <email> <password>` |
