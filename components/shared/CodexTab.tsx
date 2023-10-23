import { redirect } from "next/navigation";



import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import CodexCard from "../cards/CodexCard";
import { fetchUserPosts } from "@/lib/actions/user.actions";


interface Result {
    name: string;
    image: string;
    id: string;
    codex: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      community: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          image: string;
        };
      }[];
    }[];
  }

  interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
  }

  async function CodexTab({ currentUserId, accountId, accountType }: Props) {
    let result: Result;
  
    if (accountType === "Community") {
      result = await fetchCommunityPosts(accountId);
    } else {
      result = await fetchUserPosts(accountId);
    }
  
    if (!result) {
      redirect("/");
    }
  
    return (
      <section className='mt-9 flex flex-col gap-10'>
        {result.codex.map((codex) => (
          <CodexCard
            key={codex._id}
            id={codex._id}
            currentUserId={currentUserId}
            parentId={codex.parentId}
            content={codex.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: codex.author.name,
                    image: codex.author.image,
                    id: codex.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result.name, id: result.id, image: result.image }
                : codex.community
            }
            createdAt={codex.createdAt}
            comments={codex.children}
          />
        ))}
      </section>
    );
  }
  
  export default CodexTab;