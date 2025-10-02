<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Comment;
use App\Models\Response;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommunitySeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $farmers = User::where('user_type', 'farmer')->get();

        $posts = [
            [
                'title' => 'Best Practices for Boro Rice Cultivation',
                'content' => 'I have been growing BRRI Dhan28 for 5 years. Here are some tips: 1) Use quality seeds 2) Maintain proper water level 3) Apply fertilizer at right time. What are your experiences?',
                'category' => 'farming_tips',
                'status' => 'published',
                'likes_count' => 15,
                'comments_count' => 8,
            ],
            [
                'title' => 'Organic Farming Success Story',
                'content' => 'Switched to organic farming 2 years ago. Initially challenging but now getting 25% premium prices. Chemical-free vegetables are in high demand. Anyone interested in joining organic farmer group?',
                'category' => 'success_stories',
                'status' => 'published',
                'likes_count' => 23,
                'comments_count' => 12,
            ],
            [
                'title' => 'Weather Alert: Heavy Rain Expected',
                'content' => 'Meteorology department forecasted heavy rainfall for next 3 days in Rajshahi region. Please take necessary precautions for your crops. Cover tomato plants and ensure proper drainage.',
                'category' => 'weather_updates',
                'status' => 'published',
                'likes_count' => 8,
                'comments_count' => 5,
            ],
            [
                'title' => 'Mango Export Opportunity',
                'content' => 'Got contact with international buyer looking for premium Himsagar mangoes. They need 10 tons per week during season. Interested farmers from Chapai Nawabganj please contact me.',
                'category' => 'market_opportunities',
                'status' => 'published',
                'likes_count' => 31,
                'comments_count' => 18,
            ],
        ];

        foreach ($posts as $index => $postData) {
            if ($farmers->count() > $index) {
                $post = Post::firstOrCreate(
                    [
                        'user_id' => $farmers[$index]->id,
                        'title' => $postData['title']
                    ],
                    array_merge($postData, [
                        'user_id' => $farmers[$index]->id,
                    ])
                );

                // Create comments for each post
                $this->createCommentsForPost($post, $users);
            }
        }
    }

    private function createCommentsForPost($post, $users)
    {
        $comments = [
            [
                'content' => 'Very helpful tips! I will try these methods in next season.',
                'likes_count' => 3,
            ],
            [
                'content' => 'Great advice. What about pest management? Any organic solutions?',
                'likes_count' => 5,
            ],
            [
                'content' => 'Thanks for sharing. My yield increased 20% using similar techniques.',
                'likes_count' => 7,
            ],
        ];

        foreach ($comments as $index => $commentData) {
            if ($users->count() > $index) {
                $comment = Comment::create(array_merge($commentData, [
                    'post_id' => $post->id,
                    'user_id' => $users[$index]->id,
                ]));

                // Create response to first comment
                if ($index === 0) {
                    Response::create([
                        'comment_id' => $comment->id,
                        'user_id' => $post->user_id,
                        'content' => 'Glad it helped! Feel free to ask any questions.',
                        'likes_count' => 2,
                    ]);
                }
            }
        }
    }
}
