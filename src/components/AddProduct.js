
import React, {useState} from 'react';
import {useHistory} from 'react-router';
import { callAPI } from '../api';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imgURL, setImgURL] = useState('');
    const [inStock, setInStock] = useState(false);
    const [category, setCategory] = useState('');
    const [active, setActive] = useState(true);
    const history = useHistory();

    const handleAdd = async (event) => {
        event.preventDefault();
        const respObj = await callAPI({
            url:"products",
            method: "POST",
            body: JSON.stringify({
                name, description,
                price,
                imgURL,
                inStock: true,
                category,
                active: true
            })

        })
        const data = await respObj.json();
        if(data) {
            history.push('/products');
        }

    }

    return <>
    {
        admin ? <>
        <div>Add a product</div>
        <form onSubmit = {handleAdd}>

            <label className='label'>Product: </label>
            <input type="text" required placeholder="name" value={name} onChange = {(event) => setName(event.target.value)}/>
            <hr></hr>
            
            <label className='label'>Description:</label>
            <input type="text" required placeholder="description" value={description} onChange = {(event) => setDescription(event.target.value)}/>
            <hr></hr>
            
            <label className='label'>Price: </label>
            <input type="text" required placeholder="price" value={price} onChange = {(event) => setPrice(event.target.value)}/>
            <hr></hr>

            <label className='label'>Image?: </label>
            <input type="text" required placeholder="image url" value={imgURL} onChange = {(event) => setImgURL(event.target.value)}/>
            <hr></hr>
            
            <label className='label'>In Stock?: </label>
            <select onChange= {(event) => setInStock(event.target.value)}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
            </select>
            <hr></hr>

            <label className='label'>Category: </label>
            <input type="text" required placeholder="category" value={category} onChange = {(event) => setCategory(event.target.value)}/>
            <hr></hr>

            <label className='label'>Active?: </label>
            <select onChange= {(event) => setActive(event.target.value)}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
            </select>
            <hr></hr>

            <button type='submit'>Add new product</button>

        </form>
        </> : null
    }
    </>

}

export default AddProduct;