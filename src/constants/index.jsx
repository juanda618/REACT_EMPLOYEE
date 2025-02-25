import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/dashboard",
            },
            {
                label: "list-employees",
                icon: Users,
                path: "list-employees",
            },
            {
                label: "Register",
                icon: UserPlus,
                path: "register-employee",
            },
        ],
    },
    // {
    //     title: "Customers",
    //     links: [
    //         {
    //             label: "Customers",
    //             icon: Users,
    //             path: "/customers",
    //         },
    //         {
    //             label: "New customer",
    //             icon: UserPlus,
    //             path: "/new-customer",
    //         },
    //         {
    //             label: "Verified customers",
    //             icon: UserCheck,
    //             path: "/verified-customers",
    //         },
    //     ],
    // },
    // {
    //     title: "Products",
    //     links: [
    //         {
    //             label: "Products",
    //             icon: Package,
    //             path: "/products",
    //         },
    //         {
    //             label: "New product",
    //             icon: PackagePlus,
    //             path: "/new-product",
    //         },
    //         {
    //             label: "Inventory",
    //             icon: ShoppingBag,
    //             path: "/inventory",
    //         },
    //     ],
    // },
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/dashboard",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Tarea 1",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        time: 99.99,
        status: "doing",
        rating: 4.5,
    },
    {
        number: 2,
        name: "Tarea 2",
        image: ProductImage,
        description: "Latest 5G smartphone with excellent camera features.",
        time: 799.99,
        status: "doing",
        rating: 4.7,
    },
    {
        number: 3,
        name: "Tarea 3",
        image: ProductImage,
        description: "Powerful gaming laptop with high-end graphics.",
        time: 1299.99,
        status: "doing",
        rating: 4.8,
    },
    {
        number: 4,
        name: "Tarea 4",
        image: ProductImage,
        description: "Stylish smartwatch with fitness tracking features.",
        time: 199.99,
        status: "to do",
        rating: 4.4,
    },
    {
        number: 5,
        name: "Tarea 5",
        image: ProductImage,
        description: "Portable Bluetooth speaker with deep bass sound.",
        time: 59.99,
        status: "doing",
        rating: 4.3,
    },
    {
        number: 6,
        name: "Tarea  6",
        image: ProductImage,
        description: "Ultra HD 4K monitor with stunning color accuracy.",
        time: 399.99,
        status: "doing",
        rating: 4.6,
    },
    {
        number: 7,
        name: "Tarea 7",
        image: ProductImage,
        description: "Mechanical keyboard with customizable RGB lighting.",
        time: 89.99,
        status: "doing",
        rating: 4.7,
    },
    {
        number: 8,
        name: "Tarea 8",
        image: ProductImage,
        description: "Ergonomic wireless mouse with precision tracking.",
        time: 49.99,
        status: "doing",
        rating: 4.5,
    },
];
