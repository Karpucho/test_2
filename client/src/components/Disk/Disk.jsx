import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import FileList from './FileList//FileList'
import Popup from './Popup';
import './disk.less'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';


function Disk(props) {

  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)

  useEffect(()=> {
    dispatch(getFiles(currentDir))
  }, [currentDir]) // возможно в массив добавить dispatch

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler() {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  // function dragOverHandler(event) {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   setDragEnter(true)
  // }

  return ( !dragEnter ?
    <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <div className="disk_btns">
        {currentDir && <button className="disk_back" onClick={() => backClickHandler()}>Назад</button>}
        <button className="disk_create" onClick={() => showPopupHandler()}>Создать папку</button>
        <div className="disk_upload">
          <label htmlFor="disk_upload-input" className="disk_upload-label">Загрузить файл</label>
          <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk_upload-input" className="disk_upload-input" />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
    :
    <div className="drop-area" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Переместите сюда файлы
    </div>
  );
}

export default Disk;

