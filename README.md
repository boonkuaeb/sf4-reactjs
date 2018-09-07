Symfony4 and React JS
=================================

To get it working, follow these steps:

##Setup Project


Set up symfony project

````
 composer create-project symfony/website-skeleton sf4-reactjs
 
````


Create sf4-reactjs/src/Entity/User.php


**Setup the Database**

Open `.env` and make sure the `DATABASE_URL` setting is
correct for your system.
```
...
DATABASE_URL=mysql://root:mysecret@127.0.0.1:6667/sf4_reactjs_db
...
```

Then, create the database and the schema!

```
php bin/console doctrine:database:create
```


##Install FosUserBundle
```
composer require friendsofsymfony/user-bundle  
```

Update sf4-reactjs/config/packages/framework.yaml 
```
framework:
...    
    # just here until FOSUserBundle fully removes their templating dependency
    templating:
        engines: [twig]
```

Create User Entity file
```
<?php
namespace AppBundle\Entity;
use FOS\UserBundle\Model\User as BaseUser;
class User extends BaseUser
{
}
```

Create sf4-reactjs/config/packages/fos_user.yaml
```
fos_user:
  db_driver: orm
  firewall_name: main
  user_class: App\Entity\User
  registration:
    form:
      type: App\Form\Type\RegistrationType
  from_email:
    address: 'bk@mail.com'
    sender_name: BK

```

Generate the migration for our User class:
```
php bin/console doctrine:migrations:diff
```

```
php bin/console doctrine:migrations:migrate
```

**Security**

config/packages/security.yaml
```
security:
    encoders:
        AppBundle\Entity\User: bcrypt
```

```
security:
    # http://symfony.com/doc/current/book/security.html#where-do-users-come-from-user-providers
    providers:
        fos_userbundle:
            id: fos_user.user_provider.username
```
**Importing the Routing**

Find your config/routes.yaml file and paste that on top.
```
fos_user:
    resource: '@FOSUserBundle/Resources/config/routing/all.xml'
```


##Security Setup
**Configuring Logout**

config/packages/security.yaml
```
security:
    ...
    firewalls:
        ...
        main:
            ...
            logout: ~
```

**Configuring form_login Security**
config/packages/security.yaml
```

security:

    firewalls:
        ...
        main:
            ...
            form_login:
                csrf_token_generator: security.csrf.token_manager
```

**Adding Remember Me Functionality**
config/packages/security.yaml
```
security:

    firewalls:

        main:

            remember_me:
                secret: '%kernel.secret%'

```

Clear Cache
```$xslt
php bin/console cache:clear
```
Run Server
```$xslt
php bin/console server:run 
```

Test Login
```$xslt
http://127.0.0.1:8000/login
```



