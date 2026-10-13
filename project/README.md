# 💌 Dinner Date Website

A tiny static site: an apology, a "Yes / No" question (the No button can't be caught 😜),
a page to pick the restaurant + time, and her answer gets sent to you.

## 1. Personalise

Edit the `CONFIG` block at the top of `site/script.js`:

| Field            | What it does                                                        |
|------------------|---------------------------------------------------------------------|
| `herName`        | Shown as "Hey ___,"                                                 |
| `yourName`       | Your sign-off                                                       |
| `email`          | Her answer is emailed here (via FormSubmit.co, free, no signup)     |
| `ntfyTopic`      | Optional instant push to your phone (via ntfy.sh, free, no signup)  |
| `whatsappNumber` | Optional "send it on WhatsApp" button on the last page              |

You can also edit `PLACES` and the apology text in `site/index.html`.

Preview locally: just double-click `site/index.html`.

## 2. Host it free on GitHub Pagess

```bash
git init -b main
git add .
git commit -m "💌"
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` deploys on every push. Your link will be
`https://<you>.github.io/<repo>/`.

(Free Pages needs a **public** repo, so pick a repo name that doesn't give away the surprise.)

## 3. Test it yourself BEFORE sending the link

1. Open the live link, click Yes, pick something, confirm.
2. **FormSubmit** will email you an *Activate Form* link the first time — click it.
   Until you do, no answers are delivered.
3. If you set `ntfyTopic`, install the **ntfy** app, subscribe to that exact topic,
   and you'll get a notification instantly.
4. Run through it once more to confirm the email arrives, then send her the link. 💖
