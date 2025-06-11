'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { FC, useEffect } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

const RichTextEditor: FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          class: 'text-blue-500 hover:underline',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none min-h-[200px] p-2 focus:outline-none',
      },
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return <div className="border rounded-lg p-4">Loading editor...</div>
  }

  return (
    <div className="space-y-2 border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Heading 2"
        >
          H2
        </button>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Bullet List"
        >
          <span>•</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Numbered List"
        >
          <span>1.</span>
        </button>

        {/* Links */}
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href
            const url = window.prompt('URL', previousUrl || 'https://')

            if (url === null) return
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run()
              return
            }

            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
          }}
          className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          title="Link"
        >
          <span>Link</span>
        </button>

        {/* Images */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter the URL of the image:')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Image"
        >
          <span>Image</span>
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Context Menus */}
      {/* {editor && (
        <>
          <BubbleMenu editor={editor} className="flex gap-1 p-1 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              Italic
            </button>
            <button
              onClick={() => {
                const previousUrl = editor.getAttributes('link').href
                const url = window.prompt('URL', previousUrl || 'https://')
                if (url === null) return
                if (url === '') {
                  editor.chain().focus().extendMarkRange('link').unsetLink().run()
                  return
                }
                editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
              }}
              className={`p-1 rounded ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              Link
            </button>
          </BubbleMenu>

          <FloatingMenu editor={editor} className="flex gap-1 p-1 bg-white dark:bg-gray-800 shadow-lg rounded border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              List
            </button>
          </FloatingMenu>
        </>
      )} */}
    </div>
  )
}

export default RichTextEditor
