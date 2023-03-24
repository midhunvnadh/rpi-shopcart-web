import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loader, setLoader] = useState(true);

    const handleRemoveProduct = (index) => {
        fetch(`/api/products?index=${index}`, {
            method: 'DELETE',
        }).then(() => {
            setLoader(true)
        })
    };

    const refreshProducts = () => {
        fetch("/api/products").then(data => data.json()).then(data => {
            setProducts(data)
            var total = 0;
            for (var i = 0; i < data.length; i++) {
                total += data[i].price * data[i].quantity;
            }
            setTotal(total);
            setLoader(false);
        })
    }

    useEffect(() => {
        setInterval(() => {
            refreshProducts()
        }, 2000)
        refreshProducts()
    }, [])

    return (
        <div className="flex flex-col mt-8">
            <h2 className="text-3xl text-center font-bold mb-4 py-2">Product Table</h2>
            {
                loader && (
                    <div className='flex bg-gray-600/50 fixed items-center justify-center top-0 right-0 left-0 bottom-0'>
                        <div className='text-3xl text-white animate-spin'>
                            <FaSpinner />
                        </div>
                    </div>
                )
            }
            <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Price
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{product.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{product.price * product.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleRemoveProduct(index)}>
                                                <FaTrashAlt className="text-red-600 hover:text-red-900" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">Total</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {total}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
