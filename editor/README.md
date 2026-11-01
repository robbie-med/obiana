# English content editor

A local editor for the English guide, served on `http://127.0.0.1:3906`.

```
git checkout obiana-main
bash editor/start.sh
```

It serves the real app off disk with an edit layer on top. Click any sentence,
card title or subtitle; change it; **Save to file** writes it into
`public/i18n/locale.en.js`. **Publish** commits and pushes.

## Content tree

`http://127.0.0.1:3906/__editor/tree` (or **Content tree** in the toolbar)
shows the whole guide as a tree: sections, cards in reading order, and
the Tools, Home and app text.

- **Rewrite a card.** Every sentence slot is labelled by what it is in the
  card (lead, heading, list item, table cell, callout), with a live preview
  using the real stylesheet. **Save text** uses the same save as the page
  editor.
- **Reorder or move cards.** Drag, or use ↑ ↓ and the section menu. **Save
  order** rewrites `CONTENT_STRUCTURE` in `public/app/guide/structure.js`. A card moved to another
  section is re-tinted to match it (icon, lead, table headers, section
  callouts) in `app/guide/structure.js` and `i18n/body-templates.js`. FAQ entries and guide
  cards render differently, so neither can move into the other's section.
- **Suggested order** loads a proposed arrangement into the tree without
  saving it.
- **Notes beside each card** come from `docs/CONTENT_MAP.md`: the topics the card
  is home to, the ones it mentions, and any clash, repeat or gap. The page only
  reads that file; edit it by hand to change the notes. The dots in the tree
  mark cards with an open problem.

## Why editing happens in the page

Guide content is stored one entry per sentence, keyed `content.<card>.t.<n>`,
and the shared card template fills those into fixed slots. A sentence on screen
therefore already corresponds to exactly one entry in the locale file, so you
can edit it where you read it, with the sentences either side of it visible.
`cardBody()` in `public/app/guide/cards.js` marks each slot as it renders, rather than the editor matching on
text afterwards, because two cards can legitimately contain the same sentence.

## What Publish does, in order

1. `translation/snapshot.js` — regenerates the translation pipeline's English
   input. Skipping this leaves the next translation run working from stale
   English.
2. `scripts/check.js`: locale lint, fingerprint integrity, and a render of
   every card, ui string and tool in every locale. It fails on an unfilled
   `{{slot}}`, an `undefined`, an empty card or a tool that throws.
3. Bumps `ASSET_VERSION`, `CACHE_NAME` and every `?v=` together. They move in
   lockstep or the service worker serves a mixed set.
4. Stages **only** the files the editor writes (`PUBLISH_PATHS` in
   `server.py`), then `git commit` and `git push obiana obiana-main:main`.
   Nothing else in the working tree is ever committed by Publish.

Any step failing stops the rest, and the log is shown in the dialog.

## Editing English makes translations stale, but they stay visible

Every non-English locale records a fingerprint of the English each string was
translated from (see `translation/hash.js`). Change an English sentence and the
Spanish, French and Korean fingerprints stop matching. The toolbar shows the
running count per language, and `node translation/stamp.js report` is the
retranslation worklist.

The stale translation **keeps showing** to readers of that language
(`cardBody` in `public/app/guide/cards.js`): a slightly dated sentence in her own language
beats an English one mid-paragraph. That is right for rewording, and wrong for
a **safety correction**. When the old advice was wrong (a threshold, a "call
911" that said "call the pediatrician"), also delete that slot and its
`srcHash` entry from every translated locale, so the corrected English shows
until the translation catches up.

## Constraints

- **Localhost only.** It writes to the repo and pushes to GitHub.
- **Pushes to `obiana`, never `origin`.** The two remotes hold unrelated
  histories; obiana is the one behind obiana.app. `start.sh` refuses to run on
  any branch other than `obiana-main`.
- **Never on the public site.** Only `public/` is deployed (`wrangler.jsonc`),
  and the editor lives outside it.
- The service worker is disabled in transit, for the editor only. Left running,
  it would serve its own cached app scripts and locale file, so an edit would
  save to disk and then not appear.
