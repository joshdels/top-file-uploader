# TOP File Uploader

Uses a practice of ORM, Database and Cloud Storage....

![alt text](image.png)

## Tech Stack

1. Prisma
2. Express
3. Ejs
4. Passport.js 
5. Supabase
6. Postgres


## .env structure
```
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
SECRET="secret"
```

## Prisma

```
npx prisma migrate dev --name init
npx prisma generate
```

## Prisma Studio
```
npx prisma studio
```