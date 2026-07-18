
# this is called shebang it tells os to execute this program using bash interpreter present in /bin/bash
 #!/bin/bash

mkdir -p {config,controllers,models,routes}

touch \
.env \
.gitignore \
server.js \
config/db.js \
controllers/authController.js \
models/authModel.js \
routes/authRoute.js 

echo "Project structure created successfully"

