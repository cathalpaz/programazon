from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange, ValidationError
from ..api.aws_helpers import ALLOWED_EXTENSIONS


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

def validate_price(form, field):
    price = float(field.data)
    if (price * 100) % 1 != 0:
        raise ValidationError('Invalid price')

def validate_image(form, field):
    image = field.data
    if not image.endswith('jpg') and not image.endswith('png') and not image.endswith('jpeg'):
        raise ValidationError('Image must end in jpg, png, or jpeg')

# ADD AWS HERE

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired(), validate_price, NumberRange(min=0.99, max=9999)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = StringField('Category', validators=[DataRequired(), validate_category])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired(), NumberRange(min=1, max=20)])
    image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
