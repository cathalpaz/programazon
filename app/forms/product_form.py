from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError


categories = [
    'Accessories',
    'Courses/Tutorials',
    'Licenses',
    'Merchandise',
    'Other'
]

def validate_category(form, field):
    category = field.data
    if category not in categories:
        raise ValidationError('Invalid category')

# ADD AWS HERE

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = StringField('Category', validators=[DataRequired(), validate_category])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired(), NumberRange(min=1, max=20)])
    image = StringField('Image')
    submit = SubmitField('Submit')


class UpdateProductForm(FlaskForm):
    description = TextAreaField('Description')
