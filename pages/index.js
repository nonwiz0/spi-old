import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcher";
import { prisma } from "@/auth";

export default function Home({ data }) {
  const { data: session } = useSession();
  console.log("Data", data);
  console.log({ session });
  const roles = ["customer", "finance", "purchase", "inventory", "admin"];
  const refer_api = {
    create_user: "/api/user/create",
    create_location: "/api/location/create",
    create_department: "/api/department/create",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = [...event.target.children].reduce((obj, input) => {
      obj[input.name] = input.value;
      return obj;
    }, {});
    fetcher(refer_api[data.request], data).then((item) => console.log(item));
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-4 border border-gray-800 rounded-lg m-1">
          {/* create user */}
          <h1> Admin </h1>
          <h2> Create User </h2>
          <form
            className="py-2 px-1 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="request" value="create_user" />
            <input type="text" name="name" placeholder="Chan Broset" />
            <input type="text" name="username" placeholder="201800157" />
            <input
              type="email"
              name="email"
              placeholder="201800157@my.apiu.edu"
            />
            <input type="password" name="password" placeholder="************" />
            <select name="role" placeholder="Label">
              {roles.map((item, id) => (
                <option key={id}> {item} </option>
              ))}
            </select>
            <input
              type="submit"
              value="Query"
              className="bg-gray-700 rounded-lg text-gray-50"
            />
          </form>
        </div>

        <div className="p-4 border border-gray-800 rounded-lg m-1">
          {/* create location */}
          <h1> Admin </h1>
          <h2> Create Location </h2>
          <form
            className="py-2 px-1 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="request" value="create_location" />
            <input type="text" name="building" placeholder="Admin" />
            <input type="text" name="floor" placeholder="Floor 1" />
            <input
              type="text"
              name="room_number"
              placeholder="Room number 301"
            />
            <textarea name="description" placeholder="Description...." />
            <input
              type="submit"
              value="Query"
              className="bg-gray-700 rounded-lg text-gray-50"
            />
          </form>
        </div>
        <div className="p-4 border border-gray-800 rounded-lg m-1">
          {/* create location */}
          <h1> Admin </h1>
          <h2> Create Location </h2>
          <form
            className="py-2 px-1 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="request" value="create_department" />
            <input
              type="text"
              name="name"
              placeholder="Name: Business Administration"
            />
            <input
              type="Number"
              name="budget"
              placeholder="Budget (THB): 8000"
            />
            <input
              type="submit"
              value="Query"
              className="bg-gray-700 rounded-lg text-gray-50"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const locations = await prisma.location.findMany();
  return { props: { data: { locations } } };
};
