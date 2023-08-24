from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import db, Cart, CartItem
from ..forms import CartItemForm

from .error_helpers import NotFoundError, ForbiddenError
from .auth_routes import validation_errors_to_error_messages


cart_routes = Blueprint('carts', __name__, url_prefix="/carts")


# GET current cart
@cart_routes.route("")
@login_required
def get_my_cart():
    userId = current_user.id

    cart = Cart.query.filter(Cart.user_id == userId).first()

    if not cart:
        error = NotFoundError('No Cart Found, add items to cart!')
        return error.error_json()

    return {'cart': cart.to_dict()}


# ADD item to cart
# IN PRODUCTS ROUTE

