import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';

export const Editor = () => {
	const [editor, setEditor] = useState(null);
	const monacoEl = useRef(null);

	useEffect(() => {
    const editorConfig = {
      value: 'test',
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
        },
      })
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
        },
      })
    }
  }, [editor])

	return <div className={styles.Editor} ref={monacoEl}></div>;
};
