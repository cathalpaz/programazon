from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from ..api.aws_helpers import ALLOWED_EXTENSIONS


def validate_image(form, field):
    if field.data:
        image = field.data
        if not image.endswith('jpg') and not image.endswith('png') and not image.endswith('jpeg'):
            raise ValidationError('Image must end in jpg, png, or jpeg')

# ADD AWS HERE

class ReviewForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired(), Length(max=2000)])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit')
