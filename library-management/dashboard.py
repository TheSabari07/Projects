import streamlit as st
import requests

st.title("📚 Library Dashboard")

# Example: View books
st.header("All Books")
res = requests.get("http://localhost:8000/api/books/")
if res.status_code == 200:
    books = res.json()
    for book in books:
        st.write(f"**{book['title']}** by {book['author']} - Copies: {book['copies']}")
else:
    st.error("Could not fetch books.")
