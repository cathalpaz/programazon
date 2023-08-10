import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./LandingPage.css";
import { thunkGetProducts } from "../../store/products";

function LandingPage() {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products.allProducts)

    const productArray = Object.values(allProducts)
    productArray.sort((a, b) => b.avg_rating - a.avg_rating)
    console.log('first', productArray)
    console.log('sorted', productArray)


    useEffect(() => {
        dispatch(thunkGetProducts())
    }, [dispatch])

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
            <div className="landing__trending">

            </div>
        </div>
    );
}

export default LandingPage;
