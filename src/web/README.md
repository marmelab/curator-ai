# Curator AI - Landing Web Page

[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

Landing Page of the project. It provide some explaination of it and it's functionment. Allows peoples to register an unregister from the DataBase.

## Requirements

-   Node.js >= 18
-   A [SupaBase](https://supabase.com/) url and key

## Start the Server

For the first time :
```sh
# Install the packages
npm install
```
Don't forget to add in your `.env` the environemment variables from Supabase (Connect -> App Framework) and do the following changes :
 - change `NEXT_PUBLIC_SUPABASE_URL=<your_url>` to `SUPABASE_URL=<your_url>`
 - change `NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key>` to `SUPABASE_ANON_KEY=<your_key>`

Start the server :
```sh
npx ts-node src/web/server.ts
```

This should start the server at http://localhost:3000.
Here, you can navigate the home page, and the registration page. Try to subscribe !
You can open your subabase to see that you are registred !
If you try it twice, you will not be added twice though.

## Unsubscription

Once the server is running, you can go on the unsubsciption page by one of the following links : 
 - `http://localhost:3000/en/signOut.html` (english)
 - `http://localhost:3000/fr/signOut.html` (french)

Try to unsubscribe youself !
You can open your subabase to see that you are no longer registred !
If you were not registred yourself before, you will be notified.