import CodexCard from "@/components/cards/CodexCard";
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
        </section>
    )
}

export default Page;