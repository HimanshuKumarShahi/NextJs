import UsersFilter from "@/components/usersfilter";

export default async function PythonPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users = await response.json();

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Person Search:</h1>
        <p>Search for a person by name:</p>
        <UsersFilter users={users} />
      </main>
    </>
  );
}
