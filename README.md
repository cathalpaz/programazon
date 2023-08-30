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
| `GET`    | `/api/posts/28`                          | Retrieve post #28.                       |
| `PATCH`  | `/api/posts/28`                          | Update data in post #28.                 |
| `POST`   | `/api/posts/28/comments`                 | Add comment to post #28.                 |
