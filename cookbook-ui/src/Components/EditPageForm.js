import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/EditPageForm.css';

const EditPageForm = ({ onSave, pageId }) => {
    const [recipeStory, setRecipeStory] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const [steps, setSteps] = useState('');

    const handleIngredientChange = (index, key, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][key] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
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
        <div>
            <h3>Edit Page</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe Story (optional):</label>
                    <textarea
                        value={recipeStory}
                        onChange={(e) => setRecipeStory(e.target.value)}
                        placeholder="Enter recipe story"
                    ></textarea>
                </div>
                <div>
                    <label>Ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                placeholder="Ingredient"
                            />
                            <input
                                type="number"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                placeholder="Quantity"
                            />
                            <select
                                value={ingredient.unit}
                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            >
                                <option value="">Unit</option>
                                <option value="lbs">lbs</option>
                                <option value="tsp">tsp</option>
                                <option value="tbls">tbls</option>
                                {/* Add more options for units */}
                            </select>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                </div>
                <div>
                    <label>Steps:</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Enter steps"
                    ></textarea>
                </div>
                <button type="submit">Save Page</button>
            </form>
        </div>
    );
};

export default EditPageForm;
