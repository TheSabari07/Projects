import streamlit as st
import requests

API_BASE = "http://127.0.0.1:8000/api"

# --- PAGE CONFIG ---
st.set_page_config(page_title="Library Management System", layout="wide")

# --- HEADER ---
st.markdown("""
    <h1 style='text-align: center;'>Library Management System</h1>
    <hr style='border-top: 1px solid #ccc;' />
""", unsafe_allow_html=True)

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

# --- SEARCH ---
search_term = st.text_input("Search books by title or author").strip().lower()

# --- BOOK INVENTORY ---
st.subheader("📚 Book Inventory")

books = fetch_books()
if search_term:
    books = [book for book in books if search_term in book['title'].lower() or search_term in book['author'].lower()]

if books:
    for book in books:
        with st.container():
            st.markdown("---")
            col1, col2, col3, col4 = st.columns([4, 3, 2, 5])

            # Book Details
            col1.markdown(f"**Title:** {book['title']}")
            col2.markdown(f"**Author:** {book['author']}")
            col3.markdown(f"**Copies:** {book['copies']}")

            # Action Buttons
            with col4:
                b1, b2, b3, b4 = st.columns([1, 1, 1, 2])

                # ➕ Increase
                if b1.button("➕", key=f"inc-{book['id']}"):
                    try:
                        res = requests.patch(f"{API_BASE}/books/{book['id']}/", json={"copies": book['copies'] + 1})
                        if res.status_code == 200:
                            st.rerun()
                        else:
                            st.error("Failed to increase copies.")
                    except Exception as e:
                        st.exception(e)

                # ➖ Decrease (only if >1)
                if b2.button("➖", key=f"dec-{book['id']}"):
                    if book['copies'] > 1:
                        try:
                            res = requests.patch(f"{API_BASE}/books/{book['id']}/", json={"copies": book['copies'] - 1})
                            if res.status_code == 200:
                                st.rerun()
                            else:
                                st.error("Failed to decrease copies.")
                        except Exception as e:
                            st.exception(e)
                    else:
                        st.warning("Only 1 copy left. Use delete to remove the book.")

                # 🗑️ Delete
                if b3.button("🗑️", key=f"del-{book['id']}"):
                    try:
                        res = requests.delete(f"{API_BASE}/books/{book['id']}/")
                        if res.status_code == 204:
                            st.success(f"Deleted '{book['title']}'")
                            st.rerun()
                        else:
                            st.error("Failed to delete book.")
                    except Exception as e:
                        st.exception(e)

                # ✏️ Edit Book
                with b4.expander("✏️ Edit"):
                    with st.form(key=f"edit-form-{book['id']}"):
                        new_title = st.text_input("Title", value=book['title'], key=f"title-{book['id']}")
                        new_author = st.text_input("Author", value=book['author'], key=f"author-{book['id']}")
                        new_copies = st.number_input("Copies", min_value=0, value=book['copies'], key=f"copies-{book['id']}")
                        submit_edit = st.form_submit_button("Update")

                        if submit_edit:
                            payload = {
                                "title": new_title.strip(),
                                "author": new_author.strip(),
                                "copies": new_copies
                            }
                            try:
                                res = requests.patch(f"{API_BASE}/books/{book['id']}/", json=payload)
                                if res.status_code == 200:
                                    st.success("Book updated successfully.")
                                    st.rerun()
                                else:
                                    st.error("Failed to update book.")
                            except Exception as e:
                                st.exception(e)
else:
    st.info("No books found.")

# --- ADD NEW BOOK SECTION ---
st.markdown("---")
st.subheader("➕ Add a New Book")
with st.form("add_book_form", clear_on_submit=True):
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
                    st.rerun()
                else:
                    st.error("Failed to add book.")
            except Exception as e:
                st.exception(e)
        else:
            st.warning("Please fill in both the title and author.")
