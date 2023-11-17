import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
