# PROTECT — cheapest, most private liability shield for Obiana

Goal: a legal entity between the creator and the app, at minimum cost, with the creator's name and home address off public records. Not legal advice; this is standard, well-trodden ground, but a one-hour consult with a local attorney ($150–300) is money well spent if anything below surprises you.

Companion doc: `LEGAL issues.md` (the audit this plan implements step 3 of).

---

## 1. Recommendation: New Mexico single-member LLC

The cheapest *and* most private option in the US — normally you'd trade one for the other; NM gives both.

| | New Mexico | Wyoming | Delaware | Your home state |
|---|---|---|---|---|
| Filing fee | **$50** (one-time) | $100 | $110 + $300/yr franchise tax | varies ($40–500) |
| Annual report | **None. Ever.** | $60/yr license tax + report | $300/yr | varies (CA: $800/yr!) |
| Member names on public record | **No — not even collected** | No | No (but agent + franchise tax trail) | Usually yes |
| What the public record shows | Entity name + registered agent. That's it. | Same-ish | Same-ish | Often your name and address |

Why NM wins here: zero recurring state fees means the entity costs ~$50/yr total to keep alive (just the registered agent), and because NM never asks who owns it, there is no annual report that could ever leak your name later. Sources: [LLC University annual fees by state](https://www.llcuniversity.com/llc-annual-fees-by-state/), [VentureSmarter NM LLC services](https://venturesmarter.com/best-llc-services/new-mexico/).

**BOI report: not required.** The Corporate Transparency Act's beneficial-ownership filing now applies only to *foreign-formed* entities. FinCEN's March 2025 interim rule exempted all US-formed companies, and [Treasury made the exemption permanent by final rule in August 2026](https://home.treasury.gov/news/press-releases/sb0603). Your ownership is disclosed to no federal database.

### The one big caveat: where do you live?

An LLC formed in NM while you live and work in another state can be deemed "transacting business" in your home state, requiring foreign qualification there (extra fees, and your name may appear on *that* filing). In practice:

- A no-revenue, no-employees, no-office open-source project is about the weakest "transacting business" fact pattern there is, and enforcement against non-revenue entities is rare.
- **California residents: this plan mostly doesn't work for you.** CA asserts its $800/yr franchise tax aggressively on residents running out-of-state LLCs. If you're in CA, either pay the $800 and form in CA directly, or accept the risk knowingly.
- Everyone else: NM LLC, and if your home state ever sends a letter, foreign-qualify then.

## 2. Total cost

| Item | Year 1 | Ongoing |
|---|---|---|
| NM Articles of Organization | ~$52 ($50 + online fee) | $0 |
| Registered agent service | $40–125 | $40–125/yr |
| EIN from IRS | $0 (free, online, instant) | $0 |
| Operating agreement | $0 (self-drafted, §4) | $0 |
| Business bank account | $0 (Mercury / Relay / Bluevine free tiers) | $0 |
| **Total** | **~$95–180** | **~$40–125/yr** |

Do NOT pay for: "formation packages" ($200–400 for what's above), an EIN (anyone charging for this is scamming), "corporate kits", seals, or expedited filing.

## 3. The privacy stack (this is the actual point)

The LLC only protects your *identity* if your name and home address never touch a public or commercial record. Layer by layer:

1. **Registered agent** — their NM street address goes on the Articles, not yours. Cheap options: ~$40–60/yr NM agents (search "New Mexico registered agent $50"); Northwest Registered Agent (~$125/yr) is the quality pick and will act as organizer so your name isn't even on the filing as the submitter.
2. **Formation filing** — file yourself online at the NM Secretary of State (enterprise.sos.nm.gov), listing only: entity name, agent, "member-managed" or "manager-managed". NM asks nothing else.
3. **EIN** — apply at irs.gov as the LLC, using the agent's address. The IRS knows who you are (unavoidable and fine — tax records aren't public).
4. **Domain** — obiana.app: enable WHOIS privacy / use Cloudflare Registrar (privacy by default, at-cost pricing). Transfer registration to the LLC once it exists.
5. **Hosting** — Cloudflare account in the LLC's name, billing address = agent address or a virtual mailbox.
6. **Email** — a dedicated address (e.g. a free Proton.me or Tuta account, or `hello@obiana.app`) used for all of the above. Not your personal Gmail.
7. **Git** — future commits as `Obiana LLC <hello@obiana.app>`; note that *history* already contains your name (see §6).
8. **Bank** — Mercury, Relay, or Bluevine: free, online, and they will verify your ID privately (bank KYC is not public record). No way around showing ID to the bank; no legitimate need to get around it.

Result: public record shows "Obiana LLC, c/o [agent address], Santa Fe NM" and nothing else.

## 4. Formation steps, in order

1. **Name check** — search "Obiana" on the NM SOS business search; reserve nothing (unnecessary fee).
2. **Sign up with a registered agent** first — you need their address and consent before filing.
3. **File Articles of Organization** online at enterprise.sos.nm.gov. ~10 minutes. Approval is typically a few business days.
4. **Operating agreement** — even single-member, even though NM doesn't require filing one. One page suffices: "Obiana LLC is member-managed; its sole asset is the Obiana pregnancy-guide software project; distributions at member's discretion." Sign it, keep it with records. This document is what makes the veil hold later.
5. **EIN** — irs.gov → "Apply for an EIN online" → LLC → disregarded entity. Free, instant.
6. **Bank account** — open with EIN + Articles + operating agreement. Deposit a token amount ($100) *from you as a documented capital contribution*. Never run personal spending through it; never pay LLC costs from personal cards without recording it as a contribution. Commingling is how veils get pierced.
7. **Move the assets in** (§5).
8. **Calendar one reminder**: annual agent renewal. That's the entire maintenance burden — NM has no annual report.

## 5. Asset transfer — the step everyone skips, which voids the whole exercise

An empty LLC shields nothing. The app must actually belong to it:

1. **IP assignment** — a signed one-page document: "I, [name], assign all right, title and interest in the Obiana software, guide content, translations, trademarks, and the obiana.app domain to Obiana LLC." Free template language; sign and date it, keep with the operating agreement. This is the single most important document in this plan.
2. **Domain** — transfer obiana.app registration to the LLC at the registrar.
3. **Cloudflare** — move the Workers project/account to LLC ownership; update billing email.
4. **GitHub** — transfer the repo to an `obiana` organization owned by the LLC, or at minimum update the copyright lines.
5. **Update the copyright holders** in the repo (this is user-visible and forks carry it):
   - `LICENSE` (AGPL) copyright line → `Copyright (c) 2026 Obiana LLC`
   - `LICENSE-CONTENT` (CC BY-SA) attribution → Obiana LLC
   - `NOTICE.md`, `README.md` → "maintained by Obiana LLC"
   - App About screen (`ui.about` strings in `i18n/locale.en.js` and translated locales) → Obiana LLC
6. **D1 database / ntfy webhook** — these already belong to the Cloudflare account; they move with it. The `review/` desktop app and any local credentials: treat as LLC property on paper (one line in the assignment).

## 6. What this does NOT protect — read this

- **Your own past and personal conduct.** If *you* wrote content that injures someone, a plaintiff can name you personally as the author alongside the LLC. The LLC caps *entity* liability and future exposure; it is not a time machine and not a personal-tort eraser. This is why the disclaimers in `LEGAL issues.md` §7 still matter more than the entity.
- **Veil-piercing.** Commingle funds, never sign the operating agreement, or use the LLC as your alter ego, and a court ignores it. §4.6 and §5 exist to prevent exactly this.
- **Git history.** Your name is in past commits and probably in old WHOIS snapshots. The shield is forward-looking; perfect retroactive anonymity is not purchasable. (Rewriting public git history to hide authorship is possible but suspicious-looking and breaks forks — don't.)
- **Regulators and criminal law.** An LLC does nothing against the FDA or a state AG if they ever cared (they won't, per the audit).
- **Taxes.** Single-member LLC = "disregarded entity": any income lands on your personal Schedule C. With zero revenue, there's essentially nothing to file federally; check whether your *home state* wants a return from an out-of-state LLC (usually not, with no in-state activity).

## 7. Optional next layer

- **Media-liability / tech-E&O insurance** (~$500–1,500/yr) once the app has real traffic: pays defense costs, which are the actual bankrupting force in a frivolous suit. At current scale, skippable.
- **501(c)(3) nonprofit** instead — only if you want grants/donations; it costs more, discloses *more* (990s are public), and adds a board. Wrong tool for this job.
- **Trademark registration** for "Obiana" (~$250/class, USPTO) — nice-to-have, not protective of liability.

## 8. Checklist

- [ ] Registered agent retained (NM address in hand)
- [ ] Articles filed, approved
- [ ] Operating agreement signed
- [ ] EIN obtained (free, irs.gov)
- [ ] Free business bank account opened; $100 capital contribution recorded
- [ ] IP assignment signed (code + content + domain + trademark)
- [ ] Domain transferred to LLC, WHOIS privacy on
- [ ] Cloudflare + GitHub moved to LLC ownership
- [ ] Copyright lines updated in `LICENSE`, `LICENSE-CONTENT`, `NOTICE.md`, `README.md`, app About strings
- [ ] Git identity for future commits set to LLC
- [ ] Calendar: annual agent renewal (~$50)
- [ ] One folder (physical or drive) holding: Articles, operating agreement, EIN letter, assignment, bank statements — the "veil kit"

Total spend: roughly **$100 to start, $50/yr to maintain**. Total ongoing effort: one renewal payment a year.

## 9. Clean-slate git migration (delete and re-upload under the LLC)

A fresh repo with a single LLC-authored initial commit is the clean version of §6's forward-looking shield. Current state (audited 2026-08-16): commits already use GitHub noreply emails, but the username `robbie-med` is in two public remotes (`robbie-med/obiana`, `robbie-med/myOB`) and every commit author line. The working tree itself is nearly clean.

**Order matters — LLC before repo:**

1. **LLC formed, IP assignment signed first.** The new repo must never contain a commit where the code is your personal property. Commit zero is already the LLC's.
2. **Check forks** on both GitHub repos (Insights → Forks). Deleting an upstream repo promotes a fork to root — the full history survives there. If forks exist, history erasure is partial; proceed anyway, but know it.
3. **Scrub the tree before upload:**
   - `review/server.py:27`, `editor/server.py:36`, `editor/start.sh:6`, `translation/RUN.md:7` — local `/home/user/Projects/...` paths; remove or genericize
   - `wrangler.jsonc:45` `database_id` — keep (harmless without account credentials; needed by the deploy)
   - `.claude/`, `translation/out/`, `translation/run-kimi.log` — decide deliberately whether tooling/dev artifacts belong in the public repo at all
4. **Update copyright lines in the same scrub pass** (`LICENSE`, `LICENSE-CONTENT`, `NOTICE.md`, `README.md`, `ui.about` strings) → Obiana LLC.
5. **New GitHub org** (`obiana`), owned via the LLC email. Fresh `git init`, one commit: `Initial import — Obiana LLC`, author `Obiana LLC <hello@obiana.app>`. Push.
6. **Reconnect Cloudflare Workers Builds to the new repo BEFORE deleting the old ones** — the site deploys from `main`; swapping the remote without reconnecting stops deploys. Verify one successful deploy.
7. **Delete both old repos** (`obiana` and `myOB`). Optionally ask GitHub Support to purge cached views of the deleted repos.
8. **Archive takedowns**: Software Heritage crawls all public GitHub — submit their takedown form if the old history was captured; same for archive.org snapshots if any matter.
9. **Keep a private offline archive of the full old history.** Public deletion ≠ destroying your own records: the old history is your provenance evidence for the copyright chain (you authored it → assigned to LLC) and costs nothing to keep on a drive.

What this achieves: the public record of authorship now starts at the LLC. What it cannot do: erase forks, clones, or third-party archives you don't control — hence steps 2 and 8, and why the disclaimers still matter more than anonymity.
