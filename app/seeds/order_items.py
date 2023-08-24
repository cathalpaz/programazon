from ..models import db, environment, SCHEMA, OrderItem
from sqlalchemy.sql import text


def seed_order_items():
    pass




def undo_order_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()
