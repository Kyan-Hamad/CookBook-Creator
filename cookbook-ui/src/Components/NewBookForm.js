import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import '../Styles/NewBookForm.css';

const S3_BUCKET = 'cookbookbucket2';
const REGION = 'us-east-1';

AWS.config.update({
  accessKeyId: 'AKIA3FLDYIEFJAT4KSOB',
  secretAccessKey: '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'
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const NewBookForm = () => {
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

  const uploadImageToS3 = (file) => {
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
      console.log('Final image path:', imagePath); // Log the final image path
      const formData = new FormData();
      formData.append('title', title);
      formData.append('tableOfContents', tableOfContents);
      formData.append('imagePath', imagePath); // Ensure the imagePath is appended correctly
      console.log('Sending book data:', {
        title,
        tableOfContents,
        imagePath,
      }); // Log the book data before sending to the server
      await axios.post('https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
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
        <label htmlFor="tableOfContents">Table of Contents:</label>
        <input
          type="text"
          id="tableOfContents"
          value={tableOfContents}
          onChange={handleTableOfContentsChange}
          placeholder='Table of Contents'
        />
        <label htmlFor="image">Upload Image:</label>
        <input
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

