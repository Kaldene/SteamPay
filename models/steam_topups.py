from . import db
from datetime import datetime


class SteamTopup(db.Model):
    __tablename__ = "steam_topups"

    id = db.Column(db.Integer, primary_key=True)
    steam_login = db.Column(db.String(250), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    payment_method = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(30), default='pending', nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    def __repr__(self):
        return f'<User {self.em}>'