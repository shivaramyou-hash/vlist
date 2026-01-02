## SQL Proxy Connection

# To Access cloud Sql database from local machine you need to follow below steps

1. Firstly add user within that project and assign with the role of `Cloud SQL Client`

2. [Download and Install GCloud CLI SDK in your pc/laptop](https://cloud.google.com/sdk/docs/install)

3. Authenticate your account with command `gcloud auth login`

4. If any database connection url changes or you want change the port you need to edit the sql_proxy.bat

5.Now you can access cloud sql database with just clicking that sql_proxy.bat file it will open cmd just minimize that and use the db

Note: Do not close cmd until you finish your work with db, if you close the cmd your access will be gone.
