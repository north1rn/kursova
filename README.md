1. Create .env file

PORT=[app's port]
API_KEY=[your API key]

2. Build the app 

docker build -t ipcheck .

3. Run the app

docker run --env-file .env -d -p 3000:3000 ipcheck