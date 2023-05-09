import MetaLayout from "@/components/layout/MetaLayout";
import Categories from "@/components/screen/categories/Categories";

const CategoriesPage = () => {

    return ( 
        <MetaLayout title='Category Page' description='Category page by chosen category'> 
            <Categories />
        </MetaLayout> 
    );
};

export default CategoriesPage;