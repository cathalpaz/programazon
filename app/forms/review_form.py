from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


# ADD AWS HERE

class ReviewForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired(), Length(max=2000)])
    rating = IntegerField('Rating')
    image = StringField('Image')
    submit = SubmitField('Submit')