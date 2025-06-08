import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // For background/layout
import { UserPlus, MessageSquare, Settings } from 'lucide-react'; // Example action icons

interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

interface ProfileHeaderProps {
  userName: string;
  userAvatarUrl?: string;
  userBio?: string;
  stats: ProfileStats;
  isOwnProfile: boolean; // To show "Edit Profile" or "Follow"
  onEditProfile?: () => void;
  onFollow?: () => void;
  onSendMessage?: () => void;
  coverImageUrl?: string; // Optional cover image
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userAvatarUrl,
  userBio,
  stats,
  isOwnProfile,
  onEditProfile,
  onFollow,
  onSendMessage,
  coverImageUrl,
}) => {
  console.log("Rendering ProfileHeader for:", userName);

  return (
    <Card className="w-full overflow-hidden">
      {/* Cover Image */}
      {coverImageUrl && (
        <div className="h-48 bg-gray-200">
          <img src={coverImageUrl} alt={`${userName}'s cover`} className="w-full h-full object-cover" />
        </div>
      )}

      <CardContent className="p-6 relative">
        {/* Avatar positioned over cover image or at top */}
        <div className={`flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 ${coverImageUrl ? '-mt-16 sm:-mt-20' : 'mb-4'}`}>
          <Avatar className={`h-24 w-24 sm:h-32 sm:w-32 border-4 border-white rounded-full shadow-md ${coverImageUrl ? '' : 'mb-2 sm:mb-0'}`}>
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{userName}</h1>
            {userBio && <p className="text-sm text-gray-600 mt-1">{userBio}</p>}
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            {isOwnProfile ? (
              <Button variant="outline" onClick={onEditProfile}>
                <Settings className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={onFollow}>
                  <UserPlus className="mr-2 h-4 w-4" /> Follow
                </Button>
                {onSendMessage && (
                   <Button variant="outline" onClick={onSendMessage}>
                     <MessageSquare className="mr-2 h-4 w-4" /> Message
                   </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex justify-center sm:justify-start space-x-6 border-t pt-4">
          <div className="text-center">
            <p className="font-semibold text-lg">{stats.posts}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">{stats.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">{stats.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;