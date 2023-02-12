import React, {useState} from 'react';

import { useTranslation } from "react-i18next";
import { TextInput } from 'flowbite-react';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DocEditor() {
  const { t } = useTranslation()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = value => {
    setEditorState(value);
  }

  const [doc_name, setDocName] = useState("New Document");   //documen name 

  const changeSearch = (e) => {
    setDocName(e.target.value);
  }

  const keyDownSearch = (e) => {
    if (e.keyCode === 13) {
      if (doc_name.trim()) {
        
      }
    }
  }

  const editorStyle = {
    position: 'relative',
    border: '1px solid black',
    padding: '5px',
    borderRadius: '2px',
    height: '100%',
    width: '100%',
    
  };

  return (
    <div className='h-full'>
      {/* document name */}
      <div>
        <div className='border-b-2 border-gray-300 py-2'>
          <input 
            placeholder="New Document"
            required={true}
            value={doc_name}
            onChange={(e) => changeSearch(e)}
            onKeyDown={(e) => keyDownSearch(e)}
            className="w-1/3 self-center border-none ml-2"
          />
        </div>
      </div>

      {/* wysi editor */}
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(value) => onEditorStateChange(value)}
          editorStyle={editorStyle}
          toolbar={{
            options: ['history', 'blockType', 'inline', 'list', 'emoji', ],
            inline: { 
              inDropdown: false,    
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            blockType: {
              inDropdown: false,
              options: ['H1', 'H2', 'H3'],
            },
            list: { 
              inDropdown: false,
              options: ['unordered', 'ordered'],
            },
            history: { inDropdown: false },
          }}
        />
      </div>

      <div>
        <div className='border-t-2 border-gray-300 py-2'>
          Words Characters
        </div>
      </div>
  </div>
  );
}
