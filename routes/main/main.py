from flask import  Blueprint, render_template, request, redirect, url_for,flash


main_routes = Blueprint('main_routes',__name__)

@main_routes.route('/')
def index():
    return render_template('index.html')