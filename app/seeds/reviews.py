from ..models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text

# ADD AWS TO REVIEW IMAGES

def seed_reviews():
    review1 = Review(
        product_id = 2,
        buyer_id = 3,
        title = 'Fast shipping',
        content = 'Got it the next day! Extremely fast shipping and excellent customer service. I will be purchasing again!',
        rating = 5,
        image = 'image.jpg'
    )
    review2 = Review(
        product_id = 1,
        buyer_id = 2,
        title = 'Mind blowing keyboard!',
        content = "Wow, where do I even begin with the Corsair K95 RGB Platinum Mechanical Gaming Keyboard? This keyboard is so advanced that it practically codes itself! The programmable keys are like little genies granting your coding wishes, and the mechanical switches provide a tactile experience that feels like typing on clouds.",
        rating = 5,
        image = 'https://m.media-amazon.com/images/I/716DktHch2L._SY88.jpg'
    )
    review3 = Review(
        product_id = 1,
        buyer_id = 3,
        title = 'Scam Alert',
        content = "Course is a complete scam. The tutorials are vague and lack any real substance. The instructor's so-called expertise is questionable at best. I didn't learn anything useful, and I feel like I've wasted my time and money. Stay far away from this rip-off.",
        rating = 1,
        image = 'https://9to5toys.com/wp-content/uploads/sites/5/2022/05/corsair-k70-rgb-pro-1.jpg'
    )
    review4 = Review(
        product_id = 3,
        buyer_id = 1,
        title = 'Not Worth the Hype',
        content = "The HyperSpeed USB-C Cable is just a regular cable with a flashy name. There's no noticeable difference in charging speed compared to my old cable. The build quality is nothing special, and the cable still tangles just like any other cable. Save your money and stick to what you already have.",
        rating = 2,
        image = 'image.jpg'
    )
    review5 = Review(
        product_id = 1,
        buyer_id = 3,
        title = 'Confusing and Ineffective',
        content = "The instructor's explanations were convoluted, and the projects were overly complex for beginners. I struggled to follow along, and my AI assistant ended up a jumbled mess.",
        rating = 2,
    )
    review6 = Review(
        product_id = 6,
        buyer_id = 3,
        title = 'Strong and Durable!',
        content = "I couldn't be happier with this smartphone case! It's not just your average case; it's a game-changer. The sleek design not only offers top-notch protection but also adds a touch of elegance to my phone.",
        rating = 5,
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)

    db.session.commit()




def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
