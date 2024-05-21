import {MessageHeader} from "@/app/(layout)/dashboard/message/components/MessageHeader";
import {MessageSideBar} from "@/app/(layout)/dashboard/message/components/MessageSideBar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="p-4">
            <MessageHeader/>
            <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="col-span-1 rounded-md bg-white p-2">
                    <MessageSideBar/>
                </div>
                <div className="col-span-3 rounded-md bg-white p-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
