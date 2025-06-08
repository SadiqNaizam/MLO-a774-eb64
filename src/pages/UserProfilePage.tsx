import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/ProfileHeader';
import PostCard from '@/components/PostCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';


interface UserProfile {
  id: string;
  userName: string;
  userAvatarUrl?: string;
  userBio?: string;
  coverImageUrl?: string;
  stats: { posts: number; followers: number; following: number; };
  posts: Post[];
}

interface PostAuthor {
  name: string;
  avatarUrl?: string;
  profileUrl?: string;
}

interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
}

// Placeholder for logged-in user
const loggedInUser = { id: "me", name: "My Name", avatarUrl: "https://source.unsplash.com/random/100x100/?profile-self" };

const placeholderUserData: Record<string, UserProfile> = {
  "me": {
    id: "me",
    userName: "My Awesome Profile",
    userAvatarUrl: "https://source.unsplash.com/random/150x150/?selfie,happy",
    userBio: "Lover of code, coffee, and cats. Exploring the world one line of code at a time. This is my personal space on SocialApp!",
    coverImageUrl: "https://source.unsplash.com/random/1200x300/?technology,abstract",
    stats: { posts: 12, followers: 1500, following: 230 },
    posts: [
      { id: 'p1', author: { name: 'My Awesome Profile', avatarUrl: 'https://source.unsplash.com/random/150x150/?selfie,happy', profileUrl: '/user-profile/me' }, content: 'My first post on my profile!', imageUrl: 'https://source.unsplash.com/random/600x400/?welcome', timestamp: '3 days ago', likesCount: 42, commentsCount: 5 },
      { id: 'p2', author: { name: 'My Awesome Profile', avatarUrl: 'https://source.unsplash.com/random/150x150/?selfie,happy', profileUrl: '/user-profile/me' }, content: 'Working on a new exciting project. Stay tuned! #coding #fullstack', timestamp: '1 day ago', likesCount: 78, commentsCount: 12 },
    ],
  },
  "alice": {
    id: "alice",
    userName: "Alice Wonderland",
    userAvatarUrl: "https://source.unsplash.com/random/150x150/?woman,portrait,alice",
    userBio: "Exploring digital rabbit holes and sharing my adventures. Tea party enthusiast.",
    coverImageUrl: "https://source.unsplash.com/random/1200x300/?fantasy,wonderland",
    stats: { posts: 5, followers: 800, following: 150 },
    posts: [
      { id: 'ap1', author: { name: 'Alice Wonderland', avatarUrl: 'https://source.unsplash.com/random/150x150/?woman,portrait,alice', profileUrl: '/user-profile/alice' }, content: 'Down the rabbit hole I go!', imageUrl: 'https://source.unsplash.com/random/600x400/?fantasy,forest', timestamp: '1 week ago', likesCount: 120, commentsCount: 15 },
    ],
  },
   "bob": {
    id: "bob",
    userName: "Bob The Builder",
    userAvatarUrl: "https://source.unsplash.com/random/150x150/?man,portrait,builder",
    userBio: "Building things, both physical and digital. Can we fix it? Yes, we can!",
    coverImageUrl: "https://source.unsplash.com/random/1200x300/?construction,tools",
    stats: { posts: 25, followers: 1200, following: 90 },
    posts: [
      { id: 'bp1', author: { name: 'Bob The Builder', avatarUrl: 'https://source.unsplash.com/random/150x150/?man,portrait,builder', profileUrl: '/user-profile/bob' }, content: 'Latest creation: a sturdy oak desk.', imageUrl: 'https://source.unsplash.com/random/600x400/?desk,woodwork', timestamp: '2 days ago', likesCount: 200, commentsCount: 30 },
    ],
  }
};

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('UserProfilePage loaded for userId:', userId);
    // Simulate fetching profile data
    const data = placeholderUserData[userId || 'me'] || placeholderUserData['alice']; // Fallback to alice if not found
    setProfileData(data);
  }, [userId]);

  const isOwnProfile = profileData?.id === loggedInUser.id;

  const handleLike = (postId: string) => console.log(`Liked post ${postId} on profile ${profileData?.userName}`);
  const handleComment = (postId: string) => console.log(`Comment on post ${postId} on profile ${profileData?.userName}`);
  const handleViewAuthorProfile = (author: PostAuthor) => {
     if (author.profileUrl) navigate(author.profileUrl);
  };

  const handleEditProfile = () => console.log('Edit profile clicked');
  const handleFollow = () => console.log(`Follow user ${profileData?.userName} clicked`);
  const handleSendMessage = () => console.log(`Send message to ${profileData?.userName} clicked`);

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
        {/* Could use Skeleton components here */}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
       <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/news-feed" className="text-2xl font-bold text-blue-600">SocialApp</Link>
            <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                <Link to="/news-feed">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>News Feed</NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to="/friends">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Friends</NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Link to={`/user-profile/${loggedInUser.id}`}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Avatar className="h-7 w-7 mr-2">
                            <AvatarImage src={loggedInUser.avatarUrl} alt={loggedInUser.name} />
                            <AvatarFallback>{loggedInUser.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        Profile
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <Button variant="ghost" onClick={handleLogout} className={navigationMenuTriggerStyle()}>
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <ProfileHeader
          userName={profileData.userName}
          userAvatarUrl={profileData.userAvatarUrl}
          userBio={profileData.userBio}
          stats={profileData.stats}
          isOwnProfile={isOwnProfile}
          onEditProfile={isOwnProfile ? handleEditProfile : undefined}
          onFollow={!isOwnProfile ? handleFollow : undefined}
          onSendMessage={!isOwnProfile ? handleSendMessage : undefined}
          coverImageUrl={profileData.coverImageUrl}
        />

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 md:mx-auto">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            {/* <TabsTrigger value="friends">Friends</TabsTrigger> */}
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <ScrollArea className="h-auto max-h-[800px]"> {/* Adjust height as needed */}
              <div className="space-y-6">
                {profileData.posts.length > 0 ? (
                  profileData.posts.map(post => (
                    <PostCard
                      key={post.id}
                      {...post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onViewAuthorProfile={handleViewAuthorProfile}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No posts yet.</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="about" className="mt-6 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">About {profileData.userName}</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{profileData.userBio || "No bio available."}</p>
            {/* Add more about information here */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserProfilePage;