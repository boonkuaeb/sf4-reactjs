<?php

namespace App\Controller;

use App\Entity\RepLog;
use App\Entity\User;
use App\Form\Type\RepLogType;
use App\Repository\RepLogRepository;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LiftController extends BaseController
{
    /**
     * @Route("/lift", name="lift")
     */
    public function indexAction(Request $request, RepLogRepository $replogRepo, UserRepository $userRepo)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        return $this->render('lift/index.html.twig', array(
            'leaderboard' => $this->getLeaders($replogRepo, $userRepo),
        ));
    }

    /**
     * Returns an array of leader information
     *
     * @return array
     */
    private function getLeaders(RepLogRepository $replogRepo, UserRepository $userRepo)
    {
        $leaderboard = $this->getLeadersCache($replogRepo, $userRepo);

        return $leaderboard;
    }


    /**
     * @return object|\Predis\Client
     */
    private function getRedisClient()
    {
        return $this->get('snc_redis.default');
    }

    /**
     * @param RepLogRepository $replogRepo
     * @param UserRepository $userRepo
     * @return array
     */
    private function getLeadersCache(RepLogRepository $replogRepo, UserRepository $userRepo): array
    {

        $key = 'getleaderscache_21111';
        if (!$this->getRedisClient()->exists($key)) {
            $leaderboard = $this->getLeadersDB($replogRepo, $userRepo);

            $this->getRedisClient()->set($key,serialize($leaderboard));
            $this->getRedisClient()->expire($key,20);
        }
        $leaderboard = unserialize($this->getRedisClient()->get($key));

        return $leaderboard;
    }

    /**
     * @param RepLogRepository $replogRepo
     * @param UserRepository $userRepo
     * @return array
     */
    private function getLeadersDB(RepLogRepository $replogRepo, UserRepository $userRepo): array
    {
        $leaderboardDetails = $replogRepo->getLeaderboardDetails();

        $leaderboard = array();
        foreach ($leaderboardDetails as $details) {
            if (!$user = $userRepo->find($details['user_id'])) {
                // interesting, this user is missing...
                continue;
            }

            $leaderboard[] = array(
                'username' => $user->getUsername(),
                'weight' => $details['weightSum'],
                'in_cats' => number_format($details['weightSum'] / RepLog::WEIGHT_FAT_CAT),
            );
        }
        return $leaderboard;
    }
}
