from django.urls import path
from .views import (
    BookListCreateView,
    BookDetailView,
    MemberListCreateView,
    BorrowBookView,
)

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<str:pk>/', BookDetailView.as_view(), name='book-detail'),  # Now delete will work
    path('members/', MemberListCreateView.as_view(), name='member-list-create'),
    path('borrow/', BorrowBookView.as_view(), name='borrow-book'),
]
