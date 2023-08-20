from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', address='123 Demo Ave')
    marnie = User(username='marnie', email='marnie@aa.io', password='password', address='69 Brook St')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password', address='20 Silk Rd')
    alice = User(username='alice', email='alice@aa.io', password='password', address='123 Main St')
    jason = User(username='jason', email='jason@aa.io', password='password', address='456 Elm Ave')
    claire = User(username='claire', email='claire@aa.io', password='password', address='789 Oak Ln')
    daniel = User(username='daniel', email='daniel@aa.io', password='password', address='101 Pine Rd')
    emma = User(username='emma', email='emma@aa.io', password='password', address='202 Maple Dr')
    finn = User(username='finn', email='finn@aa.io', password='password', address='303 Willow Rd')
    grace = User(username='grace', email='grace@aa.io', password='password', address='404 Cedar Ave')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(jason)
    db.session.add(claire)
    db.session.add(daniel)
    db.session.add(emma)
    db.session.add(finn)
    db.session.add(grace)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
