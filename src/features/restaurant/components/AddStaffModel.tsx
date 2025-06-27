import React, { useState, useRef } from "react";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nationnallity: "",
    nativeLanguage: "",
    address: "",
    quote: "",
    startWorking: "",
    position: "",
    image: null,
    imagePreview: null,
};

const AddStaffModal = ({ open, onClose, onSubmit }) => {
    const [form, setForm] = useState(initialState);
    const [bio, setBio] = useState(""); // For brief bio
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

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

        // Prepare form data for multipart/form-data
        const formData = new FormData();
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("email", form.email);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("nationnallity", form.nationnallity);
        formData.append("nativeLanguage", form.nativeLanguage);
        formData.append("address", form.address);
        formData.append("quote", form.quote);
        formData.append("startWorking", form.startWorking);
        formData.append("position", form.position);
        formData.append("bio", bio);
        if (form.image) {
            formData.append("image", form.image);
        }

        if (onSubmit) {
            await onSubmit(formData);
        }
        setUploading(false);
        setForm(initialState);
        setBio("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <form
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Add New Staff Member</h3>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                            <input
                                type="text"
                                name="nationnallity"
                                value={form.nationnallity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Native Language</label>
                            <input
                                type="text"
                                name="nativeLanguage"
                                value={form.nativeLanguage}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4 overflow-hidden">
                                {form.imagePreview ? (
                                    <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <i className="fa-solid fa-user text-gray-400 text-2xl"></i>
                                )}
                            </div>
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                                onClick={handleUploadClick}
                            >
                                Upload Photo
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
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                        <textarea
                            name="quote"
                            value={form.quote}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brief Bio</label>
                        <textarea
                            rows="3"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        ></textarea>
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
                            className="px-4 py-2 bg-green-900 text-white rounded-lg"
                            disabled={uploading}
                        >
                            {uploading ? "Adding..." : "Add Staff Member"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddStaffModal;
