import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { editorStore, storeCurrentSelection } from '../../reducers/editorReducer';
import { useToast } from '../../hooks/useToast';
import './Editor.scss';

export const Editor = ({ resizePanel }) => {
  const [editor, setEditor] = useState(null);
  const monacoEl = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const editorConfig = {
      value: 'Welcome! Please replace this text with your own.',
      automaticLayout: true,
      language: 'plaintext',
      theme: 'vs-dark',
      minimap: { enabled: false },
      contextmenu: true,
      wordWrap: 'on',
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
        id: 'create-new-character',
        label: 'Create New Character',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1,
        run: () => {
          const currentSelection = editor.getModel().getValueInRange(editor.getSelection());
          console.log(currentSelection);
          navigate('create/character');
        },
      });

      editor.addAction({
        id: 'create-new-world',
        label: 'Create New World',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyW],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 2,
        run: () => {
          const currentSelection = editor.getModel().getValueInRange(editor.getSelection());
          console.log(currentSelection);
          navigate('create/world');
        },
      });

      editor.addAction({
        id: 'ai-enhance',
        label: 'Enhance with AI',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyE],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 3,
        run: () => {
          const range = editor.getSelection();
          const currentSelection = editor.getModel().getValueInRange(range);
          if (currentSelection) {
            editorStore.dispatch(storeCurrentSelection({ range, currentSelection }));
            resizePanel();
            navigate('enhance');
          } else {
            alert('Please select text to enhance and then click "Enhance with AI"');
          }
        },
      });
    }
  }, [editor]);

  useEffect(() => {
    const subscription = editorStore.subscribe(({ range, enhancedSelection }) => {
      if (enhancedSelection !== '') {
        const options = {
          range,
          text: enhancedSelection,
        };
        editor.executeEdits('enhance-text', [options]);
        toast.success('Your text was enhanced!');
      }
    });

    return () => subscription.unsubscribe();
  }, [editor]);

  return <div className="editor" ref={monacoEl}></div>;
};
