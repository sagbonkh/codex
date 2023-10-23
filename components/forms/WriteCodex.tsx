"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CodexValidation } from "@/lib/validations/codex";
import { createCodex } from "@/lib/actions/codex.actions";

interface Props {
    userId: string;
  }

function WriteCodex({ userId }: Props) {
    const router = useRouter();
    const pathname = usePathname();
  
    const { organization } = useOrganization();
  
    const form = useForm<z.infer<typeof CodexValidation>>({
      resolver: zodResolver(CodexValidation),
      defaultValues: {
        codex: "",
        accountId: userId,
      },
    });  

    const onSubmit = async (values: z.infer<typeof CodexValidation>) => {
        await createCodex({
          text: values.codex,
          author: userId,
          communityId: organization ? organization.id : null,
          path: pathname,
        });
    
        router.push("/");
    };

    return(
      <Form {...form}>
        <form
          className='mt-10 flex flex-col justify-start gap-10'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='codex'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='text-base-semibold text-dark-2'>
                  Content
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-gray-3 text-dark-1'>
                  <Textarea rows={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='bg-primary-500'>
            Post Thread
          </Button>
        </form>
      </Form>
    );
}

export default WriteCodex;

