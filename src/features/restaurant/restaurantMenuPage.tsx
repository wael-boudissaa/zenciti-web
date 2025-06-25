import React, { useEffect, useState } from "react";
import { MenuList } from "./components/MenuList";
import { ActiveMenuContent } from "./components/ActiveMenu";
import { MenuStatsSidebar } from "./components/MenuStats";
import { CreateMenuModal } from "./components/CreateMenuModel";
import {
    getCategoryFoodOfRestaurant,
    getMenuRestaurant,
    getFoodOfMenuActive,
    getFoodByMenu
} from "./hooks/hooks";

// Main Restaurant Menu Page
const RestaurantMenuPage = ({ idRestaurant }) => {
    const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);

    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);
    const [inactiveMenus, setInactiveMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    // The currently viewed menu (id), not just the active one
    const [viewedMenu, setViewedMenu] = useState(null);
    const [viewedMenuFoods, setViewedMenuFoods] = useState([]);
    const [foodLoading, setFoodLoading] = useState(false);

    // Fetch menus and categories
    useEffect(() => {
        setLoading(true);
        Promise.all([
            getMenuRestaurant(idRestaurant),
            getCategoryFoodOfRestaurant(idRestaurant),
        ])
            .then(([menusRes, categoriesRes]) => {
                const menusData = menusRes || [];
                const categoriesData = categoriesRes || [];

                setMenus(menusData);
                setCategories(categoriesData);

                // Find active menu and group inactives
                const active = menusData.find((m) => m.active);
                setActiveMenu(active || null);
                setInactiveMenus(menusData.filter((m) => !m.active));

                // By default, view the active menu
                setViewedMenu(active || null);

                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant]);

    // Fetch foods for the *viewed* menu (active or chosen inactive)
    useEffect(() => {
        if (!viewedMenu) {
            setViewedMenuFoods([]);
            return;
        }
        setFoodLoading(true);

        const fetchFoods = viewedMenu.active
            ? getFoodOfMenuActive(idRestaurant)
            : getFoodByMenu(viewedMenu.idMenu);

        fetchFoods
            .then((foods) => {
                setViewedMenuFoods(foods || []);
                setFoodLoading(false);
            })
            .catch(() => setFoodLoading(false));
    }, [idRestaurant, viewedMenu]);

    // Prepare data for MenuList (pass handlers for view)
    const inactiveMenusData = inactiveMenus.map((menu) => ({
        name: menu.name,
        lastActive: menu.createdAt
            ? new Date(menu.createdAt).toLocaleDateString()
            : "",
        idMenu: menu.idMenu,
        menuObj: menu,
    }));

    // Prepare data for ActiveMenuContent (for the viewed menu)
    const viewedMenuData =
        viewedMenu &&
            categories &&
            Array.isArray(viewedMenuFoods)
            ? {
                name: viewedMenu.name,
                since: viewedMenu.createdAt
                    ? new Date(viewedMenu.createdAt).toLocaleDateString()
                    : "",
                categories: [
                    "All Items",
                    ...categories.map((c) => c.nameCategorie),
                ],
                items: viewedMenuFoods.map((item) => ({
                    name: item.name,
                    desc: item.description,
                    category:
                        categories.find((c) => c.idCategory === item.idCategory)
                            ?.nameCategorie || "",
                    price: item.price,
                    image: item.image,
                    status:
                        item.status === "available"
                            ? "Available"
                            : "Unavailable",
                    statusColor:
                        item.status === "available"
                            ? "green-600"
                            : "red-600",
                })),
            }
            : null;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <span className="text-gray-400">Loading menus...</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <MenuList
                    activeMenu={
                        activeMenu
                            ? {
                                name: activeMenu.name,
                                since: activeMenu.createdAt
                                    ? new Date(activeMenu.createdAt).toLocaleDateString()
                                    : "",
                                idMenu: activeMenu.idMenu,
                                menuObj: activeMenu,
                            }
                            : null
                    }
                    inactiveMenus={inactiveMenusData}
                    onCreateMenu={() => setShowCreateMenuModal(true)}
                    onViewMenu={(menuObj) => setViewedMenu(menuObj)}
                    viewedMenuId={viewedMenu?.idMenu}
                />
                {viewedMenuData &&
                    (foodLoading ? (
                        <div className="text-gray-400 text-center py-10">
                            Loading menu items...
                        </div>
                    ) : (
                        <ActiveMenuContent activeMenu={viewedMenuData} />
                    ))}
            </div>
            <MenuStatsSidebar idRestaurant={idRestaurant} />
            <CreateMenuModal
                open={showCreateMenuModal}
                onClose={() => setShowCreateMenuModal(false)}
            />
        </div>
    );
};

export default RestaurantMenuPage;
