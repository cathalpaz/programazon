from ..models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text


# ADD AWS TO PRODUCT IMAGES

def seed_products():
    product1 = Product(
        name = 'JavaScript Masterclass',
        price = 10,
        description = 'An in-depth video tutorial series on JavaScript, including modern frameworks like React and Node.js.',
        seller_id = 1,
        category = 'Courses/Tutorials',
        image = 'image1.png',
        stock_quantity = 5
    )
    product2 = Product(
        name = 'Data Science and Machine Learning Essentials',
        price = 25,
        description = 'An online course that dives into data science concepts and machine learning algorithms.',
        seller_id = 2,
        category = 'Courses/Tutorials',
        image = 'image2.png',
        stock_quantity = 1
    )
    product3 = Product(
        name = 'Cloud Computing with AWS',
        price = 7.99,
        description = 'An in-depth tutorial series on using Amazon Web Services for cloud computing and deployment.',
        seller_id = 3,
        category = 'Courses/Tutorials',
        image = 'image3.png',
        stock_quantity = 3
    )
    product4 = Product(
        name = 'Portable Power Banks',
        price = 10,
        description = 'Compact power banks for charging devices on the go.',
        seller_id = 3,
        category = 'Accessories',
        image = 'image4.png',
        stock_quantity = 5
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
