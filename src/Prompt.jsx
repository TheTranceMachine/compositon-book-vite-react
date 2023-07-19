import { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PromptDropdown } from './components/PromptDropdown';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './Prompt.scss';

export const Prompt = () => {
	const [editor, setEditor] = useState(null);
  const [context, setContext] = useOutletContext();
	const monacoEl = useRef(null);
  const { currentSelection } = context;

  console.log(currentSelection);
 
	useEffect(() => {
    const editorConfig = {
      value: currentSelection,
      automaticLayout: true,
      language: 'plaintext',
      theme: 'vs-dark',
      minimap: { enabled: false },
      contextmenu: true
    };
    
		if (monacoEl) {
      setEditor((editor) => {
        if (editor) {
          return editor;
        } else {
          return monaco.editor.create(monacoEl.current, editorConfig);
        }
			});
		}

		return () => editor?.dispose();
	}, [monacoEl]);

  useEffect(() => {
    setEditor((editor) => {
      editor.setValue(currentSelection);
      return editor;
    });
  }, [currentSelection]);

	return (
    <>
    <PromptDropdown />
    <div className="prompt__editor" ref={monacoEl}></div>
    </>
  );
};
