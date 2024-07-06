"use client";

import { MessageBodyHeader } from "@/app/(layout)/dashboard/message/components/MessageBodyHeader";
import { addMessage } from "@/app/(layout)/dashboard/message/manager";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  apiRoutes,
  decodeDataFromBase64,
  frontendLinks,
} from "@/config/common";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { Icons } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr/_internal";
import { z } from "zod";

const Page = () => {
  return <MessageBodySection />;
};

export default Page;

const MessageBodySection = () => {
  return (
    <div>
      <div className="flex h-full w-full flex-col ">
        <MessageBodyHeader />
        <MessageBody />
      </div>
    </div>
  );
};

const MessageBody = () => {
  const searchParams = useSearchParams();
  const chatId = useMemo(
    () => decodeDataFromBase64(searchParams.get("chat") || "")?.id || 0,
    [searchParams],
  );
  const projectId = useMemo(
    () => decodeDataFromBase64(searchParams.get("project") || "")?.id,
    [searchParams],
  );
  const params = useMemo(() => {
    const extra: { [key: string]: string | number } = {
      limit: 10,
      expand: "created_by",
    };
    if (projectId) {
      extra.project = projectId;
    }
    return extra;
  }, [projectId]);
  const { data: messages, mutate } = useAxiosSWR<MessageBodyChatItemInterface>(
    apiRoutes.PROTECTED.GENERAL.CHAT.MESSAGES.LIST(chatId)(params),
  );

  return (
    <div>
      <MessageBodyChat messages={messages} />
      <MessageBodyFooter mutate={mutate} />
    </div>
  );
};

interface MessageBodyChatItemInterface {
  id: number;
  message: string;
  time: number;
  is_owner: boolean;
}

const MessageBodyChat = ({
  messages,
}: {
  messages: MessageBodyChatItemInterface[];
}) => {
  return (
    <div className="mt-4 flex h-96 w-full flex-col overflow-auto">
      {messages.map((message) => (
        <MessageBodyChatItem key={message.id} data={message} />
      ))}
    </div>
  );
};

const MessageBodyChatItem = ({
  data,
}: {
  data: MessageBodyChatItemInterface;
}) => {
  return (
    <div className="my-0.5">
      <div></div>
      <div
        className={`w-ful flex gap-2 ${data?.is_owner ? "justify-end" : " "}`}
      >
        {!data?.is_owner && (
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              {/*<AvatarImage src={messageBodyData.metaData[0].user.userImage}/>*/}
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={`${data?.is_owner ? "bg-brand" : "bg-gray-200"} rounded-md p-4`}
        >
          <p className={`${data?.is_owner ? "text-white" : "text-black"}`}>
            {data?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
});
const MessageBodyFooter = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const searchParams = useSearchParams();
  const createOfferParams = new URLSearchParams(searchParams.toString());
  createOfferParams.set("offer", "true");
  console.log("This is the search params");
  const chatId = useMemo(
    () => decodeDataFromBase64(searchParams.get("chat") || "")?.id || 0,
    [searchParams],
  );
  const projectId = useMemo(
    () => decodeDataFromBase64(searchParams.get("project") || "")?.id,
    [searchParams],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: any) {
    if (projectId) {
      data.project = projectId;
    }
    await addMessage(chatId, data);
    await mutate();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <FormField
          control={form.control}
          disabled={chatId===0}
          name="message"
          render={({ field }) => (
            <FormItem className="flex h-12 items-center justify-start gap-2 self-center rounded-sm border-[1px] border-gray-600 p-2">
              <FormControl>
                <Input
                  className="my-2 w-full border-0 bg-transparent pl-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  placeholder="Type your message..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <hr className="my-4" />
        <div className="mb-4 ml-4 flex gap-4">
          <button disabled={chatId===0}>
            <Icons.microphone className="h-6 w-6" />
          </button>
          <button disabled={chatId===0}>
            <Icons.emojie className="h-6 w-6" />
          </button>
          <button  disabled={chatId===0}>
            <Icons.imageChat className="h-6 w-6" />
          </button>
          <Button
            type="submit"
            disabled={chatId===0}
            variant={"outline"}
            className="h-12 rounded-sm border-brand text-brand"
          >
            <Link
              href={frontendLinks.PRIVATE.CREATE_AN_OFFER(
                searchParams.toString(),
              )}
            >
              Create an Offer
            </Link>
          </Button>
        </div>
        {/*</div>*/}
      </form>
    </Form>
  );
};
