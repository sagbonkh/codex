import CodexCard from "@/components/cards/CodexCard";
import Comment from "@/components/forms/Comment";
import { fetchCodexById } from "@/lib/actions/codex.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: {id: string }}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    const post = await fetchCodexById(params.id);
    
    return(
        <section className="relative">
            <div>
            <CodexCard 
                key={post._id}
                id={post._id}
                currentUserId={user?.id ||""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
            />
            </div>
            <div className="mt-7">
                <Comment 
                codexId = {params.id}
                currentUserImg = {user.imageUrl}
                currentUserId = {JSON.stringify(userInfo._id)}
                />
            </div>

            <div className='mt-10'>
                {post.children.map((childItem: any) => (
                    <CodexCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={user.id}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;