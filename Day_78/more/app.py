from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import openai
import os
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Configure OpenAI
openai.api_key = "your-openai-api-key"  # Replace with your API key

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(20), default='student')

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    read = db.Column(db.Boolean, default=False)
    type = db.Column(db.String(20), default='info')
    created_at = db.Column(db.DateTime, server_default=db.func.now())

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        email=data['email'],
        password=hashed_password,
        name=data.get('name', '')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'role': user.role
            }
        })
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    user_message = data.get('message')
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )
        return jsonify({"response": response['choices'][0]['message']['content']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    return jsonify([{
        'id': n.id,
        'message': n.message,
        'read': n.read,
        'type': n.type,
        'created_at': n.created_at.isoformat()
    } for n in notifications])

@app.route('/notifications/mark-read', methods=['POST'])
@jwt_required()
def mark_notifications_read():
    user_id = get_jwt_identity()
    notification_ids = request.get_json().get('notification_ids', [])
    
    if notification_ids:
        Notification.query.filter(
            Notification.id.in_(notification_ids),
            Notification.user_id == user_id
        ).update({Notification.read: True}, synchronize_session=False)
    else:
        Notification.query.filter_by(user_id=user_id).update({Notification.read: True})
    
    db.session.commit()
    return jsonify({'message': 'Notifications marked as read'})

@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'role': user.role
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 