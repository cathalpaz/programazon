from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PurchaseItem(db.Model):
    __tablename__ = 'purchase_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    purchase_id = db.Column(db.ForeignKey(add_prefix_for_prod('purchases.id')))
    product_id = db.Column(db.ForeignKey(add_prefix_for_prod('products.id')))
    quantity = db.Column(db.Integer)
    item_price = db.Column(db.Numeric(precision=6, scale=2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to purchase
    purchase = db.relationship('Purchase', back_populates='purchase_items')

    # relationship to purchase items
    product = db.relationship('Product', back_populates='purchase_items')


    def to_dict(self):
        return {
            'id': self.id,
            'purchase_id': self.purchase_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'item_price': self.item_price,
        }
