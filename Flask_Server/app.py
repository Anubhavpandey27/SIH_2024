from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from pypdf import PdfReader
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def helloWorld():
  print("Hello, cross-origin-world!")

# Initialize the Sentence Transformer model using BERT with mean-tokens pooling
model = SentenceTransformer('bert-base-nli-mean-tokens')

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    page = reader.pages[0]
    text = page.extract_text()
    return text

# Function to calculate similarity
def calculate_similarity(text1, text2):
    sentences = [text1, text2]
    sentence_embeddings = model.encode(sentences)
    similarity_scores = cosine_similarity([sentence_embeddings[0]], sentence_embeddings[1:])
    return similarity_scores[0][0]

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['resume']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        # Save the file to a temporary location
        file_path = os.path.join('/tmp', file.filename)
        file.save(file_path)
        print("got resume")

        # Extract text from the PDF
        resume_text = extract_text_from_pdf(file_path)
        print("got resume text")

        # Example job description text
        job_description = request.form.get('job_description', '')
        print("got jd")

        # Calculate similarity
        similarity_score = calculate_similarity(resume_text, job_description)
        print("got score")

        # Remove the temporary file
        os.remove(file_path)

        # Convert similarity score to a standard Python float
        similarity_score = float(similarity_score)
        print("corrected format of score")
        
        return jsonify({"similarity_score": similarity_score}), 200

    return jsonify({"error": "Invalid file format"}), 400

if __name__ == '__main__':
    app.run(debug=True)