import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: 'AIzaSyBDdpJREvIVmflOZTMYiZ8x5s6TBw2SCdc',
    authDomain: 'nosql-3009.firebaseapp.com',
    projectId: 'nosql-3009',
    storageBucket: 'nosql-3009.appspot.com',
    messagingSenderId: '941570195347',
    appId: '1:941570195347:web:31182d6546eb1ff2873266',
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function UploadMaterials() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const storageRef = ref(storage, `/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Failed to upload file. Please try again later.");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownloadURL(url);
                    alert("File uploaded successfully!");
                });
            }
        );
    };

    const handleLogout = () => {
        setTimeout(() => {
            navigate('/Home');
        }, 1500);
    };

    return (
        <div style={{ backgroundColor:"#c5c6d0" }}>
            <nav className="navbar navbar-expand-lg" id="admin-panel-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/">Admin Panel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li id="ce" className="nav-item">
                                <Link className="nav-link" to="/create-employee">Create Employee</Link>
                            </li>
                            <li id="el" className="nav-item">
                                <Link className="nav-link" to="/employee-list">Employee List</Link>
                            </li>
                            <li id="ca" className="nav-item">
                                <Link className="nav-link" to="/check-attendance">Check Attendance</Link>
                            </li>
                            <li id="ca" className="nav-item">
                                <Link className="nav-link" to="/upload-materials">Upload Materials</Link>
                            </li>
                            <li id="log" className="nav-item">
                                <Link className="nav-link" to="/Home" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px", width: "100%" }}>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
                {downloadURL && <p>Download URL: {downloadURL}</p>}
            </div>
        </div>
    );
}

export default UploadMaterials;
