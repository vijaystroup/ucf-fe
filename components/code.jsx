import Editor from '@monaco-editor/react'

export default function Code() {
  return (
    <>
      <Editor
        height='100%'
        defaultLanguage='cpp'
        defaultValue='// your solution'
        theme='vs-dark'
      />
    </>
  )
}
