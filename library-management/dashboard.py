import streamlit as st
import requests
import pandas as pd

API_BASE = "http://127.0.0.1:8000/api"

# --- PAGE CONFIG ---
st.set_page_config(page_title="📚 Library System", layout="wide")

# --- HEADER ---
st.markdown(
    """
    <h1 style='text-align: center;'>📖 Library Management System</h1>
    <hr style='border-top: 2px solid #bbb;' />
    """,
    unsafe_allow_html=True
)

# --- FETCH BOOKS ---
st.subheader("📚 Available Books")

try:
    response = requests.get(f"{API_BASE}/books/")
    books = response.json()

    if books:
        df = pd.DataFrame(books)
        df.index += 1  # Start index from 1
        df = df.rename(columns={"title": "Title", "author": "Author", "copies": "Copies"})
        st.dataframe(df[["Title", "Author", "Copies"]], use_container_width=True)
    else:
        st.info("No books available.")
except Exception as e:
    st.error("Failed to load books.")
    st.exception(e)

# --- ADD NEW BOOK ---
st.subheader("➕ Add a New Book")

with st.form("add_book_form"):
    col1, col2, col3 = st.columns(3)
    with col1:
        title = st.text_input("Title")
    with col2:
        author = st.text_input("Author")
    with col3:
        copies = st.number_input("Copies", min_value=1, value=1)

    submitted = st.form_submit_button(" Add Book")

    if submitted:
        if title and author:
            payload = {"title": title, "author": author, "copies": copies}
            res = requests.post(f"{API_BASE}/books/", json=payload)
            if res.status_code == 201:
                st.success(f"✅ '{title}' added successfully!")
                st.experimental_rerun()
            else:
                st.error("❌ Failed to add book.")
                st.json(res.json())
        else:
            st.warning("Please fill in both Title and Author.")
