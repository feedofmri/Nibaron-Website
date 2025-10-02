import React, { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Share2, Edit2, Trash2, Send, Image, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { communityService } from '../../services/featureServices';
import { useAuth } from '../../context/AuthContext';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('');

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch posts if user is authenticated and auth is not loading
    if (!authLoading) {
      if (isAuthenticated) {
        fetchPosts();
      } else {
        // Redirect to login if not authenticated
        navigate('/login');
      }
    }
  }, [filterType, isAuthenticated, authLoading, navigate]);

  const fetchPosts = async () => {
    // Don't fetch if not authenticated
    if (!isAuthenticated) {
      return;
    }

    try {
      setLoading(true);
      const params = {};
      if (filterType) params.type = filterType;

      const response = await communityService.getPosts(params);
      setPosts(response.data.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please log in to view community posts');
        navigate('/login');
      } else {
        toast.error('Failed to load community posts');
      }
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setShowCreateModal(true);
  };

  const handlePostCreated = () => {
    setShowCreateModal(false);
    fetchPosts();
    toast.success('Post created successfully!');
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await communityService.deletePost(postId);
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please log in to delete posts');
        navigate('/login');
      } else {
        toast.error('Failed to delete post');
      }
    }
  };

  // Show loading if auth is still loading
  if (authLoading) {
    return (
      <div className="community">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="community">
      <div className="community-header">
        <div className="header-content">
          <h1>Community</h1>
          <p>Connect with farmers and buyers in your network</p>
        </div>
        <button className="btn-primary" onClick={handleCreatePost}>
          <Plus size={18} />
          Create Post
        </button>
      </div>

      {/* Filters */}
      <div className="community-filters">
        <div className="filter-group">
          <Filter size={18} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Posts</option>
            <option value="question">Questions</option>
            <option value="tip">Tips & Advice</option>
            <option value="showcase">Showcase</option>
            <option value="discussion">Discussion</option>
          </select>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="community-feed">
        {loading ? (
          <div className="loading-posts">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="post-skeleton" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => handleDeletePost(post.id)}
            />
          ))
        ) : (
          <div className="no-posts">
            <MessageCircle size={48} />
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community!</p>
            <button className="btn-primary" onClick={handleCreatePost}>
              Create First Post
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handlePostCreated}
        />
      )}
    </div>
  );
};

const PostCard = ({ post, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    // Here you would make an API call to like/unlike the post
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Here you would make an API call to add the comment
    toast.success('Comment added!');
    setNewComment('');
    setShowComments(true);
  };

  const getPostTypeColor = (type) => {
    const colors = {
      question: '#3b82f6',
      tip: '#10b981',
      showcase: '#f59e0b',
      discussion: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="author-info">
          <div className="avatar">
            {post.author?.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} />
            ) : (
              <div className="avatar-placeholder">
                {post.author?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div className="author-details">
            <h4>{post.author?.name || 'Anonymous User'}</h4>
            <p>{post.author?.user_type || 'Member'} • {new Date(post.created_at || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="post-actions">
          {post.type && (
            <span
              className="post-type"
              style={{ backgroundColor: getPostTypeColor(post.type) }}
            >
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </span>
          )}
          <button className="btn-icon">
            <Edit2 size={16} />
          </button>
          <button className="btn-icon danger" onClick={onDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="post-content">
        <h3>{post.title || 'Untitled Post'}</h3>
        <p>{post.content || 'No content available'}</p>

        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-footer">
        <div className="post-stats">
          <button
            className={`stat-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            <span>{likesCount}</span>
          </button>

          <button
            className="stat-button"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle size={16} />
            <span>{post.comments_count || 0}</span>
          </button>

          <button className="stat-button">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button type="submit" className="btn-icon">
              <Send size={16} />
            </button>
          </form>

          <div className="comments-list">
            {(post.comments || []).map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-avatar">
                  {comment.author?.name?.charAt(0) || 'U'}
                </div>
                <div className="comment-content">
                  <h5>{comment.author?.name || 'Anonymous'}</h5>
                  <p>{comment.content}</p>
                  <span className="comment-time">
                    {new Date(comment.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CreatePostModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'discussion',
    tags: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      await communityService.createPost(postData);
      onSuccess();
    } catch (error) {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label>Post Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="form-select"
            >
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="tip">Tip & Advice</option>
              <option value="showcase">Showcase</option>
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's on your mind?"
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts, ask questions, or give advice..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="farming, organic, tips, vegetables"
            />
          </div>

          <div className="form-group">
            <label>Image (Optional)</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="post-image"
              />
              <label htmlFor="post-image" className="file-label">
                <Image size={20} />
                Choose Image
              </label>
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Community;
