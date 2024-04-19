import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/EditPageForm.css';

const EditPageForm = ({ onSave, pageId, recipeStory: initialStory, ingredients: initialIngredients, steps: initialSteps }) => {
    // Initialize state with existing data from props
    const [recipeStory, setRecipeStory] = useState(initialStory || '');
    const [ingredients, setIngredients] = useState(initialIngredients || [{ name: '', quantity: '', unit: '' }]);
    const [steps, setSteps] = useState(initialSteps || ['']);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/pages/${pageId}`, {
                recipeStory,
                ingredients,
                steps
            });
            onSave(response.data.page);
        } catch (error) {
            console.error('Error updating page:', error);
        }
    };

    return (
        <div className="edit-page-form">
            <h3>Edit Page</h3>
            <form onSubmit={handleSubmit}>
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
                                <option value="oz">oz</option>
                                <option value="lbs">lbs</option>
                                <option value="cups">cups</option>
                                <option value="fl oz">fl oz</option> 
                                <option value="pints">pints</option>
                                <option value="quarts">quarts</option>
                                <option value="gallons">gallons</option>
                                <option value="tbsp">tbsp</option>
                                <option value="tsp">tsp</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="L">L</option>
                            </select>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient} className="add-ingredient-button">Add Ingredient</button>
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
                <button type="submit" className="save-button">Save Page</button>
            </form>
        </div>
    );
};

export default EditPageForm;
