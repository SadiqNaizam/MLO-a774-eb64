import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserListItem from '@/components/UserListItem';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Search, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  mutualFriendsCount?: number;
  isFriend?: boolean;
}

const placeholderFriends: User[] = [
  { id: 'friend1', name: 'Carol Danvers', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,hero', mutualFriendsCount: 10, isFriend: true },
  { id: 'friend2', name: 'David Banner', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,scientist', mutualFriendsCount: 5, isFriend: true },
];

const placeholderRequests: User[] = [
  { id: 'request1', name: 'Eve Harrington', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,profile', mutualFriendsCount: 2 },
];

const placeholderFindPeople: User[] = [
  { id: 'find1', name: 'Frank Castle', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,serious', mutualFriendsCount: 1 },
  { id: 'find2', name: 'Grace Hopper', avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,tech', mutualFriendsCount: 0, isFriend: false },
  { id: 'find3', name: 'Hank Pym', avatarUrl: 'https://source.unsplash.com/random/100x100/?man,glasses', isFriend: true },
];

// Placeholder for logged-in user
const loggedInUser = { id: "me", name: "My Name", avatarUrl: "https://source.unsplash.com/random/100x100/?profile-self" };

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleViewProfile = (userId: string) => navigate(`/user-profile/${userId}`);
  const handleAddFriend = (userId: string) => console.log(`Add friend: ${userId}`);
  const handleRemoveFriend = (userId: string) => console.log(`Remove friend: ${userId}`);
  const handleAcceptRequest = (userId: string) => console.log(`Accept request from: ${userId}`);
  const handleDeclineRequest = (userId: string) => console.log(`Decline request from: ${userId}`);
  const handleSendMessage = (userId: string) => console.log(`Send message to: ${userId}`);
  
  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  console.log('FriendsPage loaded');

  // Filter logic (simple example)
  const filterUsers = (users: User[]) => users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for people..."
            className="w-full pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all-friends">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-friends">All Friends ({filterUsers(placeholderFriends).length})</TabsTrigger>
            <TabsTrigger value="requests">Requests ({filterUsers(placeholderRequests).length})</TabsTrigger>
            <TabsTrigger value="find-people">Find People</TabsTrigger>
          </TabsList>

          <TabsContent value="all-friends" className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)]"> {/* Adjust height */}
              <div className="space-y-4">
                {filterUsers(placeholderFriends).map(user => (
                  <UserListItem
                    key={user.id}
                    {...user}
                    onViewProfile={handleViewProfile}
                    onRemoveFriend={handleRemoveFriend}
                    onSendMessage={handleSendMessage}
                  />
                ))}
                 {filterUsers(placeholderFriends).length === 0 && <p className="text-center text-gray-500 py-8">No friends found matching your search.</p>}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filterUsers(placeholderRequests).map(user => (
                  <Card key={user.id} className="p-4 flex items-center justify-between">
                    <UserListItem
                      {...user}
                      onViewProfile={handleViewProfile}
                      // No add/remove friend on request item, actions below
                    />
                    <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleAcceptRequest(user.id)}>Accept</Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(user.id)}>Decline</Button>
                    </div>
                  </Card>
                ))}
                {filterUsers(placeholderRequests).length === 0 && <p className="text-center text-gray-500 py-8">No pending friend requests.</p>}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="find-people" className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {filterUsers(placeholderFindPeople).map(user => (
                  <UserListItem
                    key={user.id}
                    {...user}
                    onViewProfile={handleViewProfile}
                    onAddFriend={!user.isFriend ? handleAddFriend : undefined}
                    onRemoveFriend={user.isFriend ? handleRemoveFriend : undefined}
                    onSendMessage={handleSendMessage}
                  />
                ))}
                {filterUsers(placeholderFindPeople).length === 0 && <p className="text-center text-gray-500 py-8">No people found matching your search.</p>}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FriendsPage;