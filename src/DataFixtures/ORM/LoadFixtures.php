<?php

namespace App\DataFixtures\ORM;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Nelmio\Alice\Loader\NativeLoader;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class LoadFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        $user_admin = new User();
        $user_admin->setUsername('admin');
        $user_admin->setFirstName('admin');
        $user_admin->setLastName('admin');
        $user_admin->setEmail('admin@mail.com');
        $password = $this->encoder->encodePassword($user_admin, '123456');
        $user_admin->setPassword($password);
        $user_admin->setEnabled(true);
        $user_admin->setRoles(['ADMIN_ROLE']);
        $manager->persist($user_admin);
        $manager->flush();

        $user = new User();
        $user->setUsername('bk');
        $user->setFirstName('bk');
        $user->setLastName('bk');
        $user->setEmail('bk@mail.com');
        $password = $this->encoder->encodePassword($user, '123456');
        $user->setPassword($password);
        $user->setEnabled(true);
        $manager->persist($user);
        $manager->flush();



    }

}