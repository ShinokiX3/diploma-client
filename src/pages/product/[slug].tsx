import React from 'react';
import MetaLayout from '@/components/layout/MetaLayout';
import Product from '@/components/screen/product/Product';
import { AmazonProduct } from '@/services/Amazon/AmazonProduct';
import { IAmazonProductById } from '@/types/products.interface';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string
  
  const response = await AmazonProduct.getProductById(slug);
  
  if (!response) {
    return {
      notFound: true
    }
  }
  
  return {
    props: { product: response, slug: slug }
  }
}

interface IProductPage {
  product: IAmazonProductById
}

const ProductPage: React.FC<IProductPage> = ({ product }) => {
  
    return (
        <MetaLayout title='Product Page' description='Product page details'>
            <Product data={product} />
        </MetaLayout>
    );
};

export default ProductPage;