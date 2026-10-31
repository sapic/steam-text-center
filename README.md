# Steam Text Center Tool by shellcode.team
A tool which automatically centers text for your Steam profile. Original code - https://github.com/alza54/steam-text-center-tool. 

In the proccess of ressurection almost everything was rewritten. Text editor from Quill to Tiptap. Sass removed since it was used in 3 places. Nightmare and all server side code removed since we don't need it. Vue cli instead of custom webpack configs.

https://center.steam.design/

:sparkling_heart: User-friendly interface

:sparkles: Editor can be used not only for centering text, because it is handy

:collision: Two symbols used for text centering

:watch: ~~Text centering precision displayed per line~~ No precision, you can't make it better anyway.

:raised_hands: Multiple centering modes

:rat: Vue.js

:u5272: Language translations

## Install

Requires Node.js 22.12+ and pnpm (`corepack enable` picks the version from `package.json`).

`git clone https://github.com/sapic/steam-text-center.git`

`pnpm install`

#### Development

`pnpm dev`

open browser: `localhost:5173`

`pnpm build` writes the static site to `dist/`, `pnpm serve` previews it, `pnpm lint` runs ESLint.

## TO-DO:
- [x] Prepare polish locales
- [x] Prepare english locales
- [ ] Prepare german locales
- [ ] Prepare russian locales
- [X] Client-side text width calculation
- [X] Return emoji support
