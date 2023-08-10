import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./LandingPage.css";
import { thunkGetProducts } from "../../store/products";

function LandingPage() {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)

    console.log('LOOK', allProducts)

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
        </div>
    );
}

export default LandingPage;
