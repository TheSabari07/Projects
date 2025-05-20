from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Member, Borrow
from .serializers import BookSerializer, MemberSerializer, BorrowSerializer
from bson import ObjectId
from django.http import Http404
import datetime

# 📚 Book API (List + Create)
class BookListCreateView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            Book(**serializer.validated_data).save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 👤 Member API (List + Create)
class MemberListCreateView(APIView):
    def get(self, request):
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            Member(**serializer.validated_data).save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 📦 Borrow Book API
class BorrowBookView(APIView):
    def post(self, request):
        member_id = request.data.get('member')
        book_id = request.data.get('book')
        
        member = Member.objects(id=member_id).first()
        book = Book.objects(id=book_id).first()

        if not member or not book:
            return Response({"error": "Invalid member or book ID"}, status=400)

        if book.copies < 1:
            return Response({"error": "No copies available"}, status=400)

        borrow = Borrow(
            member=member,
            book=book,
            borrow_date=datetime.datetime.now()
        )
        borrow.save()

        # Reduce book copies
        book.copies -= 1
        book.save()

        return Response({"message": "Book borrowed successfully"}, status=201)

class BookDetailView(APIView):
    def delete(self, request, pk):
        try:
            object_id = ObjectId(pk)
        except Exception:
            raise Http404("Invalid book ID format")

        book = Book.objects(id=object_id).first()
        if not book:
            raise Http404("Book not found")

        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)