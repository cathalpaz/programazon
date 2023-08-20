from ..models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text


# ADD AWS TO PRODUCT IMAGES

def seed_products():
    product1 = Product(
        name = 'Programmable Mechanical Keyboard for Coding: Corsair K95 RGB Platinum Mechanical Gaming Keyboard',
        price = 54.99,
        description = 'The Corsair K95 RGB Platinum is a top-tier mechanical keyboard designed for intense gaming and coding sessions. It features Cherry MX mechanical key switches, which offer tactile feedback and durability. With 18 fully programmable G-keys, you can assign complex macros or commonly used code snippets for quick access. The keyboard also boasts customizable RGB backlighting with per-key lighting control, allowing you to create a personalized coding environment',
        seller_id = 1,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/71PzW7vZNUL._AC_UY218_.jpg',
        stock_quantity = 5
    )
    product2 = Product(
        name = 'Tech Enthusiast Mug',
        price = 4.99,
        description = 'Start your day with the Tech Enthusiast Mug, designed for those who are passionate about all things tech. Sip your favorite beverage from this high-quality ceramic mug featuring a creative tech-themed design. Whether you\'re coding, brainstorming, or taking a break, the Tech Enthusiast Mug is the perfect companion. Showcase your love for technology while enjoying your drink of choice.',
        seller_id = 6,
        category = 'Merchandise',
        image = 'https://m.media-amazon.com/images/I/51G492p7lCL._AC_UL400_.jpg',
        stock_quantity = 6
    )
    product3 = Product(
        name = 'Programmable Mouse for Programming: Logitech MX Master 3 Wireless Mouse',
        price = 14.99,
        description = 'The Logitech MX Master 3 is a premium wireless mouse engineered for productivity and coding tasks. Its unique electromagnetic scroll wheel offers precise scrolling and navigation, perfect for code browsing. The mouse features multiple programmable buttons that can be customized for different software shortcuts and commands. With its Darkfield sensor, it works flawlessly on any surface, and the ergonomic design ensures comfort during extended coding sessions',
        seller_id = 5,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_UY218_.jpg',
        stock_quantity = 11
    )
    product4 = Product(
        name = 'AWS Cloud Platform License',
        price = 4.99,
        description = 'Unlock the power of the AWS Cloud Platform with this comprehensive license. Gain access to Amazon Web Services\' vast array of services, from computing and storage to machine learning and analytics. Deploy applications, host websites, and scale resources effortlessly. With this license, you\'ll have the flexibility to innovate, manage, and optimize your cloud infrastructure effectively. Whether you\'re a startup, enterprise, or individual developer, the AWS Cloud Platform License empowers you to harness the full potential of the cloud',
        seller_id = 5,
        category = 'Licenses',
        image = 'https://m.media-amazon.com/images/I/71TlAHjHjAL._AC_UL400_.jpg',
        stock_quantity = 5
    )
    product5 = Product(
        name = '"Complete Web Development Bootcamp" by Udemy',
        price = 24.99,
        description = 'Dive into the world of web development with the "Complete Web Development Bootcamp" offered on Udemy. This comprehensive course takes you through the fundamentals of HTML, CSS, and JavaScript, and guides you further into advanced topics like Node.js. With hands-on projects and assignments, you\'ll have the opportunity to build real-world web applications from scratch. The course\'s experienced instructor focuses on practical skills, ensuring that you gain the expertise needed for a successful career in web development',
        seller_id = 2,
        category = 'Courses/Tutorials',
        image = 'https://m.media-amazon.com/images/I/61XVS77279L._AC_UY218_.jpg',
        stock_quantity = 8
    )
    product6 = Product(
        name = '"Machine Learning A-Z™: Hands-On Python & R In Data Science" on Udemy',
        price = 7.99,
        description = 'Uncover the complexities of machine learning with "Machine Learning A-Z™" available on Udemy. Delve into the world of data science using both Python and R programming languages. The course covers a wide spectrum of machine learning algorithms and techniques, allowing you to explore data analysis and prediction in-depth. Through practical examples and hands-on projects, you\'ll develop a strong foundation in machine learning concepts and their practical applications',
        seller_id = 2,
        category = 'Courses/Tutorials',
        image = 'https://m.media-amazon.com/images/I/61gMsOrAOtL._AC_UY218_.jpg',
        stock_quantity = 3
    )
    product7 = Product(
        name = 'High-Resolution Code Editor Display: Dell UltraSharp U2719D LED Monitor',
        price = 99.99,
        description = 'The Dell UltraSharp U2719D LED Monitor is a professional-grade display perfect for coding and programming tasks. Its 27-inch QHD resolution provides ample screen real estate for code editing, reducing the need for constant scrolling. The IPS panel ensures consistent colors and wide viewing angles, crucial when reviewing code from various perspectives. The monitor\'s adjustable stand allows you to achieve an ergonomic setup for comfortable coding sessions',
        seller_id = 1,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/516Bzik8WiL._AC_UY218_.jpg',
        stock_quantity = 10
    )
    product8 = Product(
        name = '"iOS App Development with Swift" on Coursera (offered by Stanford University)',
        price = 34.99,
        description = 'Embark on an enriching journey in app development with the "iOS App Development with Swift" course offered by Stanford University on Coursera. Led by Apple engineers, this course immerses you in the world of iOS app creation using the Swift programming language. You\'ll receive a comprehensive overview of the app development process, from generating ideas to submitting your app to the App Store. With hands-on coding exercises and insights from experienced professionals, you\'ll be well-equipped to create captivating iOS applications',
        seller_id = 3,
        category = 'Courses/Tutorials',
        image = 'https://m.media-amazon.com/images/I/71Ix0tKfYsL._AC_UY218_.jpg',
        stock_quantity = 4
    )
    product9 = Product(
        name = 'Code Snippet Manager or Launchpad: Elgato Stream Deck',
        price = 32.49,
        description = 'The Elgato Stream Deck is a versatile tool that can be repurposed for coding and development. With its 15 customizable LCD buttons, you can create a dashboard of shortcuts for code snippets, software commands, and more. The Stream Deck integrates seamlessly with various apps, enabling you to trigger actions instantly. It\'s especially useful for organizing and accessing frequently used code segments, saving time and streamlining your coding workflow',
        seller_id = 3,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/71AsjjEAwqL._AC_UY218_.jpg',
        stock_quantity = 7
    )
    product10 = Product(
        name = 'Debugging Toolkit for Hardware and Software: Saleae Logic Pro 16 Logic Analyzer',
        price = 19.49,
        description = 'The Saleae Logic Pro 16 Logic Analyzer is an advanced debugging tool tailored for hardware and software analysis. With 16 input channels, it can capture digital signals and help identify issues in intricate hardware setups. It supports a range of protocols, making it suitable for various projects. The accompanying software provides powerful analytical capabilities, aiding developers in pinpointing and resolving complex hardware and software problems',
        seller_id = 3,
        category = 'Accessories',
        image = 'https://m.media-amazon.com/images/I/61e4UzAYgcL._AC_UY218_.jpg',
        stock_quantity = 13
    )
    product11 = Product(
        name = 'AI Toolkit Subscription',
        price = 24.99,
        description = 'Experience the future of technology with the AI Toolkit Monthly Subscription. Delve into the world of artificial intelligence and machine learning using a curated collection of cutting-edge tools and libraries. Each month, you\'ll receive updates and new resources to fuel your AI projects. From deep learning frameworks to natural language processing libraries, the AI Toolkit empowers you to create intelligent solutions that shape industries and redefine possibilities',
        seller_id = 4,
        category = 'Licenses',
        image = 'https://www.elegantthemes.com/blog/wp-content/uploads/2023/06/Best-AI-Coding-Assistant-Tools.jpg',
        stock_quantity = 3
    )
    product12 = Product(
        name = 'Smart Home Hub',
        price = 124.99,
        description = 'Transform your living space with the Smart Home Hub, a central control unit for all your smart devices. Seamlessly connect and manage your smart lights, thermostats, locks, and more through a user-friendly interface. With compatibility for various protocols and brands, the Smart Home Hub streamlines your smart home experience. Enjoy the convenience of voice control, automation, and remote access to enhance your lifestyle',
        seller_id = 7,
        category = 'Other',
        image = 'https://m.media-amazon.com/images/I/51TGwi4eTnL._AC_UL400_.jpg',
        stock_quantity = 3
    )
    product13 = Product(
        name = 'Developer\'s Code T-Shirt',
        price = 9.99,
        description = 'Express your passion for coding with the Developer\'s Code T-Shirt. Made with comfortable, high-quality fabric, this shirt features a unique code snippet design that showcases your love for programming. Whether you\'re attending tech events or relaxing at home, this t-shirt is a must-have addition to your wardrobe. Let your style reflect your coding journey with the Developer\'s Code T-Shirt',
        seller_id = 6,
        category = 'Merchandise',
        image = 'https://m.media-amazon.com/images/I/61rUXbJqATL._AC_UL400_.jpg',
        stock_quantity = 10
    )



    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
