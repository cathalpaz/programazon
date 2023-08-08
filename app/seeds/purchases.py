from ..models import db, environment, SCHEMA, Purchase
from sqlalchemy.sql import text


def seed_purchases():
    purchase1 = Purchase(
        buyer_id = 1,
        total_price = 10
    )
    purchase2 = Purchase(
        buyer_id = 2,
        total_price = 20
    )
    purchase3 = Purchase(
        buyer_id = 3,
        total_price = 24.99
    )
    purchase4 = Purchase(
        buyer_id = 1,
        total_price = 1.99
    )
    purchase5 = Purchase(
        buyer_id = 2,
        total_price = 15
    )


    db.session.add(purchase1)
    db.session.add(purchase2)
    db.session.add(purchase3)
    db.session.add(purchase4)
    db.session.add(purchase5)

    db.session.commit()



def undo_purchases():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchases"))

    db.session.commit()
