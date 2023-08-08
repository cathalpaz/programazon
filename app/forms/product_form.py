from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, FloatField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


# ADD AWS HERE

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100)])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = SelectField('Category', choices=[('1', 'Accessories'), ('2', 'Courses/Tutorials'), ('3', 'Licenses'), ('4', 'Merchandise'), ('5', 'Other')])
    image = StringField('Image')
    submit = SubmitField('Submit')
