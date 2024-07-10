from sqlalchemy.orm import Session

from db.models.author import Author
from db.schemas.author import AuthorBase


class AuthorRepository:
    def __init__(self: Session, db: Session):
        self = db

    def get_author(self: Session, author_id: int):
        return self.query(Author).filter(Author.id == author_id).first()

    def get_all_authors(self: Session):
        return self.query(Author).all()

    def create_author(self: Session, author: AuthorBase):
        db_author = Author(name=author.name)
        self.add(db_author)
        self.commit()
        self.refresh(db_author)
        return db_author

    def update_author(self: Session, author_id: int, new_author: AuthorBase):
        author = self.query(Author).filter(Author.id == author_id).first()
        if author:
            author.name = new_author.name
            self.commit()
            self.refresh(author)
            return author

    def delete_author(self: Session, author_id: int):
        author = self.query(Author).filter(Author.id == author_id).first()
        if author:
            self.delete(author)
            self.commit()
            return True
