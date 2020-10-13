import { Extension, Plugin } from 'tiptap'
import { Fragment, Slice, Schema, DOMParser } from 'prosemirror-model'
// import { Schema, DOMParser, DOMSerializer } from "prosemirror-model"
// import Vue from 'vue'
// import { nodeInputRule } from 'tiptap-commands'

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
// const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export default class ClipboardHook extends Extension {
  get name() {
    return 'clipboard-hook'
  }

  get defaultOptions() {
  }

  init() {
    console.log('clipboard init', this.editor)
  }

  // commands ({ type }) {
  //   return attrs => (state, dispatch) => {
  //     const { selection } = state
  //     const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
  //     const node = type.create(attrs)
  //     const transaction = state.tr.insert(position, node)
  //     dispatch(transaction)
  //   }
  // }

  // inputRules ({ type }) {
  //   return [
  //     nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
  //       const [, alt, src, title] = match
  //       return {
  //         src,
  //         alt,
  //         title,
  //       }
  //     }),
  //   ]
  // }

  get plugins() {
    // console.log('get plugins', this.editor)
    const editor = this.editor
    return [
      new Plugin({
        props: {
          transformPastedText(x, y, z) {
            // console.log('tfff', x, y, z)
            return x
            // .replace("[h1]", "<h1>")
            // .replace("[/h1]", "</h1>")
          },
          transformPastedHTML(html) {
            // console.log('thtml', html)
            return html
          },

          clipboardTextSerializer(p) {
            let t = "";
            p.content.nodesBetween(0, p.content.size, x => {
              if (x.type.name === "text") {
                return
              }

              if (x.type.name === "horizontal_rule") {
                t += "[hr][/hr]"
                return
              }

              let textContent = x.content.content
                .map(c => {
                  if (c.marks.length === 0) {
                    return c.text
                  }

                  let text = c.text

                  for (const mark of c.marks) {
                    console.log('mark', mark)
                    switch (mark.type.name) {
                      case "bold":
                        text = `[b]${text}[/b]`;
                        break
                      case "italic":
                        text = `[i]${text}[/i]`;
                        break
                      case "strike":
                        text = `[strike]${text}[/strike]`;
                        break
                      case "underline":
                        text = `[u]${text}[/u]`;
                        break
                    }
                  }

                  return text
                }).join("")

              if (x.type.name === "heading") {
                textContent = `[h1]${textContent}[/h1]`;
              }

              t += textContent;
            });
            return t;
          },

          transformPasted(pasted, x, y) {
            // console.log('editor', this.editor)
            // return
            // console.log('transfrom paster', pasted, this, x, y)
            // return pasted
            // console.log(JSON.stringify(pasted, null, 2))

            const result = pasted.content.content.map(node => {
              // console.log('node', node)
              // node.content[0].type.name = 'heading'
              // console.log('node', node)
              // console.logg
              // console.log(node.content)

              if (node.content.content[0].text.indexOf("[h1]") !== -1) {
                // console.log('return null', editor.schema)

                const newNode = editor.schema.nodes.heading.create({
                  level: 1,
                })
                newNode.content = node.content
                newNode.content.content[0].text = node.content.content[0].text
                  .replace(/\[h1\]/g, "")
                  .replace(/\[\/h1\]/g, "")

                node = newNode
                // return node
                // node.type.name = 'heading'
                // node.attrs.level = 1
                // console.log('set node type', node.content.content[0].text)
              }

              let newContent = node.content.content.map(innerNode => {
                if (!innerNode.text) {
                  return newContent = innerNode
                }

                let parser = (content) => {
                  let domNode = document.createElement("div");
                  domNode.innerHTML = content;
                  return DOMParser.fromSchema(editor.schema).parse(domNode);
                }

                const text = innerNode.text
                  .replace(/\[b\]/g, "<b>")
                  .replace(/\[\/b\]/g, "</b>")
                  .replace(/\[i\]/g, "<i>")
                  .replace(/\[\/i\]/g, "</i>")
                  .replace(/\[u\]/g, "<u>")
                  .replace(/\[\/u\]/g, "</u>")
                  .replace(/\[strike\]/g, "<strike>")
                  .replace(/\[\/strike\]/g, "</strike>")

                return parser(text)
              })


              // for (let innerNode of node.content.content) {
              //   console.log('inne', innerNode)
              //   if (!innerNode.text) {
              //     return newContent = innerNode
              //   }

              //   console.log('before text')

              //   const text = innerNode.text
              //     .replace(/\[b\]/g, "<b>")
              //     .replace(/\[\/b\]/g, "</b>")

              //   console.log('text', text)

              //   let parser = (content) => {
              //     let domNode = document.createElement("div");
              //     domNode.innerHTML = content;
              //     return DOMParser.fromSchema(editor.schema).parse(domNode);
              //   }

              //   const parsed = parser(text)
              //   console.log('parsed', parsed)
              //   newContent = parsed
              //   // newContent.push(
              //   //   parsed
              //   // )

              //   // let nodesChanged = false

              //   // if (innerNode.text.indexOf("[b]") !== -1) {
              //   //   nodesChanged = true
              //   //   console.log('bold detected', editor.schema.marks)

              //   //   let toCreate = []

              //   //   const before = innerNode.text.split('[b]')
              //   //   if (before.length === 2) {
              //   //     const text = editor.schema.text(before[0])
              //   //     newContent.push(text)
              //   //   }

              //   //   const after = before[before.length - 1].split("[/b]")
              //   //   const text = editor.schema.text(after[0], [editor.schema.marks.bold.create()])
              //   //   newContent.push(text)

              //   //   if (after.length === 2) {
              //   //     const text = editor.schema.text(after[1])
              //   //     newContent.push(text)
              //   //   }

              //   //   // newContent.push(Fragment.fromArray(toCreate))
              //   //   console.log('push fragment')
              //   // }

              //   // if (!nodesChanged) {
              //   //   newContent.push(innerNode)
              //   // }
              // }

              console.log('new content', newContent[0].content)
              // node.content = newContent[0].content
              node = newContent[0]
              // Fragment.fromArray(newContent)
              console.log('after content', JSON.stringify(node))

              // if (node.content.content[0].text.indexOf("[b]") !== -1) {
              //   console.log('bold detected', editor.schema.marks)

              //   let toCreate = []

              //   const before = node.content.content[0].text.split('[b]')
              //   if (before.length === 2) {
              //     const text = editor.schema.text(before[0])
              //     toCreate.push(text)
              //   }

              //   const after = before[before.length - 1].split("[/b]")
              //   const text = editor.schema.text(after[0], [editor.schema.marks.bold.create()])
              //   toCreate.push(text)

              //   if (after.length === 2) {
              //     const text = editor.schema.text(after[1])
              //     toCreate.push(text)
              //   }

              //   node.content = Fragment.fromArray(toCreate)
              // }

              // if (node.content.content[0].text.indexOf("[i]") !== -1) {
              //   console.log('italic detected', node)

              //   let toCreate = []

              //   const before = node.content.content[0].text.split('[i]')
              //   if (before.length === 2) {
              //     const text = editor.schema.text(before[0])
              //     toCreate.push(text)
              //   }

              //   const after = before[before.length - 1].split("[/i]")
              //   const text = editor.schema.text(after[0], [editor.schema.marks.italic.create()])
              //   toCreate.push(text)

              //   if (after.length === 2) {
              //     const text = editor.schema.text(after[1])
              //     toCreate.push(text)
              //   }

              //   node.content = Fragment.fromArray(toCreate)
              // }

              return node
            }).filter(x => x)

            pasted.content.content = result

            // console.log(JSON.stringify(pasted, null, 2))
            // console.log(pasted)

            return pasted
          },

          handleDOMEvents: {
            paste(x, y, z) {
              // console.log('tf', x, y, z)
            }
          },
        },
      }),
    ]
  }
}
