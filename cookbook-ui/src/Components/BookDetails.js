import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../Styles/BookDetails.css';
import AddToContentsForm from './AddToContentsForm';
import '../Styles/BookDetails.css';

const BookDetails = () => {
    const { title } = useParams();
    const [tableOfContents, setTableOfContents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [pageId, setPageId] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectMode, setSelectMode] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://65zk9v8soi.execute-api.us-east-1.amazonaws.com/Prod/api/books/${title}`);
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
        if (selectMode) return; 
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
            const text = content.match(/>([^<]*)<\/a>/)[1];

            return (
                <span className="link" onClick={() => handleContentClick(content)}>
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
            const response = await axios.put(`https://65zk9v8soi.execute-api.us-east-1.amazonaws.com/Prod/api/books/${title}`, { tableOfContents: items.join('\n') });
            console.log('Table of contents updated:', response.data);
        } catch (error) {
            console.error('Error updating table of contents:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const updatedTableOfContents = tableOfContents.filter((_, index) => !selectedItems.includes(index));
            await axios.put(`https://65zk9v8soi.execute-api.us-east-1.amazonaws.com/Prod/api/books/${title}`, { tableOfContents: updatedTableOfContents.join('\n') });
            setTableOfContents(updatedTableOfContents);
            setSelectedItems([]);
            setSelectMode(false); 
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    const handleCheckboxChange = (index) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter((item) => item !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };

    const handleSelectClick = () => {
        setSelectMode(true); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setSelectMode(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                                                {selectMode && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(index)}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                )}
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
            <div className="button-container">
                {selectMode ? ( 
                    <button className="delete-button" onClick={handleDeleteClick}>
                        {selectedItems.length > 0 ? 'Confirm Delete' : 'Cancel'}
                    </button>
                ) : (
                    <button className="select-button" onClick={handleSelectClick}>Select</button>
                )}
                <button className="add-button" onClick={() => setShowForm(true)}>Add Content</button>
            </div>
            {showForm && !pageId && <AddToContentsForm title={title} tableOfContents={tableOfContents} setTableOfContents={setTableOfContents} setShowForm={setShowForm} />}
        </div>
    );
};

export default BookDetails;