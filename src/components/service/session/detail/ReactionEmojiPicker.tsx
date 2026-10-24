import { EmojiPicker } from 'frimousse';

interface ReactionEmojiPickerProps {
  onSelect: (emoji: string) => void;
}

/** 반응용 이모지 피커. 번들 분리를 위해 ReactionBar에서 lazy로 불러온다 */
const ReactionEmojiPicker = ({ onSelect }: ReactionEmojiPickerProps) => (
  <EmojiPicker.Root
    locale="ko"
    columns={8}
    onEmojiSelect={({ emoji }) => onSelect(emoji)}
    className="isolate flex h-96 w-fit flex-col bg-white"
  >
    <EmojiPicker.Search
      placeholder="이모지 검색"
      className="m-2 rounded-md border border-neutral-300 px-3 py-2 text-base outline-none"
    />
    <EmojiPicker.Viewport className="relative flex-1 outline-none">
      <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-neutral-400">
        불러오는 중…
      </EmojiPicker.Loading>
      <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-neutral-400">
        검색 결과가 없습니다.
      </EmojiPicker.Empty>
      <EmojiPicker.List
        className="select-none pb-2"
        components={{
          CategoryHeader: ({ category, ...props }) => (
            <div
              className="bg-white px-3 pt-3 pb-1 text-sm font-bold text-neutral-500"
              {...props}
            >
              {category.label}
            </div>
          ),
          Row: ({ children, ...props }) => (
            <div className="scroll-my-1 px-2" {...props}>
              {children}
            </div>
          ),
          Emoji: ({ emoji, ...props }) => (
            <button
              className="flex size-10 items-center justify-center rounded-md text-2xl data-[active]:bg-neutral-100"
              {...props}
            >
              {emoji.emoji}
            </button>
          ),
        }}
      />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
);

export default ReactionEmojiPicker;
