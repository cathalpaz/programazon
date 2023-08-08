from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(20))
    content = db.Column(db.Text)
    rating = db.Column(db.Integer)
    # AWS setup later
    image = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to owner
    buyer = db.relationship('User', back_populates='reviews')

    # relationship to product
    # -no need, used backref-


    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'buyer_id': self.buyer_id,
            'content': self.content,
            'rating': self.rating,
            'image': self.image
        }
