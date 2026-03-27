from flask import  Blueprint, render_template, request, redirect, url_for,flash
from models import User,db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_required, current_user, login_user, logout_user
from datetime import timedelta

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username'].strip()
        email = request.form['email'].strip()
        password = request.form['password'].strip()
        confirm_password = request.form['confirm_password'].strip()

        if not username or not email or  not password or not confirm_password:
            flash('Заполните поля', 'danger')
            return render_template('auth/register.html')

        if password != confirm_password:
            flash("Пароли не совпадают", "danger")
            return render_template('auth/register.html')

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Пользователь уже существует', 'danger')
            return render_template('auth/register.html')

        try:
            password_hash = generate_password_hash(password)

            user = User(
                email=email,
                password_hash=password_hash,
                username=username
            )

            db.session.add(user)
            db.session.commit()

            login_user(user,remember=True, duration=timedelta(days=30))
            return redirect(url_for('main_routes.home'))

        except Exception as e:
            db.session.rollback()
            flash('Ошибка при создании пользователя', 'danger')
            return render_template('auth/register.html')

    return render_template('auth/register.html')

@auth_routes.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email'].strip()
        password = request.form['password'].strip()

        if not email or not password:
            flash('Заполните поля', 'danger')
            return render_template('auth/login.html')

        user= User.query.filter_by(email=email).first()

        if  not user:
            flash("Пользователь не найден")
            return render_template('auth/login.html')

        if not check_password_hash(user.password_hash, password):
            flash('Неверный пароль', 'danger')
            return redirect(url_for('auth.login'))

        login_user(user, remember=True, duration=timedelta(days=30))
        flash('Вы успешно вошли', 'success')
        return redirect(url_for('main_routes.home'))

    return render_template('auth/login.html')

@auth_routes.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Вы вышли из аккаунта', 'success')
    return redirect(url_for('auth_routes.login'))
