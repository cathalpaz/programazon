from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer)
    subtotal = db.Column(db.Numeric(precision=6, scale=2), nullable=False)
        # product price * quantity
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to products
    product = db.relationship('Product', back_populates='cart_items')

    # relationship to cart
    cart = db.relationship('Cart', back_populates='cart_items')




    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'subtotal': self.subtotal
        }
