import { EditorContent, useEditor, type Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ToolbarButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarButton = ({ active, onClick, children }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer px-3 py-1 text-xl font-bold rounded ${
      active ? 'bg-black text-white' : 'hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor }: { editor: TiptapEditor }) => (
  <div className="flex flex-wrap gap-1 border-b-2 p-2">
    <ToolbarButton
      active={editor.isActive('heading', { level: 1 })}
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
      H1
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('heading', { level: 2 })}
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    >
      H2
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('bold')}
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      B
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('italic')}
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      I
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('strike')}
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      S
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('bulletList')}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
    >
      •
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('orderedList')}
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
    >
      1.
    </ToolbarButton>
    <ToolbarButton
      active={editor.isActive('blockquote')}
      onClick={() => editor.chain().focus().toggleBlockquote().run()}
    >
      "
    </ToolbarButton>
  </div>
);

interface EditorProps {
  value: string;
  onChange: (html: string) => void;
  name?: string | null;
}

export const Editor = ({ value, onChange, name }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="p-4 text-xl
        [&_.tiptap]:outline-none
        [&_.tiptap]:min-h-64
        [&_.tiptap_h1]:text-4xl
        [&_.tiptap_h1]:font-bold
        [&_.tiptap_h1]:mt-4
        [&_.tiptap_h1]:mb-2
        [&_.tiptap_h2]:text-3xl
        [&_.tiptap_h2]:font-bold
        [&_.tiptap_h2]:mt-3
        [&_.tiptap_h2]:mb-2
        [&_.tiptap_ul]:list-disc
        [&_.tiptap_ul]:pl-6
        [&_.tiptap_ol]:list-decimal
        [&_.tiptap_ol]:pl-6
        [&_.tiptap_blockquote]:border-l-4
        [&_.tiptap_blockquote]:border-gray-300
        [&_.tiptap_blockquote]:pl-4
        [&_.tiptap_blockquote]:italic
        [&_.tiptap_blockquote]:text-gray-600
        [&_.tiptap_p]:my-2
      "
      />
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
};
