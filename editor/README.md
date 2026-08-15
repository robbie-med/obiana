# English content editor

A local editor for the English guide, served on `http://127.0.0.1:3906`.

```
git checkout obiana-main
bash editor/start.sh
```

It serves the real app off disk with an edit layer on top. Click any sentence,
card title or subtitle; change it; **Save to file** writes it into
`i18n/locale.en.js`. **Publish** commits and pushes.

## Why editing happens in the page

Guide content is stored one entry per sentence, keyed `content.<card>.t.<n>`,
and the shared card template fills those into fixed slots. A sentence on screen
therefore already corresponds to exactly one entry in the locale file, so you
can edit it where you read it, with the sentences either side of it visible.
`content.js` marks each slot as it renders, rather than the editor matching on
text afterwards, because two cards can legitimately contain the same sentence.

## What Publish does, in order

1. `translation/snapshot.js` — regenerates the translation pipeline's English
   input. Skipping this leaves the next translation run working from stale
   English.
2. `translation/stamp.js verify` — fingerprint integrity.
3. `translation/lint-locales.js` — script leakage, and that the three
   fingerprint implementations still agree.
4. Bumps `ASSET_VERSION`, `CACHE_NAME` and every `?v=` together. They move in
   lockstep or the service worker serves a mixed set.
5. `git commit` and `git push obiana obiana-main:main`.

Any step failing stops the rest, and the log is shown in the dialog.

## Editing English makes translations stale, on purpose

Every non-English locale records a fingerprint of the English each string was
translated from (see `translation/hash.js`). Change an English sentence and the
Spanish, French and Korean translations of that sentence stop matching, so the
app shows reviewed English there instead of a translation of a sentence that no
longer exists. The toolbar shows the running count per language, and
`node translation/stamp.js report` is the retranslation worklist.

## Constraints

- **Localhost only.** It writes to the repo and pushes to GitHub.
- **Pushes to `obiana`, never `origin`.** The two remotes hold unrelated
  histories; obiana is the one behind obiana.app. `start.sh` refuses to run on
  any branch other than `obiana-main`.
- **Excluded from the public site** via `.assetsignore`. Everything not listed
  there is served publicly, so an edit surface would otherwise go live.
- The service worker is disabled in transit, for the editor only. Left running,
  it would serve its own cached `content.js` and locale file, so an edit would
  save to disk and then not appear.
