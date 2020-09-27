import React, { useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import EditorMenuTitle from './editorTitle';
import { ReadModeTitle, ReadModeToolTip } from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/tagContainer';
import { TagContainer } from '../../styles/tagStyle';
import { modules, formats, config, editorInit } from '../../store/editorStore';
import { toJS } from 'mobx';
// import JoditEditor, { Jodit } from 'jodit-react';
import { Editor } from '@tinymce/tinymce-react'

const EditorMenuContainer = () => {
  const { NoteStore, PageStore, EditorStore } = useStore();
  let noteEditor = useRef(null);

  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    noteEditor = instance;
    console.log(noteEditor)
    setTimeout(() => {
      if (noteEditor !== null) {
        EditorStore.setEditor(instance);
        if (PageStore.isReadMode()) {

          console.log(noteEditor.editor);
          noteEditor.editor.setMode('readonly')
          // JQuery('.mce-menubar').hide();
          // JQuery('.mce-toolbar').hide();
          // if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'none'
        } else {
          noteEditor.editor.setMode('design')
          // JQuery('.mce-menubar').show();
          // JQuery('.mce-toolbar').show();
          // if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'block'
        }
      }
    }, 100)

  };

  return useObserver(() => (
    <>
      <EditorMenuTitle />
      {PageStore.isReadMode() ? (
        <ReadModeTitle style={{ display: 'flex' }}>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeToolTip>읽기 모드</ReadModeToolTip>
          <ReadModeToolTip>
            편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeToolTip>
        </ReadModeTitle>
      ) : (
          // null 로 했더니 에디터 밑에 생겨버림
          <ReadModeTitle style={{ display: 'none' }}>
            <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
            <ReadModeToolTip>읽기 모드</ReadModeToolTip>
            <ReadModeToolTip>
              편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeToolTip>
          </ReadModeTitle>
        )}
      <Editor
        id='noteEditor'
        ref={(editor) => setNoteEditor(editor)}
        value={PageStore.currentPageData.note_content}
        init={editorInit}
        onEditorChange={getEditorContent}
        apiKey="d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81"
        plugins='print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
        toolbar={PageStore.isReadMode() ? 'none' : 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl'}
      />
      {/* <JoditEditor
        editorRef={jodit => setNoteEditor(jodit)}
        onChange={getEditorContent}
        config={{
          buttons: config.buttons,
          uploader: config.uploader,
          placeholder: config.placeholder,
          toolbar: PageStore.isReadMode() ? false : true,
          height: PageStore.isReadMode()
            ? 'calc(100% - 8.6rem)'
            : 'calc(100% - 5.8rem)',
        }}
        value={PageStore.currentPageData.note_content}
      /> */}
      <TagContainer>
        <TagListContainer />
      </TagContainer>
    </>
  ));
};

export default EditorMenuContainer;
