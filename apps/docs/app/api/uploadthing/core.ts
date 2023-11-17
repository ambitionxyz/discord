import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { options } from "../auth/[...nextauth]/options";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerSession(options);
  console.log("SSSSS", { session });
  if (!session) throw new Error("Unauthorized");
  return { userId: session.user?.email };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
