import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // For image upload
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast'; // Assuming use-toast hook is in src/hooks
import { ImagePlus, Send } from 'lucide-react';

const postSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty.").max(500, "Post content is too long."),
  image: z.any().optional(), // Handle file upload more robustly in a real app
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostFormProps {
  onSubmitPost: (data: PostFormData) => Promise<void>;
  currentUserName?: string; // Optional: display user's name
  currentUserAvatar?: string; // Optional: display user's avatar
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmitPost, currentUserName, currentUserAvatar }) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  console.log("Rendering CreatePostForm");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log("Image selected:", file.name);
    } else {
      setValue('image', undefined);
      setImagePreview(null);
    }
  };

  const processSubmit = async (data: PostFormData) => {
    console.log("Submitting post data:", data);
    try {
      await onSubmitPost(data);
      toast({ title: "Post Created!", description: "Your post has been successfully published." });
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({ title: "Error", description: "Failed to create post. Please try again.", variant: "destructive" });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(processSubmit)}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            {/* Optional: Display user avatar */}
            {currentUserAvatar && <img src={currentUserAvatar} alt={currentUserName || 'User'} className="h-10 w-10 rounded-full" />}
            <Textarea
              placeholder={currentUserName ? `What's on your mind, ${currentUserName}?` : "What's on your mind?"}
              {...register('content')}
              className="min-h-[80px] flex-1 resize-none"
              aria-invalid={errors.content ? "true" : "false"}
            />
          </div>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}

          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Selected preview" className="max-h-40 rounded-md object-contain" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 border-t">
          <div>
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="ghost" size="icon" asChild>
                <div>
                  <ImagePlus className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  <span className="sr-only">Add image</span>
                </div>
              </Button>
            </Label>
            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : <>Post <Send className="ml-2 h-4 w-4" /></>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;