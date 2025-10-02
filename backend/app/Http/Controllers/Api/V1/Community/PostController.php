<?php

namespace App\Http\Controllers\Api\V1\Community;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Post::with(['user', 'comments']);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $posts = $query->latest()->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $posts
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'images' => 'array|max:5',
            'images.*' => 'image|max:2048'
        ]);

        $post = Post::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            'images' => $request->images ?? [],
            'status' => 'published'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'data' => $post->load('user')
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $post = Post::with(['user', 'comments.user'])->find($id);

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $post
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $post = Post::where('user_id', $request->user()->id)->find($id);

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found or unauthorized'
            ], 404);
        }

        $post->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $post = Post::where('user_id', $request->user()->id)->find($id);

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found or unauthorized'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully'
        ]);
    }
}
