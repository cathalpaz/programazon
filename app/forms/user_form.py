from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_validator(form, field):
    if "@" not in field.data:
        raise ValidationError("Must be a valid email")


class UserForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=4, max=20), username_exists])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6, max=50)])
    email = EmailField("Email", validators=[DataRequired(), email_validator, user_exists])
    address = StringField("Address", validators=[DataRequired()])
