import streamlit as st
import requests
import pandas as pd

API_BASE = "http://127.0.0.1:8000/api"

# --- PAGE CONFIG ---
st.set_page_config(page_title="Library Management System", layout="wide")

# --- HEADER ---
st.markdown(
    """
    <h1 style='text-align: center;'>Library Management System</h1>
    <hr style='border-top: 1px solid #ccc;' />
    """,
    unsafe_allow_html=True
)

# --- FETCH BOOKS FUNCTION ---
def fetch_books():
    try:
        response = requests.get(f"{API_BASE}/books/")
        response.raise_for_status()
        return response.json()
    except Exception as e:
        st.error("Failed to fetch books.")
        st.exception(e)
        return []

# --- BOOK LIST & DELETE SECTION ---
st.subheader("Book Inventory")

books = fetch_books()

if books:
    for book in books:
        col1, col2, col3, col4, col5 = st.columns([3, 3, 2, 3, 1])
        col1.markdown(f"**{book['title']}**")
        col2.markdown(book['author'])
        col3.markdown(f"Copies: {book['copies']}")
        col4.markdown(f"ID: {book['id']}")
        if col5.button("Delete", key=f"del-{book['id']}"):
            try:
                res = requests.delete(f"{API_BASE}/books/{book['id']}/")
                if res.status_code == 204:
                    st.success(f"Deleted '{book['title']}' successfully.")
                    st.rerun()
                else:
                    st.error(f"Failed to delete book (Status: {res.status_code})")
                    try:
                        st.json(res.json())
                    except Exception:
                        st.write(res.text)
            except Exception as e:
                st.error("Error occurred while deleting the book.")
                st.exception(e)
    st.markdown("---")
else:
    st.info("No books available.")

# --- ADD NEW BOOK SECTION ---
st.subheader("Add a New Book")
with st.form("add_book_form"):
    col1, col2, col3 = st.columns(3)
    with col1:
        title = st.text_input("Title")
    with col2:
        author = st.text_input("Author")
    with col3:
        copies = st.number_input("Number of Copies", min_value=1, value=1)

    submitted = st.form_submit_button("Add Book")

    if submitted:
        if title and author:
            payload = {"title": title.strip(), "author": author.strip(), "copies": copies}
            try:
                res = requests.post(f"{API_BASE}/books/", json=payload)
                if res.status_code == 201:
                    st.success(f"Book '{title}' added successfully.")
                    st.experimental_rerun()
                else:
                    st.error(f"Failed to add book (Status: {res.status_code})")
                    st.json(res.json())
            except Exception as e:
                st.error("An error occurred while adding the book.")
                st.exception(e)
        else:
            st.warning("Please fill in both the title and author.")
