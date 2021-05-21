import Editor from '@monaco-editor/react'

export default function Code({ theme, statistics }) {
  return (
    <>
      <Editor
        defaultLanguage='cpp'
        defaultValue={
          `// formula sheet: https://ucffe.vijaystroup.com/misc/FE-FormulaSheet.pdf${'\n'}` + 
          `// statistics: ${statistics}${'\n\n'}`
        }
        theme={`vs-${theme}`}
      />
    </>
  )
}
