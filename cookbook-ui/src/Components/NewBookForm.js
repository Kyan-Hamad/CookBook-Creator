import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import '../Styles/NewBookForm.css';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY; // AWS S3 credentials to allow for immage upload


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const NewBookForm = () => { // This component is the form to add a new book
  const [title, setTitle] = useState('');
  const [tableOfContents, setTableOfContents] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTableOfContentsChange = (e) => {
    setTableOfContents(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToS3 = (file) => { // This part handles the image upload to S3
    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: `uploads/${Date.now()}-${file.name}`,
        ContentType: file.type,
      };

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const imagePath = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${params.Key}`;
            console.log('Image uploaded to:', imagePath);
            resolve(imagePath);
          }
        });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = '';
      if (image) {
        imagePath = await uploadImageToS3(image);
      }
      console.log('Final image path:', imagePath); 
      const formData = new FormData();
      formData.append('title', title);
      formData.append('tableOfContents', tableOfContents);
      formData.append('imagePath', imagePath);
      console.log('Sending book data:', {
        title,
        tableOfContents,
        imagePath,
      }); 
      await axios.post('https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="new-book-form">
    <h2>Create New Book</h2>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          placeholder='Book Title'
        />
        <label htmlFor="tableOfContents"></label>
        <input
          type="text"
          id="tableOfContents"
          value={tableOfContents}
          onChange={handleTableOfContentsChange}
          placeholder='Table of Contents'
        />
        <label id='container-for-image-button' htmlFor="image">Upload Image:</label>
        <input 
          id="image-uploader"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
        />
      </div>
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      <button type="submit">Create Book</button>
    </form>
  </div>
);
};

export default NewBookForm;

