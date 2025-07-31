import jsPDF from 'jspdf';
import type { FoodByMenu, FoodCategory } from '../features/restaurant/hooks/hooks';

export interface MenuPDFData {
    restaurantName: string;
    menuName: string;
    categories: FoodCategory[];
    items: FoodByMenu[];
}

export function generateMenuPDF(data: MenuPDFData): void {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let currentY = margin;

    // Filter only available items
    const availableItems = data.items.filter(item => item.status === 'available');

    // Helper function to add text with wrapping
    const addText = (text: string, x: number, y: number, maxWidth?: number): number => {
        if (maxWidth) {
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y);
            return y + (lines.length * 6);
        } else {
            doc.text(text, x, y);
            return y + 8;
        }
    };

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number): number => {
        if (currentY + requiredSpace > pageHeight - 30) {
            doc.addPage();
            return 30; // Start from top of new page with margin
        }
        return currentY;
    };

    // Elegant header
    doc.setFillColor(0, 103, 75);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(data.restaurantName, margin, 20);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(data.menuName, margin, 30);

    currentY = 50;

    // Group available items by category
    const itemsByCategory = availableItems.reduce((acc, item) => {
        const category = data.categories.find(cat => cat.idCategory === item.idCategory);
        const categoryName = category?.nameCategorie || 'Other';
        
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {} as Record<string, FoodByMenu[]>);

    // Separate categories by item count for smart pairing
    const multiItemCategories: [string, FoodByMenu[]][] = [];
    const singleItemCategories: [string, FoodByMenu[]][] = [];
    
    Object.entries(itemsByCategory).forEach(([categoryName, items]) => {
        if (items.length === 1) {
            singleItemCategories.push([categoryName, items]);
        } else {
            multiItemCategories.push([categoryName, items]);
        }
    });

    const columnWidth = (pageWidth - 3 * margin) / 2; // 2 columns with spacing

    // Helper function to render a single food item
    const renderFoodItem = (item: FoodByMenu, x: number, startY: number): number => {
        let itemY = startY;
        
        // Food name - fancy and large
        doc.setTextColor(34, 34, 34);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(item.name, x, itemY);
        itemY += 8;

        // Price - elegant and prominent
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');  
        doc.setTextColor(0, 103, 75);
        const priceText = `$${item.price.toFixed(2)}`;
        doc.text(priceText, x, itemY);
        itemY += 8;

        // Description - clean and readable
        if (item.description) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(85, 85, 85);
            const lines = doc.splitTextToSize(item.description, columnWidth - 10);
            doc.text(lines.slice(0, 3), x, itemY); // Max 3 lines
            itemY += (Math.min(lines.length, 3) * 4);
        }

        return itemY;
    };

    // Helper function to render category header
    const renderCategoryHeader = (categoryName: string, x: number, y: number): number => {
        doc.setTextColor(0, 103, 75);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(categoryName, x, y);
        
        // Decorative underline
        doc.setLineWidth(0.3);
        doc.setDrawColor(0, 103, 75);
        doc.line(x, y + 2, x + columnWidth, y + 2);
        
        return y + 10;
    };

    // Render multi-item categories (normal 2-per-row layout)
    multiItemCategories.forEach(([categoryName, categoryItems]) => {
        // Check if we need a new page for category header
        currentY = checkNewPage(50);

        // Full-width category header
        doc.setTextColor(0, 103, 75);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        currentY = addText(categoryName, margin, currentY);
        
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 103, 75);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;

        // Render items 2 per row
        for (let i = 0; i < categoryItems.length; i += 2) {
            // Check if we need a new page for this row
            currentY = checkNewPage(60);
            
            const leftItem = categoryItems[i];
            const rightItem = categoryItems[i + 1];
            
            let maxItemHeight = 0;
            
            // Render left item
            const leftEndY = renderFoodItem(leftItem, margin, currentY);
            maxItemHeight = Math.max(maxItemHeight, leftEndY - currentY);
            
            // Render right item if exists
            if (rightItem) {
                const rightEndY = renderFoodItem(rightItem, margin + columnWidth + margin/2, currentY);
                maxItemHeight = Math.max(maxItemHeight, rightEndY - currentY);
            }
            
            currentY += maxItemHeight + 10; // Space between rows
        }
        
        currentY += 4; // Space between categories
    });

    // Render single-item categories (2 categories per row)
    for (let i = 0; i < singleItemCategories.length; i += 2) {
        // Check if we need a new page for category pair
        currentY = checkNewPage(80);
        
        const leftCategory = singleItemCategories[i];
        const rightCategory = singleItemCategories[i + 1];
        
        let maxCategoryHeight = 0;
        
        // Render left category
        let leftY = renderCategoryHeader(leftCategory[0], margin, currentY + 8);
        const leftEndY = renderFoodItem(leftCategory[1][0], margin, leftY);
        maxCategoryHeight = Math.max(maxCategoryHeight, leftEndY - currentY);
        
        // Render right category if exists
        if (rightCategory) {
            const rightX = margin + columnWidth + margin/2;
            let rightY = renderCategoryHeader(rightCategory[0], rightX, currentY + 8);
            const rightEndY = renderFoodItem(rightCategory[1][0], rightX, rightY);
            maxCategoryHeight = Math.max(maxCategoryHeight, rightEndY - currentY);
        }
        
        currentY += maxCategoryHeight + 15; // Space between category pairs
    }

    // Simple footer
    const footerY = pageHeight - 20;
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const footerText = `Generated on ${new Date().toLocaleDateString()} • ZenCiti Restaurant Management`;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerWidth) / 2, footerY);

    // Download the PDF
    const fileName = `${data.restaurantName.replace(/[^a-zA-Z0-9]/g, '_')}_Menu_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
}
