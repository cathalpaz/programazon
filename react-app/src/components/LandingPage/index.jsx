import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetProducts } from "../../store/products";
import Loading from "../Loading";
import "./LandingPage.css";

function LandingPage() {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => Object.values(state.products.allProducts))

    useEffect(() => {
        dispatch(thunkGetProducts())
    }, [dispatch])

    // const productArray = Object.values(allProducts)
    allProducts.sort((a, b) => b.avg_rating - a.avg_rating)


    const topRatedProducts = allProducts.slice(0, 5)
    console.log('top5', topRatedProducts)


    if (!allProducts.length) return (
        <Loading />
    )

    return (
        <div className="landing__container">
            <div className="landing__banner">
                <img src="/images/landing.jpg" alt="landing" />
                <div className="landing__categories">
                    <div className="landing__category">
                        <h3>Ready for anything</h3>
                        <img src="/images/accessories.jpg" alt="accessories" />
                        <span>Shop accessories</span>
                    </div>
                    <div className="landing__category">
                        <h3>Ready for anything</h3>
                        <img src="/images/accessories.jpg" alt="accessories" />
                        <span>Shop accessories</span>
                    </div>
                    <div className="landing__category">
                        <h3>Ready for anything</h3>
                        <img src="/images/accessories.jpg" alt="accessories" />
                        <span>Shop accessories</span>
                    </div>
                    <div className="landing__category">
                        <h3>Ready for anything</h3>
                        <img src="/images/accessories.jpg" alt="accessories" />
                        <span>Shop accessories</span>
                    </div>
                </div>
            </div>
            <div className="landing__trending-container">
                <div className="landing__trending">
                    <h3>Top Rated Products</h3>
                    <div className="landing__trending-products">
                        {topRatedProducts.map(product => (
                            <div className="landing__trending-product" key={product?.id}>
                                <img src={product?.image} alt="product" />
                                <span>{product?.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
