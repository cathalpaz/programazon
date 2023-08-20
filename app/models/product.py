from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(precision=6, scale=2), nullable=False)
    description = db.Column(db.Text)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category = db.Column(db.String(50))
    stock_quantity = db.Column(db.Integer)
    # AWS setup later
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())


    # RELATIONSHIPS

    # relationship to owner
    seller = db.relationship('User', back_populates='products')

    # relationship to reviews
    reviews = db.relationship('Review', back_populates= 'product', cascade="all, delete-orphan")

    # relationship to cart items
    cart_items = db.relationship('CartItem', back_populates='product')

    # relationship to purchase items
    purchase_items = db.relationship('PurchaseItem', back_populates='product')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'seller_id': self.seller_id,
            'category': self.category,
            'image': self.image,
            'stock_quantity': self.stock_quantity,
            'created_at': self.created_at
        }
