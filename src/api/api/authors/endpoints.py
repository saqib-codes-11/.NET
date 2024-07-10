from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.schemas import User, Author, AuthorBase, Book, BookBase
from db.repositories import AuthorRepository, BookRepository
from db.session import get_db
from api.auth.utils import get_current_user

router = APIRouter()


@router.get('/authors', response_model=List[Author])
def get_all_authors(
    db: Session = Depends(get_db),
):
    authors = AuthorRepository.get_all_authors(db)
    return authors


@router.get('/authors/{author_id}', response_model=Author)
def get_author(
    author_id: int,
    db: Session = Depends(get_db),
):
    author = AuthorRepository.get_author(db, author_id=author_id)
    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Author not found',
        )
    return author


@router.post('/authors', response_model=Author)
def create_author(
    author: AuthorBase,
    books: List[BookBase],
    db: Session = Depends(get_db),
):
    new_author = AuthorRepository.create_author(db, author)
    new_books = []
    for book in books:
        book.author_id = new_author.id
        new_book = BookRepository.create_book(db, book)
        new_books.append(new_book)
    return new_author


@router.put('/authors/{author_id}', response_model=Author)
def update_author(
    author_id: int,
    author: AuthorBase,
    db: Session = Depends(get_db),
):
    updated_author = AuthorRepository.update_author(db, author_id, author)
    if not updated_author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Author not found',
        )
    return updated_author


@router.delete('/authors/{author_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_author(
    author_id: int,
    db: Session = Depends(get_db),
):
    deleted = AuthorRepository.delete_author(db, author_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Author not found',
        )
