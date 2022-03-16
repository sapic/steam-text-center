import { Extension } from '@tiptap/core'
import { DOMParser } from 'prosemirror-model'
import { Plugin, PluginKey } from 'prosemirror-state'

const ClipboardHook = Extension.create({
  name: 'clipboard-hook',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('clipboard-hook'),
        props: {
          clipboardTextSerializer (p) {
            let t = ''
            p.content.nodesBetween(0, p.content.size, x => {
              if (x.type.name === 'text') {
                return
              }

              if (x.type.name === 'horizontal_rule') {
                t += '[hr][/hr]'
                return
              }

              let textContent = x.content.content
                .map(c => {
                  if (c.marks.length === 0) {
                    return c.text
                  }
                  let text = c.text

                  for (const mark of c.marks) {
                    switch (mark.type.name) {
                      case 'bold':
                        text = `[b]${text}[/b]`
                        break
                      case 'italic':
                        text = `[i]${text}[/i]`
                        break
                      case 'strike':
                        text = `[strike]${text}[/strike]`
                        break
                      case 'underline':
                        text = `[u]${text}[/u]`
                        break
                    }
                  }

                  return text
                }).join('')

              if (x.type.name === 'heading') {
                textContent = `[h1]${textContent}[/h1]`
              }

              t += textContent
            })
            return t
          },

          clipboardTextParser: (_text, _, plain) => {
            const { editor } = this
            console.log('clipboardTextParser', _text, plain)

            const text = _text
              .replace(/\[b\]/g, '<b>')
              .replace(/\[\/b\]/g, '</b>')
              .replace(/\[h1\]/g, '<h1>')
              .replace(/\[\/h1\]/g, '</h1>')
              .replace(/\[i\]/g, '<i>')
              .replace(/\[\/i\]/g, '</i>')
              .replace(/\[u\]/g, '<u>')
              .replace(/\[\/u\]/g, '</u>')
              .replace(/\[strike\]/g, '<strike>')
              .replace(/\[\/strike\]/g, '</strike>')
              .replace(/\[hr\]/g, '<hr>')
              .replace(/\[\/hr\]/g, '</hr>')

              
            const parser = (content) => {
              const domNode = document.createElement('div')
              domNode.innerHTML = content
              return DOMParser.fromSchema(editor.schema).parse(domNode)
            }
            return parser(text)
          }
        },
      }),
    ]
  }
})

export default ClipboardHook