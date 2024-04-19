import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';

// Editor is an uncontrolled React component
interface EditorProps {
  className?: string;
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
}

const Editor = forwardRef<Quill, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef<any>(defaultValue);
    const onTextChangeRef = useRef<((...args: any[]) => void) | undefined>(onTextChange);
    const onSelectionChangeRef = useRef<((...args: any[]) => void) | undefined>(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(null);
      } else if (ref && ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      if (typeof ref === 'function') {
        ref(quill);
      } else if (ref) {
        // Set ref.current to the Quill instance
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on('text-change', (...args: any[]) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on('selection-change', (...args: any[]) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        // Cleanup function
        if (ref && typeof ref !== 'function' && ref.current) {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
