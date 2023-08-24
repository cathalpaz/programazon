from flask import Blueprint
from . import auth_routes, user_routes, product_routes, review_routes, cart_routes


bp = Blueprint("api", __name__, url_prefix="/api")

@bp.route("")
def index():
    return "<h1>Hello World</h1>"


bp.register_blueprint(auth_routes.auth_routes)
bp.register_blueprint(user_routes.user_routes)
bp.register_blueprint(product_routes.products_routes)
bp.register_blueprint(review_routes.reviews_routes)
bp.register_blueprint(cart_routes.cart_routes)
