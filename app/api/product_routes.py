from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import db, Product, Review
from ..forms import ProductForm, ReviewForm, UpdateProductForm

from .error_helpers import NotFoundError, ForbiddenError
from .auth_routes import validation_errors_to_error_messages

# AWS HERE

products_routes = Blueprint('products', __name__, url_prefix="/products")

# GET all products
@products_routes.route("")
def get_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


# GET single product
@products_routes.route('/<int:id>')
def get_single_product(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    reviews = Review.query.filter(Review.product_id == id)
    product = product.to_dict()
    product["reviews"] = [review.to_dict() for review in reviews]
    return product


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
        return product.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# EDIT product
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

    form = UpdateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['description']:
            product.description = form.data['description']


        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

