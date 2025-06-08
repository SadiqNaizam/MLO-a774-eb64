import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatePostForm from '@/components/CreatePostForm';
import PostCard from '@/components/PostCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

// Define PostFormData type locally if not exported from CreatePostForm or shared types
interface PostFormData {
  content: string;
  image?: File | null;
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

const placeholderPostsData: Post[] = [
  {
    id: '1',
    author: { name: 'Alice Wonderland', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,portrait', profileUrl: '/user-profile/alice' },
    content: 'Just enjoyed a wonderful day exploring the city! 🏙️ Found this amazing coffee shop. #citylife #coffee',
    imageUrl: 'https://source.unsplash.com/random/600x400/?city,coffee',
    timestamp: '2 hours ago',
    likesCount: 152,
    commentsCount: 18,
  },
  {
    id: '2',
    author: { name: 'Bob The Builder', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,portrait', profileUrl: '/user-profile/bob' },
    content: 'Finished my latest project! Check out this cool bookshelf I built. 🛠️📚 #DIY #woodworking',
    imageUrl: 'https://source.unsplash.com/random/600x400/?bookshelf,wood',
    timestamp: '5 hours ago',
    likesCount: 250,
    commentsCount: 45,
  },
  {
    id: '3',
    author: { name: 'Charlie Brown', avatarUrl: 'https://source.unsplash.com/random/100x100/?person,cartoon', profileUrl: '/user-profile/charlie' },
    content: 'Feeling philosophical today. "The greatest glory in living lies not in never falling, but in rising every time we fall." - Nelson Mandela #inspiration',
    timestamp: '1 day ago',
    likesCount: 98,
    commentsCount: 7,
  },
];


const NewsFeedPage = () => {
  const [posts, setPosts] = useState<Post[]>(placeholderPostsData);
  const navigate = useNavigate();
  const currentUser = { name: "Current User", avatarUrl: "https://source.unsplash.com/random/100x100/?profile" }; // Placeholder

  const handlePostSubmit = async (data: PostFormData) => {
    console.log('New post submitted:', data);
    const newPost: Post = {
      id: String(Date.now()),
      author: { name: currentUser.name, avatarUrl: currentUser.avatarUrl, profileUrl: `/user-profile/me` }, // Assuming 'me' for current user
      content: data.content,
      imageUrl: data.image ? URL.createObjectURL(data.image) : undefined,
      timestamp: 'Just now',
      likesCount: 0,
      commentsCount: 0,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLike = (postId: string) => console.log(`Liked post ${postId}`);
  const handleComment = (postId: string) => console.log(`Comment on post ${postId}`);
  const handleViewAuthorProfile = (author: PostAuthor) => {
    if (author.profileUrl) navigate(author.profileUrl);
    else console.log(`View profile of ${author.name}`);
  };
  
  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  console.log('NewsFeedPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
                <Link to="/user-profile/me"> {/* 'me' or actual user ID */}
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <Avatar className="h-7 w-7 mr-2">
                            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.substring(0,1)}</AvatarFallback>
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

      <main className="flex-grow container mx-auto px-4 py-8 md:flex md:space-x-8">
        {/* Left sidebar / placeholder */}
        <aside className="hidden md:block w-1/4 lg:w-1/5 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                {/* Add more links here */}
                 <Link to="/news-feed" className="block hover:text-blue-600">My Feed</Link>
                 <Link to="/friends" className="block hover:text-blue-600">Friends</Link>
                 <Link to="/user-profile/me" className="block hover:text-blue-600">My Profile</Link>
            </div>
        </aside>

        {/* Main content area */}
        <div className="md:w-3/4 lg:w-4/5 space-y-6">
            <CreatePostForm 
                onSubmitPost={handlePostSubmit} 
                currentUserName={currentUser.name}
                currentUserAvatar={currentUser.avatarUrl}
            />
            <ScrollArea className="h-[calc(100vh-280px)] md:h-auto md:max-h-[calc(100vh-200px)] rounded-md"> {/* Adjust height as needed */}
            <div className="space-y-6">
                {posts.map(post => (
                <PostCard
                    key={post.id}
                    {...post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onViewAuthorProfile={handleViewAuthorProfile}
                />
                ))}
            </div>
            </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default NewsFeedPage;