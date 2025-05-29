import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaRegComment,
  FaUser,
  FaBoxOpen,
  FaRegCalendar,
} from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

interface Comment {
  _id: string;
  comment: string;
  rating: number;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  product: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const AdminComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    setDeleting(commentId);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaRegComment className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Manage Comments</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {comments.length}
        </span>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-12">
          <FaRegComment className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No comments found
          </h3>
          <p className="text-gray-500">
            There are no comments to display at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaUser className="h-4 w-4" />
                      <span className="font-medium">
                        {comment.user.username}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{comment.user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaBoxOpen className="h-4 w-4" />
                      <span>{comment.product.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(comment.rating)}
                    <span className="text-sm text-gray-600">
                      {comment.rating}/5
                    </span>
                  </div>

                  <p className="text-gray-800 mb-3 leading-relaxed">
                    {comment.comment}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaRegCalendar className="h-4 w-4" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  disabled={deleting === comment._id}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete comment"
                >
                  {deleting === comment._id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <FaTrash className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComments;
