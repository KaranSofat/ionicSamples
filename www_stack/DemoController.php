<?php

namespace Acme\DemoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Acme\DemoBundle\Form\ContactType;
use Happyr\LinkedIn\LinkedIn;
// these import the "@Route" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Acme\DemoBundle\Entity\Users;
use Acme\DemoBundle\Entity\Questions;
use Acme\DemoBundle\Entity\Answer;
use RMS\PushNotificationsBundle\Message\AndroidMessage;
class DemoController extends Controller
{
    /**
     * @Route("/", name="_demo")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @Route("/hello/{name}", name="_demo_hello")
     * @Template()
     */
    public function helloAction($name)
    {
        return array('name' => $name);
    }

    /**
     * @Route("/contact", name="_demo_contact")
     * @Template()
     */
    public function contactAction()
    {
        $form = $this->get('form.factory')->create(new ContactType());

        $request = $this->get('request');
        if ($request->isMethod('POST')) {
            $form->submit($request);
            if ($form->isValid()) {
                $mailer = $this->get('mailer');
                // .. setup a message and send it
                // http://symfony.com/doc/current/cookbook/email.html

                $this->get('session')->getFlashBag()->set('notice', 'Message sent!');

                return new RedirectResponse($this->generateUrl('_demo'));
            }
        }

        return array('form' => $form->createView());
    }
    
     public function linkAction()
    {
           $this
            ->get('ovh')
            ->post(
                sprintf('/sms/%s/users/%s/jobs', 'my-service-name', 'my-login'),
                [
                    'message' => 'Si tu veux me parler, envoie-moi un... fax !',
                    'receivers' => '+33612345678',
                    'sender' => 'my-login',
                ]
            )
        ;

      
    

   
   
    }
         public function loginAction()
         {
         
         
        // $email='a';
        // $password = 'a';
        $email =  $_REQUEST['email'];
         $password = $_REQUEST['password'];
         $em = $this->getDoctrine()->getEntityManager();
        	$repository = $em->getRepository('AcmeDemoBundle:Users');
         $user = $repository->findOneBy(array('email' => $email, 'password' => $password));
         
         //echo"<pre>";print_r($user);die;
         
         if($user)
         {
            $response = new Response(json_encode(array('data' =>'Sucess','detail'=>$user)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         }
         else
         {
            $response = new Response(json_encode(array('data' =>'Faliure')));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         }
    
         }
         
         public function registerAction(Request $request)
         {
           $em = $this->getDoctrine()->getEntityManager();
         
            $fname = $_REQUEST['fname'];
            $lname = $_REQUEST['lname'];                
            $email =  $_REQUEST['email'];
           $password = $_REQUEST['password'];
          // $image = $_POST['image'];
           $put = $this->getRequest()->getContent();
        
         $obj = json_decode($put);
         
         $image = $obj->userImage;
         
           
           
           $register = new Users();
          if($request->getMethod() == 'POST') 
		    	{
                     
            $register->setFirstName($fname);
				    $register->setLastName($lname);
				    $register->setEmail($email);
				    $register->setPassword($password);
				    $register->setImage($image);
				    
				    
				    $em->persist($register);
				    $em->flush();
             $response = new Response(json_encode(array('data' =>'registered')));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         } 
         $response = new Response(json_encode(array('data' =>'failed')));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         }
    
           public function getQuestionsAction(Request $request)
           {
           
             $em = $this->getDoctrine()->getEntityManager();
             	$questions = $em->createQueryBuilder()
              ->select('questions')
         	->from('AcmeDemoBundle:Questions',  'questions')
	     // ->where('SearchHistory.last_updated like :last_updated')
	      //->setParameter('last_updated',$currentYear.'-%')   

	 
	          ->getQuery()
            	->getResult();
           
            $response = new Response(json_encode(array('data' =>$questions)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
           }
            public function createQuestionsAction(Request $request)
           {
               $em = $this->getDoctrine()->getEntityManager();
             
                $uId = $_REQUEST['id'];
                $title = $_REQUEST['title'];                
                $question =  $_REQUEST['question'];
               
          
           
           
               
          if($request->getMethod() == 'POST') 
		    	{
          $register = new Questions();
            $register->setUserId($uId);
				    $register->setQuestion($question);
				    $register->setTitle($title);
				   
				    $em->persist($register);
				    $em->flush();
				    
				    $qId = $register->getId();
             $response = new Response(json_encode(array('data' =>$qId)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         } 
         $response = new Response(json_encode(array('data' =>'questionFailed')));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         }
    
            public function viewQuestionsAction(Request $request)
           {
           
              $id = $_REQUEST['id'];
           
               $em = $this->getDoctrine()->getEntityManager();
             	$questions = $em->createQueryBuilder()
              ->select('questions.title,questions.question,questions.creation_datetime,user.first_name,questions.id')
             	->from('AcmeDemoBundle:Questions',  'questions')
	            ->leftJoin('AcmeDemoBundle:Users', 'user', "WITH", "user.id=questions.user_id")
	           ->where('questions.id= :qId')
	           ->setParameter('qId',$id)   
	    
	            ->getQuery()
            	->getResult();
           
               
           $response = new Response(json_encode(array('data' =>$questions)));
              $response->headers->set('Access-Control-Allow-Origin', '*');
              $response->headers->set('Content-Type', 'application/json');
              return $response; 
           }

            public function answerAction(Request $request)
           {
             $em = $this->getDoctrine()->getEntityManager();
             $questionId = $_REQUEST['id'];
             $userId = $_REQUEST['userId'];
             $answer = $_REQUEST['answer'];
             
           
           
            $register = new Answer();
            $register->setUserId($userId);
				    $register->setQuestionId($questionId);
				    $register->setAnswer($answer);
				   
				    $em->persist($register);
				    $em->flush();
				    $answers = $em->createQueryBuilder()
              ->select('answer.answer,user.first_name,answer.creation_datetime')
             	->from('AcmeDemoBundle:Answer',  'answer')
	            ->leftJoin('AcmeDemoBundle:Users', 'user', "WITH", "user.id=answer.user_id")
	              ->leftJoin('AcmeDemoBundle:Questions', 'question', "WITH", "question.id=answer.question_id")
	           ->where('answer.question_id= :qId')
	             ->setParameter('qId',$questionId)   
	        ->andwhere('answer.user_id= :uId')
	           ->setParameter('uId',$userId)   
	    
	            ->getQuery()
            	->getResult();
				    
				    
             $response = new Response(json_encode(array('answer' =>$answers)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
           
            }           
           
             public function answerDetailAction(Request $request)
           {

                $em = $this->getDoctrine()->getEntityManager();
             $questionId = $_REQUEST['id'];
             $userId = $_REQUEST['userId'];
             
             
             
             //$answer = $_REQUEST['answer'];

              		    $answers = $em->createQueryBuilder()
              ->select('answer.answer,user.first_name,answer.creation_datetime')
             	->from('AcmeDemoBundle:Answer',  'answer')
	            ->leftJoin('AcmeDemoBundle:Users', 'user', "WITH", "user.id=answer.user_id")
	              ->leftJoin('AcmeDemoBundle:Questions', 'question', "WITH", "question.id=answer.question_id")
	           ->where('answer.question_id= :qId')
	             ->setParameter('qId',$questionId)   
	        ->andwhere('answer.user_id= :uId')
	           ->setParameter('uId',$userId)   
	    
	            ->getQuery()
            	->getResult();
				    
				    
             $response = new Response(json_encode(array('answer' =>$answers)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
            }
            
             public function fbLoginAction(Request $request)
             {
           
               $email =  $_REQUEST['email'];
             $password = $_REQUEST['password'];
             $name  = $_REQUEST['name'];
             $em = $this->getDoctrine()->getEntityManager();
            	$repository = $em->getRepository('AcmeDemoBundle:Users');
             $user = $repository->findOneBy(array('email' => $email, 'password' => $password));
         
         //echo"<pre>";print_r($user);die;
         
         if($user)
         {
            $response = new Response(json_encode(array('data' =>'Sucess','detail'=>$user)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         }
         else
         {
         
              $register = new Users();
         
                     
            $register->setFirstName($name);
				    //$register->setLastName($lname);
				    $register->setEmail($email);
				    $register->setPassword($password);
				    //$register->setImage($image);
				    
				    
				    $em->persist($register);
				    $em->flush();
            $user = $repository->findOneBy(array('email' => $email, 'password' => $password));
            $response = new Response(json_encode(array('data' =>'Sucess','detail'=>$user)));
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
         
         }
           
           
             }
             public function pushAction()
             {
             
            $message = "the test message";
            $tickerText = "ticker text message";
            $contentTitle = "content title";
            $contentText = "content body";

           $registrationIDs = array();
            $registrationIDs[] = '3e8bb4ca-c3d0-44b7-9bc8-baa769e8caf7';
            $apiKey = "APA91bHg7QEO3h44OCrBAb6yoHEvNvVSrRRcJjufS5fduCw2YhC83BZ9eqlxYS9PbKIAoFrmK-rvNEQ-CxrAjy4Wy13CRt5or1h7kG9XDRg2Tcy4zx8EpGOYLybmgnLDmVVvTJF4PR9Y";

            $headers = array("Content-Type:" . "application/json", "Authorization:" . "key=" . $apiKey);

            $data = array(
                
                'registration_ids' => $registrationIDs
            );

            $ch = curl_init();

            curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
            curl_setopt( $ch, CURLOPT_URL, "https://android.googleapis.com/gcm/send" );
            curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0 );
            curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0 );
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
            curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data) );

            $response = curl_exec($ch);
            curl_close($ch);
echo "<pre>";print_r($response);die;
            return $response;
             
             }
             
            
            
}
