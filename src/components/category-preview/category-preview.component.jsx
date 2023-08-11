import ProductCard from '../product-card/product-card.component';

import { CategoriesPreviewContainer, Title, Preview } from './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {

    return ( 
        <CategoriesPreviewContainer>
            <h2>
                <Title className='title' to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoriesPreviewContainer>
    )
};

export default CategoryPreview;