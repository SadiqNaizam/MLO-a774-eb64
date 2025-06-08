import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, MoreHorizontal } from 'lucide-react'; // Icons for interactions

interface PostAuthor {
  name: string;
  avatarUrl?: string;
  profileUrl?: string; // Link to user's profile
}

interface PostCardProps {
  id: string;
  author: PostAuthor;
  content: string;
  imageUrl?: string;
  timestamp: string; // Or Date object, formatted as string
  likesCount: number;
  commentsCount: number;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onViewAuthorProfile?: (author: PostAuthor) => void; // Optional action
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  imageUrl,
  timestamp,
  likesCount,
  commentsCount,
  onLike,
  onComment,
  onViewAuthorProfile,
}) => {
  console.log("Rendering PostCard:", id, "by", author.name);

  const handleAuthorClick = () => {
    if (onViewAuthorProfile) {
      onViewAuthorProfile(author);
    } else if (author.profileUrl) {
      // Basic navigation if URL provided and no specific handler
      window.location.href = author.profileUrl;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-4">
      <CardHeader className="flex flex-row justify-between items-start p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 cursor-pointer" onClick={handleAuthorClick}>
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p
              className="font-semibold text-sm cursor-pointer hover:underline"
              onClick={handleAuthorClick}
            >
              {author.name}
            </p>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        {imageUrl && (
          <div className="rounded-md overflow-hidden border">
            <img src={imageUrl} alt="Post image" className="w-full object-cover max-h-96" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t">
        <Button variant="ghost" size="sm" onClick={() => onLike(id)}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          {likesCount > 0 ? `${likesCount} Likes` : 'Like'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onComment(id)}>
          <MessageCircle className="mr-2 h-4 w-4" />
          {commentsCount > 0 ? `${commentsCount} Comments` : 'Comment'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;