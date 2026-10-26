# Roadmap – Sabil Valdano portfolio

Last updated: 26 Oct 2026. Items marked "needs your input" are waiting on information from Sabil, and nothing will be added to the site that isn't confirmed true.

## Done

- [x] Vite + React site with a Fabel-inspired layout and green palette
- [x] Favicon (S), Apple touch icon and social share image
- [x] SEO: meta tags, Open Graph, JSON-LD, robots.txt and sitemap.xml, no-JavaScript fallback
- [x] Security headers (Content-Security-Policy and more) in `public/_headers`
- [x] Dependencies updated to Vite 8 and React 19
- [x] Easter eggs in the Elements panel and Console
- [x] Results and highlights in the experience section (4 developers led, 10+ projects, 99% uptime, ~3M records in 24 hours)
- [x] LinkedIn and GitHub contact (email skipped by choice)
- [x] English / Indonesian switch and Auto / Light / Dark theme
- [x] CV-comparison fixes: 14+ years of experience, clearer Infra Solusi / Link Net wording, role title ".NET Developer and Junior System Analyst"
- [x] Concrete leadership bullets at NawaData (architecture, GCP, performance, troubleshooting, security, hands-on)
- [x] Skills grouped by area (Backend, Data and reporting, Cloud and DevOps, Integration, Leadership)
- [x] Hero facts strip (Now, Domains including telecom, Integrations) replaces the number cards; the numbers stay only in the NawaData role
- [x] Integration details added: multiple well-known Indonesian payment gateways (private and national banks, e-commerce, e-wallets, minimarkets) and major OTT players
- [x] CI/CD tools added: Jenkins, SonarQube, Azure DevOps
- [x] Manual theme button hidden; the site follows the system light/dark setting (set `showThemeToggle = true` in `src/prefs.js` to bring it back)
- [x] Admin page at `/admin`: edit all site data as JSON with a secret key (Cloudflare Pages Function + KV, key checks, lockout, restore and reset)
- [x] Site URL set to https://me.sabilvaldano.workers.dev and the KV namespace id added to `wrangler.jsonc`
- [x] README and this roadmap

## Next

| Item | Status | Needs your input |
|---|---|---|
| Pre-rendering, so Google and link previews read the page content directly (also lets each language have its own address) | Planned, next to build | Node.js 22 installed so you can test `npm run build` |
| Finish the admin page on your `me` Worker: set the `ADMIN_KEY_HASH` secret, then `npm run deploy` (steps 1, 4 and 5 in README) | KV namespace id and site URL are set | Node.js 22 and about 5 minutes |
| Optional extra detail on integrations: how many payment gateways, names you may show, OTT names you may show, and any measurable result | Live with general wording | Only what you can share |
| Confirm the exact uptime figure for NawaData (currently 99%) | Live | The real number |
| Keywords you have really used (for example Docker, Kubernetes, microservices, RabbitMQ or Kafka, unit testing, Agile or Scrum, OAuth or JWT, NoSQL, monitoring) | On hold | Tell me which ones are true, with a short example for each |
| Downloadable CV (PDF) button | On hold | Your CV as a PDF |
| Real recommendations ("Kind words") | On hold | Real LinkedIn recommendations, with each person's permission |

## Later / optional

- [ ] Cloudflare Access (login code) in front of `/admin*` and a WAF rate-limit rule, for extra admin protection
- [ ] Email icon (hidden by default; add an address in `socials` in `src/data.js` if you change your mind)
- [ ] Short case studies for two or three projects, if you can share non-confidential details
- [ ] Subtle scroll animations that respect reduced-motion settings
- [ ] Self-hosted fonts instead of Google Fonts
- [ ] Privacy-friendly analytics (Plausible or Umami)
- [ ] Accessibility check with Lighthouse or axe
- [ ] Review the Indonesian wording in `src/data.js`

## Recurring

- Monthly: run `npm audit` and `npm outdated`
- When you change jobs or finish a project: update `src/data.js` in both English and Indonesian
- Before every deploy: set the real domain in `.env` (`VITE_SITE_URL`)
