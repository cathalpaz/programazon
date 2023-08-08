from ..models import db, environment, SCHEMA, PurchaseItem
from sqlalchemy.sql import text



def seed_purchase_items():
    purchase_item1 = PurchaseItem(
        purchase_id = 1,
        product_id = 2,
        quantity = 1,
        item_price = 25
    )
    purchase_item2 = PurchaseItem(
        purchase_id = 2,
        product_id = 3,
        quantity = 2,
        item_price = 7.99
    )
    purchase_item3 = PurchaseItem(
        purchase_id = 3,
        product_id = 2,
        quantity = 2,
        item_price = 25
    )
    purchase_item4 = PurchaseItem(
        purchase_id = 4,
        product_id = 1,
        quantity = 1,
        item_price = 10
    )
    purchase_item5 = PurchaseItem(
        purchase_id = 5,
        product_id = 1,
        quantity = 2,
        item_price = 10
    )


    db.session.add(purchase_item1)
    db.session.add(purchase_item2)
    db.session.add(purchase_item3)
    db.session.add(purchase_item4)
    db.session.add(purchase_item5)


    db.session.commit()


def undo_purchase_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.purchase_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchase_items"))

    db.session.commit()
