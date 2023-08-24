from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import db, Order, OrderItem

from .error_helpers import NotFoundError, ForbiddenError
from .auth_routes import validation_errors_to_error_messages


order_routes = Blueprint('orders', __name__, url_prefix="/orders")


# GET all my orders
@order_routes.route("")
@login_required
def get_my_orders():
    my_orders = Order.query.filter(Order.user_id == current_user.id).all()

    return {"orders": [my_order.to_dict() for my_order in my_orders]}, 200



# POST order (buy cart)
@order_routes.route("", methods=["POST"])
@login_required
def buy_cart():
    # take current cart and make it an order
    # remove current cart from user

    current_cart = current_user.carts[0]

    new_order = Order(
        user_id = current_user.id,
    )
    db.session.add(new_order)
    db.session.commit()
    for item in current_cart.cart_items:
        new_order_item = OrderItem(
            order_id = new_order.id,
            product_id = item.product_id,
            quantity = item.quantity,
            subtotal = item.subtotal
        )
        db.session.add(new_order_item)
        db.session.commit()

    db.session.delete(current_cart)
    db.session.commit()


    return {'order': new_order.to_dict()}
