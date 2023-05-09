import React from 'react';
import Meta from './meta/Meta';
import { ISeo } from './meta/meta.interface';

interface IMetaLayout extends ISeo {
    children: React.ReactNode;
}

const MetaLayout: React.FC<IMetaLayout> = ({ children, ...rest }) => {
    return (
        <>
            <Meta {...rest} />
            {children}
        </>
    );
};

export default MetaLayout;