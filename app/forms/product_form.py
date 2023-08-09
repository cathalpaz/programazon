from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


# ADD AWS HERE

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100)])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    description = TextAreaField('Description', validators=[DataRequired()])
    category = SelectField('Category', choices=[('1', 'Accessories'), ('2', 'Courses/Tutorials'), ('3', 'Licenses'), ('4', 'Merchandise'), ('5', 'Other')])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired(), NumberRange(min=1, max=20)])
    image = StringField('Image')
    submit = SubmitField('Submit')


class UpdateProductForm(FlaskForm):
    description = TextAreaField('Description')
