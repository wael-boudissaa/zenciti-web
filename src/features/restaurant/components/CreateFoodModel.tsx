import React, { useState, useRef, useEffect } from "react";
import { createFood, getCategoryFoodOfRestaurant } from "../hooks/hooks";

const initialState = {
    idCategory: "",
    name: "",
    description: "",
    price: "",
    status: "available",
    image: null,
    imagePreview: null,
};

export const CreateFoodModal = ({
    open,
    onClose,
    idRestaurant,
    onFoodCreated,
}) => {
    const [form, setForm] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (open && idRestaurant) {
            getCategoryFoodOfRestaurant(idRestaurant).then((data) => {
                setCategories(data || []);
            });
        }
    }, [open, idRestaurant]);

    useEffect(() => {
        if (!open) {
            setForm(initialState);
        }
    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, imagePreview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        formData.append("idRestaurant", idRestaurant);
        formData.append("idCategory", form.idCategory);
        formData.append("idRestaurant", idRestaurant);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("status", form.status);
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            await createFood(formData);
            if (onFoodCreated) onFoodCreated();
            onClose();
        } catch (e) {
            alert("Failed to create food item.");
        }
        setUploading(false);
        setForm(initialState);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
                className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Create New Food</h3>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                        <select
                            name="idCategory"
                            value={form.idCategory}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        >
                            <option value="">Select category...</option>
                            {categories.map((cat) => (
                                <option key={cat.idCategory} value={cat.idCategory}>
                                    {cat.nameCategorie}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Food Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            min={0}
                            step={0.01}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center mr-4 overflow-hidden">
                                {form.imagePreview ? (
                                    <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <i className="fa-solid fa-image text-gray-400 text-2xl"></i>
                                )}
                            </div>
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                                onClick={handleUploadClick}
                                type="button"
                            >
                                Upload Image
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                            disabled={uploading}
                        >
                            {uploading ? "Creating..." : "Create Food"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateFoodModal;
