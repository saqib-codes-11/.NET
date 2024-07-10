from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from typing import List

from db.models.book import Book
from db.models.author import Author
from db.schemas.book import BookBase, BookWithAuthor


class BookRepository:
    def __init__(self: Session, db: Session):
        self = db

    def get_book(self: Session, book_id: int) -> BookWithAuthor:
        book = self.query(Book).join(Author, Book.author_id ==
                                     Author.id).filter(Book.id == book_id).first()
        if book:
            return {
                "id": book.id,
                "name": book.name,
                "pages": book.pages,
                "author_id": book.author_id,
                "author_name": book.author.name,
            }

    def get_all_books(self: Session) -> List[BookWithAuthor]:
        books = self.query(Book).join(
            Author, Book.author_id == Author.id).all()
        book_list = []
        for book in books:
            book_data = {
                "id": book.id,
                "name": book.name,
                "pages": book.pages,
                "author_id": book.author_id,
                "author_name": book.author.name,
            }
            book_list.append(book_data)
        return book_list

    def create_book(self: Session, book: BookBase):
        db_book = Book(
            name=book.name,
            pages=book.pages,
            author_id=book.author_id
        )
        self.add(db_book)
        self.commit()
        self.refresh(db_book)
        return db_book

    def update_book(self: Session, book_id: int, new_book: BookBase):
        book: Book = self.query(Book).filter(Book.id == book_id).first()
        if book:
            book.name = new_book.name
            book.pages = new_book.pages
            book.author_id = new_book.author_id
            self.commit()
            self.refresh(book)
            return book

    def delete_book(self: Session, book_id: int):
        book = self.query(Book).filter(Book.id == book_id).first()
        if book:
            self.delete(book)
            self.commit()
            return True
