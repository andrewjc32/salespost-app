import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Unstandard App Home</h1>
      { session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
        </div>
      )}
    </div>
  );
}