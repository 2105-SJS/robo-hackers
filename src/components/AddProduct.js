import React, {useState} from 'react';
import {useHistory} from 'react-router';
import { callAPI } from '../api';

const AddProduct = ({user, setToken}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [inStock, setInStock] = useState(false);
    const [category, setCategory] = useState('');
    const [active, setActive] = useState(true);
    const history = useHistory();

    const handleAdd = async (event) => {
        event.preventDefault();
        const respObj = await callAPI({
            url:"products",
            method: "POST",
            body: {
                name, description,
                price,
                imageURL,
                inStock: true,
                category,
                active: true
            }
        })
        console.log(respObj)
        if(respObj) {
            setPrice(0);
            setToken(localStorage.getItem('token'));
            history.push('/products');
        }

    }

    return <>
        <div>Add a product</div>
        <form onSubmit = {handleAdd}>

        <div class="form-group">
        <label className = 'user-input' for="inputProductName6">Product name:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={name} onChange={(event) => setName(event.target.value)}></input>
        <br></br>
        <label className = 'user-input' for="inputDescription6">Description:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={description} onChange={(event) => setDescription(event.target.value)}></input>
        <br></br>
        <label className = 'user-input' for="inputPrice6">Price:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={price} onChange={(event) => setPrice(event.target.value)}></input>
        <br></br>
        <label className = 'user-input' for="inputImage6">Image?:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={imageURL} onChange={(event) => setImageURL(event.target.value)}></input>
        <br></br>
        <label className='user-input'>In Stock?: </label>
            <select onChange= {(event) => setInStock(event.target.value)}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
            </select>
        <br></br>
        <label className = 'user-input' for="inputCategory6">Category:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={category} onChange={(event) => setCategory(event.target.value)}></input>
        <br></br>
        <label className='user-input'>Active?: </label>
            <select onChange= {(event) => setActive(event.target.value)}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
            </select>
            <br></br>

            <button type='submit'>Add new product</button>
        </div>
        </form>
    </>
}

export default AddProduct;

