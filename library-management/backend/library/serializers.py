from rest_framework import serializers
from .models import Book, Member, Borrow

class BookSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField()
    author = serializers.CharField()
    copies = serializers.IntegerField()

class MemberSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    email = serializers.EmailField()

class BorrowSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    member = serializers.CharField()
    book = serializers.CharField()
    borrow_date = serializers.DateTimeField()
    return_date = serializers.DateTimeField(allow_null=True, required=False)
