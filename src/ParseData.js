import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Standard from './Data/StandardData/Standard.js';
import Extended from './Data/ExtendedData/Extended.js';


import './CSS/SpotifyAPI.css'
import './CSS/Themes.css'
import './CSS/SpotifyParseData.css'

const MySpotifyData = (props) => {
  const {theme} = props
  const location = useLocation();
  const [data, setData] = useState([]);
  const files = location.state.data;
  const type = location.state.type;

  const parseFiles = useCallback(async () => {

    function readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    }

    async function loopFiles (type) {
      const streamingHistoryFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.includes(type)) {
          const fileContent = await readFileContent(file)
          streamingHistoryFiles.push({ name: file.name, content: fileContent });
        }
      } 

      const newTracks = streamingHistoryFiles.reduce((acc, { name, content }) => {
        const jsonContent = JSON.parse(content);
        return acc.concat(jsonContent);
      }, []);
      setData(newTracks);
    }

    if (type === 'Extended'){loopFiles('endsong')}
    else{loopFiles('StreamingHistory')}  
  }, [files, type]);

  useEffect(() => {parseFiles()}, [parseFiles]);

  if (data.length > 0){
    return (
        <div id={theme + '-Secondary'} className="SpotifyAPI SpotifyData">
          <div className='Data-Container'>

            {type === 'Extended' ? 
            (<Extended theme={theme} tracks={data} listCount={10} />)
            : 
            (<Standard theme={theme} tracks={data} listCount={10} />)
            }

          </div>
        </div>
    );
  }

  return (
    <div id={theme+'-Secondary'} className="loading-Container">
        <div className='Loading'>
          <div className='loader-Container'>
            <div className="loader">Loading...</div>
          </div>
          <p className='Loading-Text'>Parsing Through Your Data</p>
        </div>
    </div>
  );
};




export default MySpotifyData;
