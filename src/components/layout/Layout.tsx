import React, { useEffect, useState } from 'react';
import Header from './header/Header';

import { AmazonCategory } from '@/services/Amazon/AmazonCategory';
import { IAmazonCategory } from '@/types/categories.interface';
import DrawCategory from '../ui/drawer/DrawCategory';

interface ILayout {
    children?: React.ReactNode;
}

// TODO: change categories variable to object like {data, changeData, loading, error} or set 'em to redux storage

const Layout: React.FC<ILayout> = ({ children }) => {
	const [categories, setCategories] = useState<IAmazonCategory[] | null>(null);
    const [loading, setLoading] = useState(false);
  
	useEffect(() => {
        setLoading(true);
        (async () => {
            const response = await AmazonCategory.getAllCategories()
			console.log(response);
			

			if (response) {
				setCategories(response)
			} else setCategories([])
            setLoading(false);
        })()
	}, []);

    if (loading) return <div>Loading...</div>

	// TODO: create recurcive function for fetching data
	
	return (
		<main style={{width: '100%'}}>
			<Header />
			<DrawCategory categories={categories} />
			<section style={{display: 'flex'}}>
				{children}
			</section>
		</main>
	)
}

export default Layout