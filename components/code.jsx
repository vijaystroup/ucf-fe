import Editor from '@monaco-editor/react'

export default function Code({ theme }) {
  return (
    <>
      <Editor
        defaultLanguage='cpp'
        defaultValue='// Your solution here'
        theme={`vs-${theme}`}
      />
    </>
  )
}
