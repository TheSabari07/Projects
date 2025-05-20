from django.urls import path
from .views import BookListCreateView, MemberListCreateView, BorrowBookView

urlpatterns = [
    path('books/', BookListCreateView.as_view()),
    path('members/', MemberListCreateView.as_view()),
    path('borrow/', BorrowBookView.as_view()),
]
