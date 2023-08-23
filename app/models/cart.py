from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total_price = db.Column(db.Numeric(precision=6, scale=2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to owner
    user = db.relationship('User', back_populates='carts')

    # relationship to cart items
    cart_items = db.relationship('CartItem', back_populates='cart')

    # relationship to orders
    orders = db.relationship('Order', back_populates='cart')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price,
            'created_at': self.created_at,
            'cart_items': [cart_item.to_dict() for cart_item in self.cart_items],
        }
