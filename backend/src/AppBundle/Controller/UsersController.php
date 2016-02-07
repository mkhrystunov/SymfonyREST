<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{
    /**
     * @return array
     * @View()
     */
    public function getUsersAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:User')->findAll();
    }

    /**
     * @param User $user
     * @return User
     * @View()
     * @ParamConverter("user", class="AppBundle:User")
     */
    public function getUserAction(User $user)
    {
        return $user;
    }
}
