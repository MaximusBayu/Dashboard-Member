import React, { forwardRef } from 'react';

const PrintMember = forwardRef((props, ref) => {
    
    const handlePrint = () => {
        window.print();
    };

    React.useImperativeHandle(ref, () => ({
        handlePrint: handlePrint
    }));

    return (
        null
    );
});

export default PrintMember;
