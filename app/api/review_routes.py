from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import db, Review
from ..forms import ReviewForm

from .error_helpers import NotFoundError, ForbiddenError
from .auth_routes import validation_errors_to_error_messages

from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3



# TODO: ADD AWS TO IMAGES, POST AND PUT

reviews_routes = Blueprint('reviews', __name__, url_prefix="/reviews")


# GET all reviews
@reviews_routes.route("")
def get_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


# GET single review
@reviews_routes.route("/<int:id>")
def get_single_review(id):
    review = Review.query.get(id)

    if not review:
        error = NotFoundError('Review Not Found')
        return error.error_json()

    return {"review": review.to_dict()}


# POST review
# IN PRODUCT ROUTES


# EDIT review for product
@reviews_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)

    if not review:
        error = NotFoundError('Review Not Found')
        return error.error_json()

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token' and field != 'image':
                setattr(review, field, form.data[field])

        image = form.data.get("image")
        if image:
            if review.image:
                remove_file_from_s3(review.image)
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {"errors": "URL not in upload"}

            url = upload["url"]
            review.image = url

        db.session.commit()
        return {"review": review.to_dict()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# DELETE review
@reviews_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if not review:
        error = NotFoundError('Review Not Found')
        return error.error_json()

    if review.image:
        remove_file_from_s3(review.image)
    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully Deleted"}
