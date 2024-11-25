import React, { useEffect, useRef } from "react"
import styles from "./MessageInput.module.scss"
import { ArrowUp } from "lucide-react"

type MessageInputProps = {
  input: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSend: () => void
  setHeight?: (height: number) => void
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  onChange,
  onSend,
  setHeight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
    if (containerRef.current && setHeight) {
      setHeight(containerRef.current.offsetHeight)
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input])

  return (
    <div ref={containerRef} className={styles.inputContainer}>
      <textarea
        ref={textareaRef}
        className={styles.input}
        value={input}
        onChange={(e) => {
          onChange(e)
          adjustHeight()
        }}
        placeholder="Type your message..."
        rows={1}
      />
      {input && (
        <button className={styles.button} onClick={onSend}>
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  )
}

export default MessageInput
