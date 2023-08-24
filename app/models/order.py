from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to user
    user = db.relationship('User', back_populates='orders')

    # relationship to cart
    cart = db.relationship('Cart', back_populates='orders')

    # relationship to order items
    order_items = db.relationship('OrderItem', back_populates='order')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_id': self.cart_id,
            'created_at': self.created_at
        }
