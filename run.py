from backend import create_app
app = create_app()
if __name__ == '__main__':
    app.run(debug=True)

#To write a requirements.txt with all required dependencies:
#'pip install pipreqs'
#'pipreqs /path/to/project --force'