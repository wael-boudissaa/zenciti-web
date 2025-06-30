import React, { useEffect, useState, useCallback } from "react";
import { MenuList } from "./components/MenuList";
import { ActiveMenuContent } from "./components/ActiveMenu";
import { MenuStatsSidebar } from "./components/MenuStats";
import { CreateMenuModal } from "./components/CreateMenuModel";
import {
    getCategoryFoodOfRestaurant,
    getMenuRestaurant,
    getFoodOfMenuActive,
    getFoodByMenu,
} from "./hooks/hooks";
import type {
    FoodByMenu, Menu, FoodCategory,
} from "./hooks/hooks";
import { EditMenuModal } from "./components/EditMenu";

const RestaurantMenuPage = ({ idRestaurant }) => {
    const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [categories, setCategories] = useState<FoodCategory[] | null>([]);
    const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
    const [inactiveMenus, setInactiveMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEditMenuModal, setShowEditMenuModal] = useState(false);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [viewedMenu, setViewedMenu] = useState<Menu | null>(null);
    const [viewedMenuFoods, setViewedMenuFoods] = useState<FoodByMenu[] | null>([]);
    const [foodLoading, setFoodLoading] = useState(false);

    const refreshMenus = useCallback(() => {
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
                const active = menusData.find((m) => m.active);
                setActiveMenu(active || null);
                setInactiveMenus(menusData.filter((m) => !m.active));
                setViewedMenu(active || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [idRestaurant]);

    useEffect(() => {
        refreshMenus();
    }, [refreshMenus]);

    const refreshViewedMenuFoods = useCallback(() => {
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

    useEffect(() => {
        refreshViewedMenuFoods();
    }, [idRestaurant, viewedMenu, refreshViewedMenuFoods]);

    const inactiveMenusData = inactiveMenus.map((menu) => ({
        name: menu.name,
        lastActive: menu.createdAt
            ? new Date(menu.createdAt).toLocaleDateString()
            : "",
        idMenu: menu.idMenu,
        menuObj: menu,
    }));

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
                    idFood: item.idFood,
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
                    idRestaurant={idRestaurant}
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
                    onMenuActivated={refreshMenus}
                />
                {viewedMenuData &&
                    (foodLoading ? (
                        <div className="text-gray-400 text-center py-10">
                            Loading menu items...
                        </div>
                    ) : (
                        <ActiveMenuContent
                            activeMenu={viewedMenuData}
                            onEditMenu={() => {
                                setEditingMenu(viewedMenu);
                                setShowEditMenuModal(true);
                            }}
                            onStatusChange={refreshViewedMenuFoods}
                        />
                    )
                    )}
            </div>
            <MenuStatsSidebar idRestaurant={idRestaurant} />
            <CreateMenuModal
                open={showCreateMenuModal}
                onClose={() => setShowCreateMenuModal(false)}
                idRestaurant={idRestaurant}
            />
            <EditMenuModal
                open={showEditMenuModal}
                onClose={() => setShowEditMenuModal(false)}
                idRestaurant={idRestaurant}
                menu={editingMenu}
                onFoodAdded={() => {
                    if (editingMenu) {
                        getFoodByMenu(editingMenu.idMenu).then((foods) => setViewedMenuFoods(foods || []));
                    }
                }}
            />
        </div>
    );
};

export default RestaurantMenuPage;
