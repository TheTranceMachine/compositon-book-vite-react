import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';

export const Editor = () => {
	const [editor, setEditor] = useState(null);
	const monacoEl = useRef(null);
  const editorConfig = {
		value: 'test',
		automaticLayout: true,
		language: 'plaintext',
		theme: 'vs-dark',
		minimap: { enabled: false },
		contextmenu: true
	};

	useEffect(() => {
		if (monacoEl) {
			setEditor((editor) => {
				if (editor) return editor;

				return monaco.editor.create(monacoEl.current, editorConfig);
			});
		}

		return () => editor?.dispose();
	}, [monacoEl.current, editor]);

	return <div className={styles.Editor} ref={monacoEl}></div>;
};
