import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ url }) => {
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    })

    const onChangeHandler = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!image) {
            toast.error("Please upload an image")
            return
        }

        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("price", Number(data.price))
            formData.append("category", data.category)
            formData.append("image", image)

            const response = await axios.post(
                `${url}/api/food/add`,
                formData
            )

            if (response.data.success) {
                toast.success("Food added successfully")
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                })
                setImage(null)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Image upload failed")
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        rows="6"
                        name="description"
                        value={data.description}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            name="category"
                            value={data.category}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add
