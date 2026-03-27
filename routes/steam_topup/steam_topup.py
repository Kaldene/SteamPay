from flask import Blueprint,render_template,request,redirect,url_for,flash

steam_routes = Blueprint('steam_routes', __name__)

@steam_routes.route('/steam_topup', methods=['GET', 'POST'])
def steam_topup():
    return render_template('steam/steam_topup.html')