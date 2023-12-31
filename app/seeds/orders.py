from ..models import db, environment, SCHEMA, Order
from sqlalchemy.sql import text


def seed_orders():
    # order1 = Order(
    #     user_id = 1,
    # )

    # db.session.add(order1)

    # db.session.commit()
    pass


def undo_orders():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
