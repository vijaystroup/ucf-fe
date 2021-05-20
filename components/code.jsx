import Editor from '@monaco-editor/react'

export default function Code() {
  return (
    <>
      <Editor
        defaultLanguage='cpp'
        defaultValue='// Your solution here'
        theme='vs-dark'
      />
    </>
  )
}
