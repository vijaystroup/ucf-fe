import Editor from '@monaco-editor/react'

export default function Code({ theme, comments }) {
  return (
    <>
      <Editor
        defaultLanguage='cpp'
        theme={`vs-${theme}`}
        value={comments}
      />
    </>
  )
}
