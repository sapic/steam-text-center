import { Extension, Plugin } from '@tiptap/vue-3'
import { DOMParser } from 'prosemirror-model'

export default class ClipboardHook extends Extension {
  get name () {
    return 'clipboard-hook'
  }

  get defaultOptions () {
  }

  get plugins () {
    const editor = this.editor
    return [
      new Plugin({
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

          transformPasted (pasted) {
            const result = pasted.content.content.map(node => {
              if (node.content.content[0].text.indexOf('[h1]') !== -1) {
                const newNode = editor.schema.nodes.heading.create({
                  level: 1,
                })
                newNode.content = node.content
                newNode.content.content[0].text = node.content.content[0].text
                  .replace(/\[h1\]/g, '')
                  .replace(/\[\/h1\]/g, '')

                node = newNode
              }

              const newContent = node.content.content.map(innerNode => {
                if (!innerNode.text) {
                  return innerNode
                }

                const parser = (content) => {
                  const domNode = document.createElement('div')
                  domNode.innerHTML = content
                  return DOMParser.fromSchema(editor.schema).parse(domNode)
                }

                const text = innerNode.text
                  .replace(/\[b\]/g, '<b>')
                  .replace(/\[\/b\]/g, '</b>')
                  .replace(/\[i\]/g, '<i>')
                  .replace(/\[\/i\]/g, '</i>')
                  .replace(/\[u\]/g, '<u>')
                  .replace(/\[\/u\]/g, '</u>')
                  .replace(/\[strike\]/g, '<strike>')
                  .replace(/\[\/strike\]/g, '</strike>')

                return parser(text)
              })

              node = newContent[0]

              return node
            }).filter(x => x)

            pasted.content.content = result

            return pasted
          },
        },
      }),
    ]
  }
}
