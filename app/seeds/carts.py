from ..models import db, environment, SCHEMA, Cart
from sqlalchemy.sql import text


def seed_carts():
    cart1 = Cart(
        user_id = 1,
        total_price = 90
    )

    db.session.add(cart1)

    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
