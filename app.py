from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Sample artwork data
artworks = [
    {
        "title": "Gentle Soul",
        "image": "/static/images/gallery/art1.jpeg",
        "description": "Pencil Sketch · 5 hours"
    },
    {
        "title": "Memories",
        "image": "/static/images/gallery/art2.jpeg",
        "description": "Digital Illustration · 6 hours"
    },
    {
        "title": "Silent Gaze",
        "image": "/static/images/gallery/art3.jpeg",
        "description": "Charcoal · 4.5 hours"
    },
    {
        "title": "Morning Light",
        "image": "/static/images/gallery/art4.jpeg",
        "description": "Graphite Sketch · 4 hours"
    },
    {
        "title": "Timeless Look",
        "image": "/static/images/gallery/art5.jpeg",
        "description": "Pencil on Toned Paper · 6.5 hours"
    }
]

# ----------- Routes -----------

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/featured-artworks')
def featured_artworks():
    return jsonify(artworks)



if __name__ == '__main__':
    app.run(debug=True)

