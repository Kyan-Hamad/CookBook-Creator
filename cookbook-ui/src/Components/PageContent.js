// PageContent.js
import React from 'react';
import EditPageForm from './EditPageForm';

const PageContent = ({ title, pageContent }) => {
    return (
        <div>
            <h2>{title}</h2>
            {/* Display the page content */}
            <div dangerouslySetInnerHTML={{ __html: pageContent }}></div>
            {/* Render the EditPageForm */}
            <EditPageForm title={title} />
        </div>
    );
};

export default PageContent;
