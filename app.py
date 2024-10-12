from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/clima')
def get_clima():
    ciudad = request.args.get('ciudad', 'Acapulco')  # Valor por defecto
    api_key = ''  # Reemplaza con tu clave de API
    response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={api_key}&units=metric')

    if response.status_code == 200:  # Manejo de errores
        return jsonify(response.json())
    else:
        return jsonify({'error': 'No se pudo obtener el clima'}), response.status_code

@app.route('/api/noticias')
def get_noticias():
    ciudad = request.args.get('ciudad', 'Acapulco')  # Asegúrate de que esté aquí
    api_key = ''  # Reemplaza con tu clave de API
    response = requests.get(f'https://newsapi.org/v2/everything?q={ciudad}&from=2024-10-10&sortBy=popularity&apiKey={api_key}')

    if response.status_code == 200:  # Manejo de errores
        return jsonify(response.json())
    else:
        return jsonify({'error': 'No se pudieron obtener las noticias'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
