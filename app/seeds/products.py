from ..models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text


# ADD AWS TO PRODUCT IMAGES

def seed_products():
    product1 = Product(
        name = 'Programmable Mechanical Keyboard for Coding: Corsair K95 RGB Platinum Mechanical Gaming Keyboard',
        price = 50,
        description = 'The Corsair K95 RGB Platinum is a top-tier mechanical keyboard designed for intense gaming and coding sessions. It features Cherry MX mechanical key switches, which offer tactile feedback and durability. With 18 fully programmable G-keys, you can assign complex macros or commonly used code snippets for quick access. The keyboard also boasts customizable RGB backlighting with per-key lighting control, allowing you to create a personalized coding environment.',
        seller_id = 1,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/71PzW7vZNUL._AC_UY218_.jpg',
        stock_quantity = 5
    )
    product2 = Product(
        name = 'Data Science and Machine Learning Essentials',
        price = 25,
        description = 'An online course that dives into data science concepts and machine learning algorithms.',
        seller_id = 2,
        category = 'Courses/Tutorials',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 1
    )
    product3 = Product(
        name = 'Cloud Computing with AWS',
        price = 7.99,
        description = 'An in-depth tutorial series on using Amazon Web Services for cloud computing and deployment.',
        seller_id = 3,
        category = 'Courses/Tutorials',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 3
    )
    product4 = Product(
        name = 'Portable Power Banks',
        price = 10,
        description = 'Compact power banks for charging devices on the go.',
        seller_id = 3,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 5
    )
    product5 = Product(
        name = 'Wireless Charging Pads',
        price = 25,
        description = 'Convenient wireless chargers for smartphones and other devices.',
        seller_id = 2,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 10
    )
    product6 = Product(
        name = 'Smartphone Cases',
        price = 15,
        description = 'Cases with built-in wallets, stands, or battery packs.',
        seller_id = 3,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 5
    )
    product7 = Product(
        name = 'Smart Plugs and Outlets',
        price = 10,
        description = 'Plugs that turn regular devices into smart devices.',
        seller_id = 3,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/51ihPoessmL.jpg',
        stock_quantity = 5
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
