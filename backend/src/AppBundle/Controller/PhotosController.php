<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Photo;
use AppBundle\Form\PhotoType;
use FOS\RestBundle\Controller\Annotations\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PhotosController extends Controller
{
    /**
     * @return array
     * @View
     */
    public function getPhotosAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Photo')->findAll();
    }

    /**
     * @param Photo $photo
     * @return Photo
     * @View()
     * @ParamConverter("photo", class="AppBundle:Photo")
     */
    public function getPhotoAction(Photo $photo)
    {
        return $photo;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function postPhotosAction(Request $request)
    {
        $photo = new Photo();
        $form = $this->createForm(new PhotoType(), $photo);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $file = $photo->getFile();

            $fileName = sprintf('%s.%s', md5(uniqid()), $file->guessExtension());

            $photosDir = $this->container->getParameter('kernel.root_dir') . '/../web/uploads/photos';
            $file->move($photosDir, $fileName);

            $photo->setFileName($fileName);

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($photo);
            $manager->flush();

            return new JsonResponse(null, Response::HTTP_CREATED);
        }
        return new JsonResponse((string)$form->getErrors(), Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Photo $photo
     *
     * @param Request $request
     * @ParamConverter("photo", class="AppBundle:Photo")
     * @return JsonResponse|Photo
     * @View
     */
    public function putPhotosAction(Photo $photo, Request $request)
    {
        $form = $this->createForm(new PhotoType(), $photo, [
            'method' => 'PUT',
        ]);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($photo);
            $manager->flush();
            return $photo;
        }
        return new JsonResponse((string)$form->getErrors(), Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param Photo $photo
     *
     * @ParamConverter("photo", class="AppBundle:Photo")
     * @return JsonResponse
     */
    public function deletePhotosAction(Photo $photo)
    {
        try {
            $manager = $this->getDoctrine()->getManager();
            $manager->remove($photo);
            $manager->flush();
            return new JsonResponse('success', Response::HTTP_NO_CONTENT);
        } catch (\Exception $ignored) {
            return new JsonResponse('failed', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
