export interface Product {
    id: number;
    title: string;
    link: string; // Product URL on external shop
    price: string; // Formatted price
    priceNumeric: number;
    image: string; // Main image path
    images?: string[]; // Additional image paths
    remoteImage?: string;
    category: string;
    material: string;
}

export interface FilterState {
    material: string | 'all';
    minPrice: number;
    maxPrice: number;
}
