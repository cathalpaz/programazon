from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import db, Product, Review
from ..forms import ProductForm, UpdateProductForm, ReviewForm

from .error_helpers import NotFoundError, ForbiddenError
from .auth_routes import validation_errors_to_error_messages


# TODO: ADD AWS TO IMAGES, POST AND PUT

products_routes = Blueprint('products', __name__, url_prefix="/products")

# GET all products
@products_routes.route("")
def get_products():
    products = Product.query.all()
    for i in range(len(products)):
        reviews = Review.query.filter(Review.product_id == products[i].id).all()

        if not reviews:
            products[i] = products[i].to_dict()
            products[i]['avg_rating'] = 0
            products[i]['reviews'] = []
            continue

        rating_reviews = [review.to_dict()["rating"] for review in reviews]
        avg_rating = sum(rating_reviews) / len(rating_reviews)
        products[i] = products[i].to_dict()
        products[i]['reviews'] = [review.to_dict() for review in reviews]
        products[i]['avg_rating'] = round(avg_rating, 1)


    return {'products': products}


# GET single product
@products_routes.route('/<int:id>')
def get_single_product(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    reviews = Review.query.filter(Review.product_id == id).all()

    if not reviews:
        product = product.to_dict()
        product['avg_rating'] = 0
        product['reviews'] = []
        return {'product': product}

    product = product.to_dict()
    ratings = [review.to_dict()["rating"] for review in reviews]
    avg_rating = sum(ratings) / len(ratings)
    product["reviews"] = [review.to_dict() for review in reviews]
    product['avg_rating'] = round(avg_rating, 1)

    return {'product': product}


# GET product reviews
@products_routes.route('/<int:id>/reviews')
def get_product_reviews(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    reviews = Review.query.filter(Review.product_id == id)
    return {"reviews": [review.to_dict() for review in reviews]}


# CREATE new product
@products_routes.route('/new', methods=['POST'])
@login_required
def post_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name = form.data['name'],
            price = form.data['price'],
            description = form.data['description'],
            seller_id = current_user.id,
            category = form.data['category'],
            image = form.data['image'],
            stock_quantity = form.data['stock_quantity']
        )
        db.session.add(product)
        db.session.commit()
        return {"product": product.to_dict()}, 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# UPDATE product
@products_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    if product.seller_id != current_user.id:
        error = ForbiddenError('Not your product!')
        return error.error_json()

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token' and field != 'file':
                setattr(product, field, form.data[field])


        db.session.commit()
        return {"product", product.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE product
@products_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    if product.seller_id != current_user.id:
        error = ForbiddenError('Not your product!')
        return error.error_json()

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Successfully deleted product'}


# GET users products
@products_routes.route('/current')
@login_required
def get_my_products():
    products = Product.query.filter(Product.seller_id == current_user.id).all()

    if not products:
        error = NotFoundError('No listed products')
        return error.error_json()

    return {'products': [product.to_dict() for product in products]}



# REVIEWS


# CREATE review for product
@products_routes.route("/<int:id>/reviews", methods=['POST'])
@login_required
def post_product_review(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            title = form.data["title"],
            content = form.data["content"],
            rating = form.data["rating"],
            image = form.data["image"],
            buyer_id = current_user.id,
            product_id = product.id
        )
        db.session.add(review)
        db.session.commit()
        return {"review": review.to_dict()}, 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
