import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';

export const Editor = (props) => {
	const [editor, setEditor] = useState(null);
	const monacoEl = useRef(null);
  const navigate = useNavigate();

	useEffect(() => {
    const editorConfig = {
      value: 'Welcome! Please replace this text with your own.',
      automaticLayout: true,
      language: 'plaintext',
      theme: 'vs-dark',
      minimap: { enabled: false },
      contextmenu: true
    };

		if (monacoEl) {
			setEditor((editor) => {
				if (editor) return editor;

				return monaco.editor.create(monacoEl.current, editorConfig);
			});
		}

		return () => editor?.dispose();
	}, [monacoEl, editor]);

  useEffect(() => {
    if (editor) {
      editor.addAction({
        id: "create-new-character",
        label: "Create New Character",
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1,
        run: () => {
          const currentSelection =
          editor
              .getModel()
              .getValueInRange(editor.getSelection());
          console.log(currentSelection);
          navigate('create/character');
        },
      });

      editor.addAction({
        id: "create-new-world",
        label: "Create New World",
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyW
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 2,
        run: () => {
          const currentSelection =
          editor
              .getModel()
              .getValueInRange(editor.getSelection());
          console.log(currentSelection);
          navigate('create/world');
        },
      });

      editor.addAction({
        id: "ai-enhance",
        label: "Enhance with AI",
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyE
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 3,
        run: () => {
          const currentSelection =
          editor
              .getModel()
              .getValueInRange(editor.getSelection());
          console.log(currentSelection);
          if (currentSelection) {
            props.setContext(currentSelection);
            navigate('enhance');
          } else {
            alert('Please select text to enhance and then click "Enhance with AI"');
          }
        },
      });
    }
  }, [editor])

	return <div className={styles.Editor} ref={monacoEl}></div>;
};
