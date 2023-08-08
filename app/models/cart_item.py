from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to owner

    # relationship to products


    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }
