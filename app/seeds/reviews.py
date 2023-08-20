from ..models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text

# ADD AWS TO REVIEW IMAGES

def seed_reviews():
    review1 = Review(
        product_id = 1,
        buyer_id = 2,
        title = 'Mind blowing keyboard!',
        content = "Wow, where do I even begin with the Corsair K95 RGB Platinum Mechanical Gaming Keyboard? This keyboard is so advanced that it practically codes itself! The programmable keys are like little genies granting your coding wishes, and the mechanical switches provide a tactile experience that feels like typing on clouds.",
        rating = 5,
        image = 'https://m.media-amazon.com/images/I/716DktHch2L._SY88.jpg'
    )
    review2 = Review(
        product_id = 1,
        buyer_id = 10,
        title = 'mixed feelings',
        content = "I've been using the Corsair K95 RGB Platinum Mechanical Gaming Keyboard for a while now, and I'm torn. The programmable keys are a neat concept, but the learning curve to set them up can be frustrating",
        rating = 3,
    )
    review3 = Review(
        product_id = 1,
        buyer_id = 5,
        title = 'Efficiency Redefined',
        content = "As a programmer, the Corsair K95 RGB Platinum Mechanical Gaming Keyboard has revolutionized how I work. The programmable features have shaved precious time off repetitive tasks, and the tactile feedback from the mechanical keys is incredibly satisfying.",
        rating = 4,
        image = 'https://9to5toys.com/wp-content/uploads/sites/5/2022/05/corsair-k70-rgb-pro-1.jpg'
    )
    review4 = Review(
        product_id = 2,
        buyer_id = 1,
        title = 'Fast shipping',
        content = 'Got it the next day! Extremely fast shipping and excellent customer service. I will be purchasing again!',
        rating = 4
    )
    review5 = Review(
        product_id = 2,
        buyer_id = 4,
        title = 'Bad design, good mug',
        content = 'The design is on both sides. Which is good. The problem is one side is barely legible',
        rating = 2,
        image = 'https://m.media-amazon.com/images/I/612h50nxeqL._SY88.jpg'
    )
    review6 = Review(
        product_id = 3,
        buyer_id = 1,
        title = 'Not Worth the Hype',
        content = "the mouse is just a regular mouse with a flashy name. There's no noticeable difference in speed compared to my old mouse. The build quality is nothing special, and the cable still tangles just like any other cable. Save your money and stick to what you already have.",
        rating = 2,
        image = 'https://images-na.ssl-images-amazon.com/images/I/61x9wt27lQL._SY88.jpg'
    )
    review7 = Review(
        product_id = 3,
        buyer_id = 2,
        title = 'amazing comfort',
        content = "my go-to tool for programming. Its ergonomic design ensures hours of comfortable usage, and the programmable buttons have transformed my workflow.",
        rating = 5,
    )
    review8 = Review(
        product_id = 4,
        buyer_id = 7,
        title = 'Seamless Scalability',
        content = "The AWS Cloud Platform License has been a game-changer for our business. The flexibility and scalability it offers are unparalleled. With the ability to spin up resources on-demand, we've optimized costs while handling varying workloads effortlessly",
        rating = 4,
    )
    review9 = Review(
        product_id = 5,
        buyer_id = 3,
        title = 'Scam Alert',
        content = "Course is a complete scam. The tutorials are vague and lack any real substance. The instructor's so-called expertise is questionable at best. I didn't learn anything useful, and I feel like I've wasted my time and money. Stay far away from this rip-off.",
        rating = 1,
    )
    review10 = Review(
        product_id = 5,
        buyer_id = 6,
        title = 'Confusing and Ineffective',
        content = "The instructor's explanations were convoluted, and the projects were overly complex for beginners. I struggled to follow along, and my AI assistant ended up a jumbled mess.",
        rating = 2,
    )
    review11 = Review(
        product_id = 6,
        buyer_id = 5,
        title = 'From Novice to Knowledgeable',
        content = " I had minimal coding experience when I started, but the instructors' patient teaching style and the hands-on projects helped me grasp complex concepts quickly.",
        rating = 5,
    )
    review12 = Review(
        product_id = 6,
        buyer_id = 9,
        title = 'Left Me Confused',
        content = "I found myself struggling to keep up. The pacing felt rushed at times, and certain concepts were explained without sufficient context. Additionally, the dual focus on both Python and R added confusion for someone like me who's still trying to master one language",
        rating = 2,
    )
    review13 = Review(
        product_id = 7,
        buyer_id = 3,
        title = 'Strong and Durable!',
        content = "I couldn't be happier with this monitor! It's not just your average monitor; it's a game-changer. The sleek design not only offers top-notch protection but also adds a touch of elegance.",
        rating = 5,
        image = "https://m.media-amazon.com/images/I/51eIqpb88PL._SY88.jpg"
    )
    review14 = Review(
        product_id = 8,
        buyer_id = 5,
        title = 'loved it!',
        content = "The course takes you step by step through the development process, from basic concepts to advanced features. The instructors' explanations are clear, and the hands-on projects provide invaluable experience.",
        rating = 3,
    )
    review15 = Review(
        product_id = 9,
        buyer_id = 5,
        title = 'Underwhelming for Coding',
        content = "While the Elgato Stream Deck has its merits, I found it somewhat underwhelming as a code snippet manager. The limited number of buttons can be restrictive for managing a large collection of snippets efficiently",
        rating = 3,
        image = 'https://m.media-amazon.com/images/I/81055h7HRZL._UC175,175_CACC,175,175_.jpg'
    )
    review16 = Review(
        product_id = 9,
        buyer_id = 7,
        title = 'Productivity Boost',
        content = "this has become an integral part of my coding setup. Its programmable buttons enable me to organize and access code snippets, commands, and applications with a single press. The tactile feel of each button and the intuitive software make customization a breeze. It's like having a personal coding assistant right at my fingertips.",
        rating = 5,
    )
    review17 = Review(
        product_id = 10,
        buyer_id = 5,
        title = 'Engineering Marvel',
        content = "The Saleae Logic Pro 16 Logic Analyzer has become my go-to tool for debugging complex hardware and software interactions. Its ability to capture and analyze digital signals in real-time has been instrumental in identifying elusive bugs",
        rating = 5,
    )
    review18 = Review(
        product_id = 13,
        buyer_id = 5,
        title = 'Design Miss',
        content = "I had high hopes, but the design falls flat. The coding symbols are difficult to decipher, and the placement is odd",
        rating = 2,
        image = 'https://m.media-amazon.com/images/I/71ippufoNGL._UC175,175_CACC,175,175_.jpg'
    )
    review19 = Review(
        product_id = 13,
        buyer_id = 8,
        title = 'Geek Chic',
        content = "The subtle yet clever coding symbols make it a conversation starter, especially in tech circles.",
        rating = 5,
    )
    review20 = Review(
        product_id = 1,
        buyer_id = 8,
        title = 'A Coder\'s Best Friend',
        content = "The programmable keys are a lifesaver, allowing me to streamline complex commands and macros, while the satisfying mechanical switches make typing a joy.",
        rating = 5,
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)

    db.session.commit()




def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
