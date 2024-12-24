from flask import Flask, render_template, request, jsonify, redirect, url_for, Response
from flask_assets import Environment, Bundle
import os
import requests

app = Flask(__name__)
assets = Environment(app)

# Configure static asset bundles
js = Bundle(
    'js/three.min.js',
    'js/anime.min.js',
    'js/main.js',
    output='gen/packed.js'
)
assets.register('js_all', js)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/streaming')
def streaming():
    # Get tutorials and films data
    tutorials = get_tutorials()
    films = get_upcoming_films()
    return render_template('streaming.html', tutorials=tutorials, films=films)

@app.route('/proxy/video')
def proxy_video():
    # Stream the video through our server to avoid CORS issues
    video_url = "https://enclave-projects.s3.eu-north-1.amazonaws.com/video.mp4"
    req = requests.get(video_url, stream=True)
    return Response(
        req.iter_content(chunk_size=8192),
        content_type=req.headers['Content-Type'],
        headers={
            'Accept-Ranges': 'bytes',
            'Content-Length': req.headers.get('Content-Length', ''),
            'Cache-Control': 'no-cache'
        }
    )

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    
    # Here you would typically send an email or store the contact form data
    # For now, we'll just return a success response
    return jsonify({
        'status': 'success',
        'message': 'Thank you for your message! We will get back to you soon.'
    })

def get_tutorials():
    # In a real application, this would come from a database
    return [
        {
            'title': 'Advanced VFX Techniques',
            'description': 'Professional VFX Tutorial Series',
            'episodes': 12,
            'level': 'Advanced'
        },
        {
            'title': 'Color Grading Masterclass',
            'description': 'Learn Professional Color Grading',
            'episodes': 8,
            'level': 'Intermediate'
        },
        {
            'title': 'Sound Design Workshop',
            'description': 'Create Immersive Audio Experiences',
            'episodes': 6,
            'level': 'Beginner'
        }
    ]

def get_upcoming_films():
    # In a real application, this would come from a database
    return [
        {
            'title': 'The Infinite Journey',
            'description': 'Adventure Documentary',
            'status': 'Coming Soon',
            'release_date': '2024'
        },
        {
            'title': 'Digital Dreams',
            'description': 'Sci-Fi Short Film',
            'status': 'In Production',
            'release_date': '2024'
        }
    ]

@app.route('/api/streaming/upcoming')
def upcoming_films():
    return jsonify(get_upcoming_films())

@app.route('/api/streaming/tutorials')
def tutorials():
    return jsonify(get_tutorials())

if __name__ == '__main__':
    app.run(debug=True) 