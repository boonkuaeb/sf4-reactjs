Symfony 4 and ReactJS
=================================

This repository holds the code for Symfony 4 and ReactJS.

## Setup

To get it working, follow these steps:

**Download Composer dependencies**

Make sure you have [Composer installed](https://getcomposer.org/download/)
and then run:

```
composer install
```

You may alternatively need to run `php composer.phar install`, depending
on how you installed Composer.

**Setup the Database**

Open your terminal, go to the source code directory and run `mv` command to create `.env` file.
```$xslt
mv .env.dist .env
``` 

Open `.env` Also, make sure the `DATABASE_URL` setting is
correct for your system. For example, on my laptop, I updated the `.env` file like this.
```$xslt
DATABASE_URL=mysql://root:mysecret@127.0.0.1:6667/sf4_reactjs_db
```

Then, create the database and the schema!

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

If you get an error that the database exists, that should
be ok. But if you have problems, completely drop the
database (`doctrine:database:drop --force`) and try again.

**Build your Assets**

To build your assets, install the dependencies with yarn and then
run encore:

```
yarn install
yarn run encore dev --watch
```

**Start the built-in web server**

You can use Nginx or Apache, but the built-in web server works
great:

```
php bin/console server:run
```

Now check out the site at `http://localhost:8000`.
and try log in with 
```$xslt
username:admin@mail.com
password:123456
```

**For convenience**

If you are using PhpStorm you may install and enable
the [Symfony Plugin](https://plugins.jetbrains.com/idea/plugin/7219-symfony-plugin)
via the preferences which provides more auto-completion for Symfony projects.  

**Special Thanks**

I very thank  Yomi for this [Build a real-time PWA with React - Medium Post](https://medium.com/front-end-hacking/build-a-realtime-pwa-with-react-99e7b0fd3270).
That guided me to create this repository.
