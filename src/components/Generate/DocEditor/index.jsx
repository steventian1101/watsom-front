import React, {useState} from 'react';

import { useTranslation } from "react-i18next";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import wordsCounter from 'word-counting'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css"

export default function DocEditor() {
  const { t } = useTranslation()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [markDownString, setMarkDownString] = useState("")

  const onEditorStateChange = value => {
    setEditorState(value);
    setMarkDownString(draftToMarkdown(convertToRaw(value.getCurrentContent())));
  }

  const [doc_name, setDocName] = useState("Untitled Document");   //documen name 

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
    padding: '1rem',
    borderRadius: '2px',
    height: 'calc(100vh - 7rem)',
    width: '100%',
  };

  return (
    <div className='h-screen'>
      {/* document name */}
      <div className='border-gray-300' style={{borderBottomWidth: "1px", height: "2rem"}}>
        <input 
          placeholder="Document Name"
          required={true}
          value={doc_name}
          onChange={(e) => changeSearch(e)}
          onKeyDown={(e) => keyDownSearch(e)}
          className="w-1/3 self-center border-none ml-2 text-site_dark-100 text-sm my-1"
        />
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
        <div className='border-gray-300 my-2 text-sm pl-2' style={{borderTopWidth: "1px", height: "2rem"}}>
          {wordsCounter(markDownString).wordsCount} Words • {markDownString.length} Characters
        </div>
      </div>
  </div>
  );
}
