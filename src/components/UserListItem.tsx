import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'; // Use Card for consistent item styling
import { UserPlus, UserCheck, MessageSquare } from 'lucide-react'; // Example icons

interface UserListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  mutualFriendsCount?: number; // Optional info
  isFriend?: boolean; // To determine button state
  onAddFriend?: (userId: string) => void;
  onRemoveFriend?: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  onSendMessage?: (userId: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  id,
  name,
  avatarUrl,
  mutualFriendsCount,
  isFriend,
  onAddFriend,
  onRemoveFriend,
  onViewProfile,
  onSendMessage,
}) => {
  console.log("Rendering UserListItem for:", name);

  return (
    <Card className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => onViewProfile(id)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          {mutualFriendsCount !== undefined && mutualFriendsCount > 0 && (
            <p className="text-xs text-gray-500">{mutualFriendsCount} mutual friends</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        {onSendMessage && (
          <Button variant="ghost" size="icon" onClick={() => onSendMessage(id)} aria-label="Send message">
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
        {isFriend ? (
          onRemoveFriend && (
            <Button variant="outline" size="sm" onClick={() => onRemoveFriend(id)}>
              <UserCheck className="mr-2 h-4 w-4" /> Friends
            </Button>
          )
        ) : (
          onAddFriend && (
            <Button variant="default" size="sm" onClick={() => onAddFriend(id)}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Friend
            </Button>
          )
        )}
      </div>
    </Card>
  );
};

export default UserListItem;