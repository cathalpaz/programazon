import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetProducts, thunkGetUserProducts } from "../../store/products";
import Loading from "../Loading";
import { useHistory } from 'react-router-dom';
import "./LandingPage.css";

function LandingPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const allProducts = useSelector(state => Object.values(state.products.allProducts))

    useEffect(() => {
        dispatch(thunkGetProducts())
        dispatch(thunkGetUserProducts())
    }, [dispatch])

    allProducts.sort((a, b) => b.avg_rating - a.avg_rating)
    const topRatedProducts = allProducts.slice(0, 5)

    if (!allProducts.length) return (
        <Loading />
    )

    const sendToProduct = (id) => {
        history.push(`/products/${id}`)
    }
    const sendToAllProducts = () => {
        history.push('/products')
    }
    const sendToAccessories = () => {
        history.push(`/products?q=accessories`)
        window.location.reload();
    }
      const sendToCourses = () => {
        history.push(`/products?q=courses/tutorials`)
        window.location.reload();
    }
      const sendToLicenses = () => {
        history.push(`/products?q=licenses`)
        window.location.reload();
    }
      const sendToMerchandise = () => {
        history.push(`/products?q=merchandise`)
        window.location.reload();
    }

    const truncateString = (s) => {
        if (s.length < 29) return s
        return s.substring(0, 29) + "..."
    }

    return (
        <div className="landing__container">
            <div className="landing__banner">
                <img src="https://m.media-amazon.com/images/I/61dRybvH4lL._SX3000_.jpg" alt="landing" />
                <div className="landing__categories">
                    <div className="landing__category">
                        <h3>Gadget galore</h3>
                        <img src="/images/accessories.jpg" alt="accessories" />
                        <span onClick={sendToAccessories}>Shop accessories</span>
                    </div>
                    <div className="landing__category">
                        <h3>Ready for learning</h3>
                        <img src="https://www.nist.gov/sites/default/files/images/2019/09/25/tech_transfer.jpg" alt="courses" />
                        <span onClick={sendToCourses}>Shop courses/tutorials</span>
                    </div>
                    <div className="landing__category">
                        <h3>Trending credentials</h3>
                        <img src="https://www.savannahtech.edu/wp-content/uploads/2020/05/Professional-Certification-Web-Image-1.png" alt="licenses" />
                        <span onClick={sendToLicenses}>Shop licenses</span>
                    </div>
                    <div className="landing__category">
                        <h3>Fashion you'll love</h3>
                        <img src="https://images.vexels.com/media/users/3/289764/raw/284597fe88376cd76609d9d5c7e7dd1f-i-love-coding-t-shirt-design.jpg" alt="merchandise" />
                        <span onClick={sendToMerchandise}>Shop merchandise</span>
                    </div>
                </div>
            </div>
            <div className="landing__trending-container">
                <div className="landing__trending">
                    <div className="landing__trending-header">
                        <h3>Top Rated Products</h3>
                        <span onClick={sendToAllProducts}>Shop all products</span>
                    </div>
                    <div className="landing__trending-products">
                        {topRatedProducts.map(product => (
                            <div className="landing__trending-product" key={product?.id} onClick={(() => sendToProduct(product?.id))} >
                                <div className="landing-product__image">
                                    <img src={product?.image} alt="product" />

                                </div>
                                <span>{truncateString(product?.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
