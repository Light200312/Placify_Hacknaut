import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';

function CodeEditor({ code, language, onChange, readOnly = false }) {
  return (
    <AceEditor
      mode={language.toLowerCase()}
      theme="monokai"
      onChange={onChange}
      value={code}
      readOnly={readOnly}
      name="CODE_EDITOR_AREA"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
      width="100%"
      height="400px"
      className="rounded-lg border shadow-inner"
    />
  );
}

export default CodeEditor;
