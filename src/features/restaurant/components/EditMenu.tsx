import React, { useEffect, useState } from "react";
import { addFoodToMenu, getFoodByMenu, getFoodOfRestaurant } from "../hooks/hooks";


export const EditMenuModal = ({
    open,
    onClose,
    idRestaurant,
    menu,
    onFoodAdded,
}) => {
    const [allFoods, setAllFoods] = useState([]);
    const [menuFoods, setMenuFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [adding, setAdding] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        Promise.all([
            getFoodOfRestaurant(idRestaurant),
            getFoodByMenu(menu.idMenu),
        ]).then(([all, onMenu]) => {
            setAllFoods(all || []);
            setMenuFoods(onMenu || []);
            setLoading(false);
        });
    }, [open, idRestaurant]);

    const availableToAdd = allFoods.filter(
        (f) => !menuFoods.some((mf) => mf.idFood === f.idFood)
    );
    const filteredFoods = availableToAdd.filter(
        (f) =>
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddFood = async (idFood) => {
        setAdding((a) => ({ ...a, [idFood]: true }));
        try {
            await addFoodToMenu(menu.idMenu, idFood);
            const newMenuFoods = await getFoodByMenu(menu.idMenu);
            setMenuFoods(newMenuFoods || []);
            if (onFoodAdded) onFoodAdded();
        } finally {
            setAdding((a) => ({ ...a, [idFood]: false }));
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh]">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-medium">Edit Menu: {menu.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900"
                            placeholder="Search food to add..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    {loading ? (
                        <div className="text-center text-gray-500 py-10">Loading foods...</div>
                    ) : (
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {filteredFoods.length === 0 ? (
                                <div className="text-gray-400 text-center py-8">
                                    No available food found.
                                </div>
                            ) : (
                                filteredFoods.map((food) => (
                                    <div
                                        key={food.idFood}
                                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={food.image}
                                                alt={food.name}
                                                className="w-16 h-16 rounded-lg object-cover mr-4"
                                            />
                                            <div>
                                                <div className="font-medium text-gray-800">{food.name}</div>
                                                <div className="text-sm text-gray-500">{food.description}</div>
                                                <div className="text-xs text-gray-400">
                                                    {food.status === "available" ? (
                                                        <span className="text-green-600">Available</span>
                                                    ) : (
                                                        <span className="text-red-600">Unavailable</span>
                                                    )}
                                                    &nbsp;•&nbsp;${food.price}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAddFood(food.idFood)}
                                            className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-900/90 text-sm"
                                            disabled={adding[food.idFood]}
                                        >
                                            {adding[food.idFood] ? "Adding..." : "Add"}
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
