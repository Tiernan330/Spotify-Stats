import { useNavigate } from 'react-router';
import React, { useState } from 'react';


import './CSS/Themes.css';
import './CSS/SpotifyAPI.css';
import { ReactComponent as UploadFolder } from './Images/folder-plus.svg'

let fileFound = false;

function FolderUpload(props) {
  const {theme} = props
  const history = useNavigate(); // Initialize useHistory
  const types = ['Extended', 'Account'];
  const [active, setActive] = useState(types[0]);
  const [error, setError] = useState(false);

  const Upload = (event) => {
    const files = event.target.files
    if(active === 'Extended'){check('endsong', files)}
    else{check('StreamingHistory', files)}

    if (fileFound){history('/Data/'+active, { state: { data: files, type: active} })}
    else{setError(true)}
  };

  const handleImageClick = () => {document.getElementById('folder').click()};

  return (
    <div id={theme+'-Secondary'} className='Folder-Upload-Container'>

      <form id={theme+'-Tertiary'} onClick={handleImageClick}>
        <UploadFolder alt="Upload Folder" width={150} height={150} />
        <p>Browse to Upload Folder</p>
        <input type="file" name="folder" id="folder" webkitdirectory="true" onChange={Upload} hidden />
      </form>

      <div className='button-container'>

        {types.map((type, index) => (
          <React.Fragment key={type}>

            <button
              id={theme+'-Tertiary'}
              className={active === type ? "active type-button" : "type-button"}
              onClick={() => setActive(type)}
            >
              {type + ' Data'}
            </button>

            {index !== types.length - 1 && <span className="button-spacer" />}

          </React.Fragment>
        ))}

      </div>

      {error && <p>Error! Please check if you selected the correct folder!</p>}

    </div>
  );
  
}

function check(phrase, files){
  for (let i = 0; i < files.length; i++) {
    if (files[i].name.includes(phrase)) {
      fileFound = true;
      break;
    }
  }
}

export default FolderUpload;
