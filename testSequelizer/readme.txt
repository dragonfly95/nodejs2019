> npm i sequelize mysql2
> npm i -g sequelize-cli
> sequelize init

# sequelize model:create --name post --attributes "title:string, writer:string"

#sequelize model:create --name reply --attributes "postId:integer, writer:string, content:text"

# sequelize db:migrate

# npm start

참고사이트 
https://victorydntmd.tistory.com/32?category=677306
