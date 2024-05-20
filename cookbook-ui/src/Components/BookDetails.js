import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/EditPageForm.css';

const EditPageForm = ({ onSave, pageId, recipeStory: initialStory, ingredients: initialIngredients, steps: initialSteps }) => {
    const [recipeStory, setRecipeStory] = useState(initialStory || '');
    const [ingredients, setIngredients] = useState(initialIngredients || [{ name: '', quantity: '', unit: '' }]);
    const [steps, setSteps] = useState(initialSteps || ['']);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectMode(false);
                setSelectedItems([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleIngredientChange = (index, key, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleStepChange = (index, value) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleSelectClick = () => {
        setSelectMode(true);
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

    const handleDeleteClick = async () => {
        try {
            const updatedIngredients = ingredients.filter((_, index) => !selectedItems.includes(index));
            setIngredients(updatedIngredients);
            setSelectedItems([]);
            setSelectMode(false);
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    const submitForm = async () => {
        try {
            const response = await axios.put(`https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/pages/${pageId}`, {
                recipeStory,
                ingredients,
                steps
            });
            onSave(response.data.page);
        } catch (error) {
            console.error('Error updating page:', error);
        }
    };

    // Define metric and US units, including the dry versions
    const metricUnits = ['L', 'ml', 'g', 'kg'].sort();
    const usUnits = ['teaspoon', 'dry tablespoon', 'tablespoon', 'dry teaspoon', 'fl oz', 'cup', 'dry cup', 'pints', 'quarts', 'gallons', 'oz', 'lbs'].sort();

    return (
        <div className="edit-page-form">
            <h3>Edit Page</h3>
            <form>
                <div>
                    <label>Recipe Story (optional):</label>
                    <textarea
                        value={recipeStory}
                        onChange={(e) => setRecipeStory(e.target.value)}
                        placeholder="Enter recipe story"
                        className="recipe-story"
                    ></textarea>
                </div>
                <div>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-inputs">
                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                placeholder="Ingredient"
                                className="ingredient-name"
                            />
                            <input
                                type="number"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                placeholder="Quantity"
                                className="ingredient-quantity"
                            />
                            <select
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                className="ingredient-unit"
                            >
                                <option value="">Unit</option>
                                <optgroup label="Metric">
                                    {metricUnits.map((unit) => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="US">
                                    {usUnits.map((unit) => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </optgroup>
                            </select>
                            {selectMode && (
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="ingredient-select-checkbox"
                                />
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient} className="add-ingredient-button">Add Ingredient</button>
                    {selectMode ? (
                        <button type="button" onClick={selectedItems.length > 0 ? handleDeleteClick : () => setSelectMode(false)} className="delete-selected-button">
                            {selectedItems.length > 0 ? 'Delete' : 'Cancel'}
                        </button>
                    ) : (
                        <button type="button" onClick={handleSelectClick} className="select-ingredient-button">Select</button>
                    )}
                </div>
                <div>
                    <label>Steps:</label>
                    {steps.map((step, index) => (
                        <div key={index} className="step-inputs">
                            <textarea
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                placeholder={`Step ${index + 1}`}
                                className="step"
                            ></textarea>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddStep} className="add-step-button">Add Step</button>
                </div>
                <div className='button-container'>
                    <button type="button" onClick={submitForm} className="save-button">Save Page</button>
                </div>
            </form>
        </div>
    );
};

export default EditPageForm;
