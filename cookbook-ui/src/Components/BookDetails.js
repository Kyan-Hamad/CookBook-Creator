import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../Styles/BookDetails.css';
import AddToContentsForm from './AddToContentsForm';
import EditPageForm from './EditPageForm';

const BookDetails = () => {
    const { title } = useParams();
    const [tableOfContents, setTableOfContents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [pageId, setPageId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${title}`);
                if (response.data && response.data.tableOfContents) {
                    setTableOfContents(response.data.tableOfContents.split('\n'));
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [title]);
    
    const handleContentClick = (content) => {
        if (content && content.startsWith && content.startsWith('<a href=')) {
            const url = content.split('"')[1];
            navigate(`/books/${title}/${url}`);
        } else {
            setPageId(content);
            setShowForm(true);
        }
    };

    const renderContent = (content, index) => {
        if (content && content.startsWith && content.startsWith('<a href=')) {
            const url = content.split('"')[1];
            const text = content.match(/>([^<]*)<\/a>/)[1];
            return (
                <span className="link" onClick={() => navigate(`/books/${title}/${url}`)}>
                    <span>{text}</span>
                </span>
            );
        } else {
            return <span className="header-3">{content}</span>;
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(tableOfContents);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTableOfContents(items);

        try {
            const response = await axios.put(`http://localhost:5000/api/books/${title}`, { tableOfContents: items.join('\n') });
            console.log('Table of contents updated:', response.data);
        } catch (error) {
            console.error('Error updating table of contents:', error);
        }
    };

    return (
        <div className='Book-Page'>
            <h2>{title}</h2>
            <h5>Table of Contents:</h5>
            <DragDropContext onDragEnd={onDragEnd}>
                {tableOfContents.length > 0 && (
                    <Droppable droppableId="table-of-contents-list">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tableOfContents.map((content, index) => (
                                    <Draggable key={index} draggableId={`content-${index}`} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="drag-handle"
                                            >
                                                <span
                                                    {...provided.dragHandleProps}
                                                    onClick={() => handleContentClick(content)}
                                                >
                                                    {renderContent(content, index)}
                                                </span>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </DragDropContext>
            <div className="add-button-container">
                <button className="add-button" onClick={() => setShowForm(true)}>Add Content</button>
            </div>
            {showForm && !pageId && <AddToContentsForm title={title} tableOfContents={tableOfContents} setTableOfContents={setTableOfContents} setShowForm={setShowForm} />}
            {showForm && pageId && <EditPageForm onSave={() => setShowForm(false)} pageId={pageId} />}
        </div>
    );
};

export default BookDetails;
