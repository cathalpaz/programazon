# Programazon

Programazon is an Amazon inspired e-commerce site tailored to tech needs, streamlining the process of selling items. Built with Flask, SQLAlchemy, React, Redux, and AWS, users experience an enhanced interface for selling, purchasing, and reviewing products, along with the capability to update their cart.

[LIVE LINK](https://programazon.onrender.com/)

![programazon](https://github.com/cathalpaz/programazon/assets/124412635/3e6da445-113e-41dc-a834-be3ae2f2724f)

## Technologies Used

### Backend
![Flask](https://img.shields.io/badge/Flask-000000.svg?style=for-the-badge&logo=Flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
- SQLAlchemy

### Frontend
![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)

### Cloud Services
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white)

## Visit my wiki page for more details!
* [MVP Features](https://github.com/cathalpaz/programazon/wiki/Feature-List)
* [DB Diagram](https://github.com/cathalpaz/programazon/wiki/DB-Schema)

## Screenshots/GIFs

![programazon1](https://github.com/cathalpaz/programazon/assets/124412635/2ad80795-2089-403b-a6ce-2905c5c69c19)
![programazon2](https://github.com/cathalpaz/programazon/assets/124412635/4027be91-dad1-42fd-9f5a-ef7c73c39d03)
![programazon3](https://github.com/cathalpaz/programazon/assets/124412635/5a1d9c18-420f-4abf-9b41-c8bac74bf77f)

## Future goals/implementations
* Enhance user customizability, such as modifying user addresses as well as incorporating support for multiple addresses per user.

## Any questions/concerns, Contact me here!

<a href='https://www.linkedin.com/in/cathal-paz/' target='_blank' rel='noreferrer'>
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2.svg?style=for-the-badge&logo=LinkedIn&logoColor=white" alt='linkedin' />
</a>

## API Endpoints
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/api/auth/login`                        | Logs in user, Recieve body containing credential & password                     |
| `POST`   | `/api/auth/signup`                        | Signs up user, Recieve body containing username, email, password & address                      |
| `GET`    | `/api/auth/logout`                          | Logs out user                      |
| `GET`  | `/api/users`                          | Fetches all users                 |
| `GET`   | `/api/users/:userId`                 | Fetches single user                |
| `GET`   | `/api/products?=`                 | Fetches all products, takes optional query string                |
| `GET`   | `/api/products/:productId`                 | Fetches single product                |
| `GET`   | `/api/products/:productId/reviews`                 | Fetches reviews for single product              |
| `POST`   | `/api/products/new`                 | Creates new product, Recieve body containing name, price, description, category, image, stock_quantity    |
| `PUT`   | `/api/products/:productId`                 | Updates product, Recieve body containing name, price, description, category, image, stock_quantity     |
| `DELETE`   | `/api/products/:productId`                 | Deletes product     |
| `GET`   | `/api/products/current`                 | Fetches users' created products     |
| `GET`   | `/api/reviews`                 | Fetches all reviews |
| `GET`   | `/api/reviews/:reviewId`                 | Fetches single review     |
| `POST`   | `/api/products/:productId/reviews`     | Creates product review, Recieve body containing title, content, and rating     |
| `PUT`   | `/api/reviews/:reviewId`     | Updates product review, Recieves body containing title, content, and rating |
| `DELETE`   | `/api/reviews/:reviewId`     | Deletes review |
| `GET`   | `/api/carts`     | Fetches user cart |
| `POST`   | `/api/products/:productId/cart`     | Adds product to user cart, Recieves body containing quantity |
| `DELETE`   | `/api/carts/:productId`     | Removes product from cart |
| `PUT`   | `/api/carts`     | Updates quantity of product in cart, Recieves body containing quantity |
| `GET`   | `/api/orders`     | Fetches all users' orders |
| `POST`   | `/api/orders`     | Purchases all items in cart |


