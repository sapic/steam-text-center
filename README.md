# Steam Text Center Tool by shellcode.team
A tool which automatically centers text for your Steam profile. Original code - https://github.com/alza54/steam-text-center-to. 

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

`git clone https://github.com/sapic/steam-text-center.git`

`yarn`

#### Development

`yarn serve`

open browser: `localhost:8080`

## TO-DO:
- [x] Prepare polish locales
- [x] Prepare english locales
- [ ] Prepare german locales
- [ ] Prepare russian locales
- [X] Client-side text width calculation
- [X] Return emoji support
