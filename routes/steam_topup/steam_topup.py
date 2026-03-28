from flask import Blueprint,render_template,request,redirect,url_for,flash
from flask_login import login_required, current_user
from models import SteamTopup,db

steam_routes = Blueprint('steam_routes', __name__)
#На доработке

@steam_routes.route('/steam_topup', methods=['GET', 'POST'])
def steam_topup():
    if request.method == 'POST':
        steam_login = request.form['steam_login'].strip()
        amount = request.form['amount'].strip()
        #payment_method = request.form['payment_method'].strip()

        if not steam_login or not amount:
            flash('Заполните поля')
            return redirect(url_for('steam_routes.steam_topup'))

        try:
            amount = int(amount)
        except ValueError:
            flash('Сумма должна быть числом')
            return redirect(url_for('steam_routes.steam_topup'))

        if amount <= 0:
            flash('Сумма должна быть больше 0', 'warning')
            return redirect(url_for('steam_routes.steam_topup'))

        try:
            topup = SteamTopup(
                steam_login=steam_login,
                amount=amount,
               # payment_method=payment_method,
                user_id= current_user.id
            )

            db.session.add(topup)
            db.session.commit()
            flash("Ожидайте пополнения steam",'success')
            return redirect(url_for('steam_routes.steam_topup'))
        except Exception as e:
            db.session.rollback()
            return redirect(url_for('steam_routes.steam_topup'))

    return render_template('steam/steam_topup.html')