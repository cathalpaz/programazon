from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Purchase(db.Model):
    __tablename__ = 'purchases'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total_price = db.Column(db.Numeric(precision=6, scale=2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to buyer
    buyer = db.relationship('User', back_populates='purchases')

    # relationship to purchase items
    purchase_items = db.relationship('PurchaseItem', back_populates='purchase')


    def to_dict(self):
        return {
            'id': self.id,
            'buyer_id': self.buyer_id,
            'total_price': self.total_price,
        }
