import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../../../components/SideBar/SideBar";
import Header from "../../../components/Header/Header";
import {
    faSquare,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTableLayout } from "../hooks/hooks";

// Types from your backend API
type TableShape = "square" | "circle";

export type BackendTable = {
    shape: TableShape;
    posX: number;
    posY: number;
};

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRID_SIZE = 20;
const RESTAURANT_ID = "c3b2a1d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d";

type TableObj = {
    id: string;
    shape: TableShape;
    x: number;
    y: number;
    size: number;
    capacity: number;
    is_available: boolean;
};

export default function TableFloorPlanEditor() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [tables, setTables] = useState<TableObj[]>([]);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [saving, setSaving] = useState(false);

    const getNextTableId = () => `T${tables.length + 1}`;

    const handleAddTable = (shape: TableShape) => {
        setTables(tabs => [
            ...tabs,
            {
                id: getNextTableId(),
                shape,
                x: 120 + tabs.length * 40,
                y: 120 + tabs.length * 30,
                size: 80,
                capacity: shape === "square" ? 4 : 6,
                is_available: true,
            },
        ]);
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => {
        e.stopPropagation();
        const table = tables.find(t => t.id === id);
        if (!table) return;
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        setDraggedId(id);
        setDragOffset({
            x: (e.clientX - canvasRect.left) - table.x,
            y: (e.clientY - canvasRect.top) - table.y,
        });
    };

    useEffect(() => {
        if (!draggedId) return;
        const handleMouseMove = (e: MouseEvent) => {
            if (!draggedId) return;
            const canvasRect = canvasRef.current?.getBoundingClientRect();
            if (!canvasRect) return;
            let x = (e.clientX - canvasRect.left) - dragOffset.x;
            let y = (e.clientY - canvasRect.top) - dragOffset.y;
            x = Math.round(x / GRID_SIZE) * GRID_SIZE;
            y = Math.round(y / GRID_SIZE) * GRID_SIZE;
            x = Math.max(0, Math.min(x, CANVAS_WIDTH - 80));
            y = Math.max(0, Math.min(y, CANVAS_HEIGHT - 80));
            setTables(tabs =>
                tabs.map(t =>
                    t.id === draggedId ? { ...t, x, y } : t
                )
            );
        };
        const handleMouseUp = () => setDraggedId(null);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggedId, dragOffset]);

    // Save to backend using updateTableLayout
    const handleSave = async () => {
        setSaving(true);
        try {
            const backendTables: BackendTable[] = tables.map(t => ({
                shape: t.shape,
                posX: t.x,
                posY: t.y,
            }));
            await updateTableLayout(RESTAURANT_ID, backendTables);
            alert("Layout saved to backend!");
        } catch (e: any) {
            alert("Error saving tables: " + (e?.message ?? e));
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (window.confirm("Reset all tables?")) setTables([]);
    };

    return (
        <div className="font-sans bg-gray-100 text-gray-800 flex min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto flex flex-col">
                <Header />
                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center">
                                <h3 className="font-bold text-lg">Floor Plan Editor</h3>
                                <span className="ml-3 text-sm text-gray-500">
                                    Add, move and arrange your restaurant tables
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="text-sm bg-green-900 text-white hover:bg-green-900/90 px-4 py-2 rounded-lg flex items-center"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save Layout"}
                                </button>
                                <button
                                    className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center"
                                    onClick={handleReset}
                                    disabled={saving}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
                                <h4 className="font-medium text-gray-700 mb-4">Tools</h4>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">
                                        Add Table
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        <button
                                            className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-gray-50"
                                            onClick={() => handleAddTable("square")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faSquare}
                                                className="text-green-900 text-xl mb-1"
                                            />
                                            <span className="text-xs">Square</span>
                                        </button>
                                        <button
                                            className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center hover:bg-gray-50"
                                            onClick={() => handleAddTable("circle")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                className="text-green-900 text-xl mb-1"
                                            />
                                            <span className="text-xs">Circle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 p-4 bg-gray-100 flex flex-col">
                                <div
                                    className="flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
                                    style={{
                                        width: CANVAS_WIDTH,
                                        height: CANVAS_HEIGHT,
                                    }}
                                    ref={canvasRef}
                                >
                                    <div
                                        style={{
                                            width: CANVAS_WIDTH,
                                            height: CANVAS_HEIGHT,
                                            position: "relative",
                                            background: "#fff",
                                            overflow: "hidden",
                                            borderRadius: 14,
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                            border: "1.5px solid #e5e7eb",
                                            touchAction: "none",
                                        }}
                                    >
                                        {/* Grid */}
                                        <svg
                                            width={CANVAS_WIDTH}
                                            height={CANVAS_HEIGHT}
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                zIndex: 0,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {Array.from({ length: CANVAS_WIDTH / GRID_SIZE + 1 }).map(
                                                (_, i) => (
                                                    <line
                                                        key={"v" + i}
                                                        x1={i * GRID_SIZE}
                                                        y1={0}
                                                        x2={i * GRID_SIZE}
                                                        y2={CANVAS_HEIGHT}
                                                        stroke="#eee"
                                                        strokeWidth={1}
                                                    />
                                                )
                                            )}
                                            {Array.from({ length: CANVAS_HEIGHT / GRID_SIZE + 1 }).map(
                                                (_, i) => (
                                                    <line
                                                        key={"h" + i}
                                                        x1={0}
                                                        y1={i * GRID_SIZE}
                                                        x2={CANVAS_WIDTH}
                                                        y2={i * GRID_SIZE}
                                                        stroke="#eee"
                                                        strokeWidth={1}
                                                    />
                                                )
                                            )}
                                        </svg>
                                        {/* Render tables */}
                                        {tables.map(t => (
                                            <div
                                                key={t.id}
                                                className={`absolute flex flex-col items-center justify-center border-2 shadow-md select-none cursor-grab transition-all duration-150 ring-1 ring-gray-100 text-center bg-white z-10`}
                                                style={{
                                                    left: t.x,
                                                    top: t.y,
                                                    width: t.size,
                                                    height: t.size,
                                                    borderRadius: t.shape === "circle" ? "50%" : 16,
                                                    userSelect: "none",
                                                }}
                                                onMouseDown={e => handleMouseDown(e, t.id)}
                                                title="Drag to move"
                                            >
                                                <span className="text-base font-bold">{t.id}</span>
                                                <span className="text-xs">
                                                    {t.shape === "circle" ? "Circle" : "Square"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-bold text-lg">Summary</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-left">
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Position (X,Y)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tables.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                                No tables placed yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        tables.map(table => (
                                            <tr className="hover:bg-gray-50" key={table.id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium">{table.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{table.shape.charAt(0).toUpperCase() + table.shape.slice(1)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{table.capacity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {Math.round(table.x)}, {Math.round(table.y)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
