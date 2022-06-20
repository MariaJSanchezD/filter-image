import cv2
import numpy as np
from flask import Flask, flash, request, url_for, render_template, redirect, jsonify
import urllib.request
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads/'
FILTERED_FOLDER = 'static/filtered/'

app.secret_key = "secretkey_m"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['FILTERED_FOLDER'] = FILTERED_FOLDER
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def home():
    #response = jsonify(message = 'Server is running')
    #return response
   return render_template('index.html')


@app.route('/', methods=['POST'])
#@cross_origin()
def upload_image():
    if 'file' not in request.files:
        flash('No file part. No se ha encontrado el archivo.')
        return False
    file = request.files['file']
    if file.filename == '':
        flash('No image selected. No hay ninguna imagen seleccionada.')
        return False
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Image successfully upload. Imagen subida correctamente.')
        url = "http://localhost:5000/display/" + filename
        with urllib.request.urlopen(url) as resp:
            image = np.asarray(bytearray(resp.read()), dtype="uint8")
            image = cv2.imdecode(image, 0)
            cv2.imwrite("static/filtered/" + filename, image)
        #response = jsonify(imgUrl=url_for('static', filename='uploads/' + filename))
        #response.headers.add("Access-Control-Allow-Origin", "*")
        #return response
        return render_template('index.html', filename=filename)
    else:
        flash('Incorrect image type, allowed: png and jpg. Tipo de archivo incorrecto, permitidos: png y jpg')
        #return False
        return redirect(request.url)


@app.route('/display/<filename>')
def display_image(filename):
    return redirect(url_for('static', filename='uploads/' + filename), code=301)


@app.route('/display_filtered/<filename>')
def display_image_filtered(filename):
    return redirect(url_for('static', filename='filtered/' + filename), code=301)


if __name__ == '__main__':
    app.run()
