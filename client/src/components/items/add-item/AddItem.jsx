import { useCreate } from '../../../hook-api/UseCreate';
import './AddItem.css'

export default function AddItem() {

    const { createAction } = useCreate();

    return (
        <div className="register-container">
            <h2 className="register-title">Add an item</h2>
            <form className="register-form" action={createAction}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                />
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                />
                <label>Description:</label>
                <textarea
                    name="description"
                ></textarea>
                <div className="actions">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}