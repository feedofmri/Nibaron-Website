import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock } from 'lucide-react';
import './CommunityFeed.css';

const CommunityFeed = () => {
  // Mock data for community feed posts
  const posts = [
    {
      id: 1,
      author: 'Abdul Rahman',
      avatar: 'https://picsum.photos/40/40?random=1',
      time: '2 hours ago',
      content: 'Just harvested premium Boro rice! Quality is exceptional this season. Available for bulk orders.',
      image: 'https://picsum.photos/300/200?random=11',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: 'Fatema Khatun',
      time: '4 hours ago',
      content: 'Weather predictions are looking great for next week\'s planting. Thanks to Nibaron\'s AI forecast!',
      avatar: 'https://picsum.photos/40/40?random=2',
      likes: 18,
      comments: 5,
      shares: 2
    },
    {
      id: 3,
      author: 'Mizanur Rahman',
      time: '6 hours ago',
      content: 'Organic potato harvest complete! 95% quality grade achieved. Ready for export orders.',
      avatar: 'https://picsum.photos/40/40?random=3',
      image: 'https://picsum.photos/300/200?random=13',
      likes: 32,
      comments: 12,
      shares: 8
    },
    {
      id: 4,
      author: 'Nasir Ahmed',
      time: '8 hours ago',
      content: 'Market prices for wheat are trending up. Good time to sell your stock!',
      avatar: 'https://picsum.photos/40/40?random=4',
      likes: 15,
      comments: 4,
      shares: 6
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleLike = (postId) => {
    // Handle like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = (postId) => {
    // Handle comment functionality
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId) => {
    // Handle share functionality
    console.log('Share post:', postId);
  };

  return (
    <div className="community-feed">
      <div className="section-header">
        <h2 className="section-title">Community Feed</h2>
        <button className="create-post-btn">
          Create Post
        </button>
      </div>

      <div className="posts-container">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className={`post-item ${post.isExpert ? 'expert-post' : ''} ${post.hasOffer ? 'offer-post' : ''}`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="post-header">
              <div className="author-info">
                <div className="author-avatar">
                  <img src={post.avatar} alt={post.author} />
                  {post.isExpert && <div className="expert-badge">✓</div>}
                </div>
                <div className="author-details">
                  <h4 className="author-name">{post.author}</h4>
                  <div className="author-meta">
                    <span className="author-role">{post.role}</span>
                    <span className="post-timestamp">
                      <Clock size={12} />
                      {post.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <button className="post-menu">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="post-content">
              <p className="post-text">{post.content}</p>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post content" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/300x200?text=Image+not+available'; }} />
                </div>
              )}
            </div>

            <div className="post-stats">
              <span className="stat-item">
                {post.likes} likes
              </span>
              <span className="stat-item">
                {post.comments} comments
              </span>
              <span className="stat-item">
                {post.shares} shares
              </span>
            </div>

            <div className="post-actions">
              <button
                className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={18} />
                <span>Like</span>
              </button>
              <button
                className="action-btn"
                onClick={() => handleComment(post.id)}
              >
                <MessageCircle size={18} />
                <span>Comment</span>
              </button>
              <button
                className="action-btn"
                onClick={() => handleShare(post.id)}
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="feed-footer">
        <button className="load-more-btn">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default CommunityFeed;
