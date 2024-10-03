import React from 'react';

export default function Loader({ loading, children }) {
    if (loading) {
        return <div>Loading...</div>; // You can customize this with a spinner or any loading indicator
    }

    return <>{children}</>; // Render children when loading is complete
};
