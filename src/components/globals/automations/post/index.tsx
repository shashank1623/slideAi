
import { useQueryAutomationPosts } from '@/hooks/user-queries'
import React from 'react'
import TriggerButton from '../trigger-button'
import { InstagramPostProps } from '@/types/posts.type'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { useAutomationPosts } from '@/hooks/use-automation'

type Props = {
  id: string
}

/**
 * Component for rendering a button that allows users to attach a post.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {string} props.id - The ID used to fetch automation posts.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <PostButton id="12345" />
 *
 * @remarks
 * This component uses `useQueryAutomationPosts` to fetch posts and `useAutomationPosts` to manage post selection.
 * It displays a list of posts fetched from the server and allows users to select a post to attach.
 * If no posts are found, it displays a message indicating that no posts were found.
 *
 * @see {@link useQueryAutomationPosts}
 * @see {@link useAutomationPosts}
 */
const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts()
  const { posts, onSelectPost, mutate, isPending } = useAutomationPosts(id)

  return (
    <TriggerButton label="Attach a post">
      {data?.status === 200 ? (
        <div className="flex flex-col gap-y-3 w-full">
          <div className="flex flex-wrap w-full gap-3">
            {data.data.data.map((post: InstagramPostProps) => (
              <div
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                key={post.id}
                onClick={() =>
                  onSelectPost({
                    postid: post.id,
                    media: post.media_url,
                    mediaType: post.media_type,
                    caption: post.caption,
                  })
                }
              >
                {posts.find((p) => p.postid === post.id) && (
                  <CheckCircle
                    fill="white"
                    stroke="black"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                  />
                )}
                <Image
                  fill
                  sizes="100vw"
                  src={post.media_url}
                  alt="post image"
                  className={cn(
                    'hover:opacity-75 transition duration-100',
                    posts.find((p) => p.postid === post.id) && 'opacity-75'
                  )}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={mutate}
            disabled={posts.length === 0}
            className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]"
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className="text-text-secondary text-center">No posts found!</p>
      )}
    </TriggerButton>
  )
}

export default PostButton