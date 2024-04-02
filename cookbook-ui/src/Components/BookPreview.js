import React from 'react';

const BookPreview = ({ title, tableOfContents }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Table of Contents: {tableOfContents}</p>
        </div>
    );
};

export default BookPreview;