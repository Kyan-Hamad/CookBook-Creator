import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddToContentsForm from './AddToContentsForm';
import '../Styles/BookDetails.css';

const BookDetails = () => {
    const { title } = useParams();
    const [tableOfContents, setTableOfContents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${title}`);
                setTableOfContents(response.data.tableOfContents.split('\n'));
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [title]);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleContentClick = (content) => {
        if (content && content.startsWith && content.startsWith('<a href=')) {
            const url = content.split('"')[1];
            navigate(`/books/${title}/${url}`);
        }
    };

    const renderContent = (content, index) => {
        if (content && content.startsWith && content.startsWith('<a href=')) {
            const url = content.split('"')[1];
            const text = content.match(/>([^<]*)<\/a>/)[1];
            return <span className="link" onClick={() => navigate(`/books/${title}/${url}`)}>{text}</span>;
        } else {
            return <h3 className="header-3">{content}</h3>;
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
                                            <p
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => handleContentClick(content)}
                                            >
                                                {renderContent(content, index)}
                                            </p>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </DragDropContext>
            <button onClick={handleShowForm}>Edit TOC</button>
            {showForm && <AddToContentsForm title={title} tableOfContents={tableOfContents} setTableOfContents={setTableOfContents} setShowForm={setShowForm} />}
        </div>
    );
};

export default BookDetails;
