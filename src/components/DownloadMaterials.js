import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: 'AIzaSyBDdpJREvIVmflOZTMYiZ8x5s6TBw2SCdc',
  authDomain: 'nosql-3009.firebaseapp.com',
  projectId: 'nosql-3009',
  storageBucket: 'nosql-3009.appspot.com',
  messagingSenderId: '941570195347',
  appId: '1:941570195347:web:31182d6546eb1ff2873266',
};


const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

function DownloadFile() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage);
        const allFiles = await listAll(storageRef);
        const fileNames = allFiles.items.map(item => item.name);
        setFiles(fileNames);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (fileName) => {
    const fileRef = ref(storage, fileName);
    try {
      const downloadURL = await getDownloadURL(fileRef);
      window.open(downloadURL, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('inTime');
    setTimeout(() => {
      navigate('/Home');
    }, 1500);
  };
  const containerStyle = {
    backgroundColor:'#c5c6d0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign:'center', 
};
const textStyle = {
  backgroundColor:'#f8f9fa',
  border: '1px solid #ccc',
  padding: '20px', 
  borderRadius: '8px',
  width:'70%',
  fontFamily:'Calibri',
  fontWeight:'700px',
}

return (
  <div>
    <nav className="navbar navbar-expand-lg" id="emp-panel-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Employee Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/record-time" id="rte">
                Record Time Entries
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/attendance-queries" id="aq">
                Attendance Queries
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/download-materials" id="aq">
                Download Materials
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Home" onClick={handleLogout} id="logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style={containerStyle}>
      <div style={textStyle}>
        <br/><br/>
        <h2><strong>Files Available for Download</strong></h2>
        <br/>
        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
          {files.map((fileName, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '20px', width: '100%', maxWidth: '300px' }}>{fileName}</span>
              <button style={{ backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', padding: '7px', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleDownload(fileName)}>
                Download {fileName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

}

export default DownloadFile;
