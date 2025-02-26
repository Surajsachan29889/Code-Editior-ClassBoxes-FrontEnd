"use client";
import React from 'react';
import Editor, { OnChange, EditorProps } from '@monaco-editor/react';

interface MonacoEditorProps extends EditorProps {
  language: string;
  theme?: string;
  defaultValue?: string;
  onChange: OnChange;
  options?: EditorProps['options'];
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ language, theme = "vs-dark", defaultValue = "", onChange, options }) => {
  return (
    <Editor
      height="80vh"
      width="100%"
      language={language}
      theme={theme}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      className="rounded-lg"
    />
  );
};

export default MonacoEditor;
