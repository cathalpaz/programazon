from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, Length



class UserForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=4, max=50)])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=4, max=50)])
    email = EmailField("Email", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
