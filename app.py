from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Sample artwork data
artworks = [
    {
        "title": "Gentle Soul",
        "image": "/static/images/gallery/art1.jpg",
        "description": "Pencil Sketch · 5 hours"
    },
    {
        "title": "Memories",
        "image": "/static/images/gallery/art2.jpg",
        "description": "Digital Illustration · 6 hours"
    },
    {
        "title": "Silent Gaze",
        "image": "/static/images/gallery/art3.jpg",
        "description": "Charcoal · 4.5 hours"
    },
     {
        "title": "Silent Gaze",
        "image": "/static/images/gallery/art4.jpg",
        "description": "Charcoal · 4.5 hours"
    },
     {
        "title": "Silent Gaze",
        "image": "/static/images/gallery/art5.jpg",
        "description": "Charcoal · 4.5 hours"
    }
]

# ----------- Routes -----------

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/api/artworks")
def get_artworks():
    return jsonify(artworks)


if __name__ == '__main__':
    app.run(debug=True)

