from flask_wtf import FlaskForm
from wtforms import SubmitField, FloatField
from wtforms.validators import DataRequired, NumberRange


class PurchaseForm(FlaskForm):
    total_price = FloatField('Total Price', validators=[DataRequired(), NumberRange(min=0)])
    submit = SubmitField('Submit')
