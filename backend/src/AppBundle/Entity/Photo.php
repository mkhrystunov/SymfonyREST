<?php

namespace AppBundle\Entity;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="photos")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class Photo
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var UploadedFile
     *
     * @Assert\Image()
     */
    private $file;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $fileName;

    /**
     * @var string[]
     *
     * @ORM\Column(type="array")
     */
    private $tags;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return UploadedFile
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param UploadedFile|null $file
     * @return $this
     */
    public function setFile(UploadedFile $file = null)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * @return string
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * @param string $fileName
     * @return $this
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;

        return $this;
    }

    /**
     * @return string[]
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * @param string[] $tags
     * @return $this
     */
    public function setTags(array$tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getWebPath()
    {
        return null === $this->fileName ? null : $this->getUploadDir() . '/' . $this->fileName;
    }

    /**
     * @return string
     */
    protected function getUploadDir()
    {
        return 'uploads/photos';
    }

    /**
     * @return null|string
     */
    public function getAbsolutePath()
    {
        return null === $this->fileName ? null : $this->getUploadRootDir() . '/' . $this->fileName;
    }

    /**
     * @return string
     */
    protected function getUploadRootDir()
    {
        return __DIR__ . '/../../../web/' . $this->getUploadDir();
    }

    /**
     * @ORM\PostRemove()
     */
    public function removeFile()
    {
        $file = $this->getAbsolutePath();
        if ($file) {
            unlink($file);
        }
    }
}
