from django.db import models

# Create your models here.
from mongoengine import Document, StringField, IntField, DateTimeField, ReferenceField

class Member(Document):
    name = StringField(required=True)
    email = StringField(required=True, unique=True)

class Book(Document):
    title = StringField(required=True)
    author = StringField()
    copies = IntField(default=1)

class Borrow(Document):
    member = ReferenceField(Member)
    book = ReferenceField(Book)
    borrow_date = DateTimeField()
    return_date = DateTimeField()
