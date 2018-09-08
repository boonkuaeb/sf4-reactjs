Symfony4 and React JS from scratch
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
        App\Entity\User: bcrypt
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

Update CSS for template
```$xslt
twig:
    ...
    form_themes: ['bootstrap_4_layout.html.twig']
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
## Install FOSJsRoutingBundle



##Setup Webpack
```$xslt
composer require webpack-encore
yarn install
```

Update `webpack.config.js` as below
```
// webpack.config.js
var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore

// the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    // will create public/build/app.js and public/build/app.css
    .createSharedEntry('layout', './assets/js/layout.js')

    .enableBuildNotifications()

    .autoProvidejQuery()

    .addPlugin(new CopyWebpackPlugin([
        { from: './assets/static', to: 'static' }
    ]))

    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())

    .cleanupOutputBeforeBuild()
    .enableVersioning()

;

// export the final configuration
module.exports = Encore.getWebpackConfig();
```

Update `package.json` as below
```$xslt
{
    "devDependencies": {
        "@symfony/webpack-encore": "^0.20.1",
        "bootstrap": "3",
        "copy-webpack-plugin": "^4.5.2",
        "font-awesome": "4",
        "jquery": "^3.3.1",
        "node-sass": "^4.9.3",
        "sass-loader": "^7.1.0",
        "sweetalert2": "^7.26.14",
        "webpack-notifier": "^1.6.0"
    },
    "scripts": {
        "dev-server": "encore dev-server",
        "dev": "encore dev",
        "watch": "encore dev --watch",
        "build": "encore production"
    }
}

```
Run Update Again
```$xslt
yarn install
yarn watch
```

Open browser
```$xslt
http://127.0.0.1:8000
```


## Update version file in symfony project 
```

framework:
    assets:
        json_manifest_path: '%kernel.project_dir%/public/build/manifest.json'

```

## Customize Login

Create new file `templates/bundles/FOSUserBundle/layout.html.twig`
```
{% extends 'base.html.twig' %}

{% block body %}
    <div class="row">
        <div class="col-md-12">
            {% block fos_user_content %}{% endblock %}
        </div>
    </div>
{% endblock %}

```

Create login page file `templates/bundles/FOSUserBundle/Security/login.html.twig`
```
{% extends '@FOSUser/layout.html.twig' %}

{% trans_default_domain 'FOSUserBundle' %}

{% block stylesheets %}
    {{ parent() }}

    <link rel="stylesheet" href="{{ asset('build/login.css') }}" />
{% endblock %}

{% block javascripts %}
    {{ parent() }}

    <script src="{{ asset('build/login.js') }}"></script>
{% endblock %}

{% block fos_user_content %}
    <div class="container">
        <div class="wrapper">
            <form action="{{ path("fos_user_security_check") }}" method="post" class="form-signin">
                <h3><img class="dumbbell" src="{{ asset('build/static/dumbbell.png') }}">Login! Start Lifting!</h3>
                <div class="js-recommended-login">
                    <a href="#" class="js-show-login">Don't know the login?</a>
                    <div class="js-recommended-login-details" style="display: none;">
                        Sir or madam, might I recommend that you try the following login details:
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>Username</th>
                                    <td>cindy_clawford</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>pumpup</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr class="colorgraph" />

                <br/>

                {% if error %}
                    <div class="alert alert-block alert-danger">{{ error.messageKey|trans }}</div>
                {% endif %}

                <input type="text"
                       class="form-control js-login-field-username"
                       name="_username"
                       value="{{ last_username }}"
                       required="required"
                       placeholder="{{ 'security.login.username'|trans }}"
                />
                <input type="password"
                       class="form-control"
                       name="_password"
                       required="required"
                       placeholder="{{ 'security.login.password'|trans }}"
                />

                <input type="checkbox" name="_remember_me" checked style="display: none;" />

                <input type="hidden" name="_csrf_token" value="{{ csrf_token }}" />
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    Login
                </button>
            </form>
        </div>
    </div>
{% endblock fos_user_content %}
```



Create `/sf4-reactjs/assets/js/login.js`
```
'use strict';

import $ from 'jquery';
import '../css/login.css';

$(document).ready(function() {
    $('.js-recommended-login').on('click', '.js-show-login', function(e) {
        e.preventDefault();

        $('.js-recommended-login-details').toggle();
    });

    $('.js-login-field-username').on('keydown', function(e) {
        const $usernameInput = $(e.currentTarget);
        // remove any existing warnings
        $('.login-long-username-warning').remove();

        if ($usernameInput.val().length >= 20) {
            const $warning = $('<div class="login-long-username-warning">This is a really long username - are you sure that is right?</div>');
            $usernameInput.before($warning);
        }
    });
});

```

Update `webpack.config.js`
```$xslt

Encore
...
    .createSharedEntry('layout', './assets/js/layout.js')
    .addEntry('login', './assets/js/login.js')

```

Run `yarn watch` again.
