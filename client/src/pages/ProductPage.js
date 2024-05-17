import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';

const ProductPage = () => {
    const [filters, setFilters] = useState({
        pricerange: [],
    });
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { slug } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/single-category/${slug}`);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [slug]); // Trigger effect when slug changes

    if (!category) {
        return <div>Loading...</div>; // Add loading indicator
    }

    const handleFilterChange = (name, newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: newFilters,
        }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    // Define breadcrumb paths
    const breadcrumbPaths = [
        { title: 'Home', link: '/' },
        { title: category.category.name }, // Current category
    ];


    return (
        <Layout>
            {/* Breadcrumb navigation */}
            <div className="container mx-auto px-4 py-2">
                <Breadcrumb paths={breadcrumbPaths} />
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className={`w-full lg:w-1/4 p-4 ${sidebarOpen ? 'block' : 'hidden'}`}>
                    <FilterSidebar filters={filters} onChange={handleFilterChange} />
                </div>
                <div className="w-full lg:w-3/4 p-4">
                    {/* Button to toggle sidebar visibility on smaller devices */}
                    <button
                        className="block lg:hidden mb-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md"
                        onClick={toggleSidebar}
                    >
                        {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    <ProductList category={category?.category} filters={filters} />
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;