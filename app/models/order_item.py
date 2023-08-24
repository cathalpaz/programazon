from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer)
    subtotal = db.Column(db.Numeric(precision=6, scale=2), nullable=False)


    # RELATIONSHIPS

    # relationship to order
    order = db.relationship('Order', back_populates='order_items')

    # relationship to products
    product = db.relationship('Product', back_populates='order_items')



    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'product': self.product.to_dict(),
            'quantity': self.quantity,
            'subtotal': self.subtotal
        }
