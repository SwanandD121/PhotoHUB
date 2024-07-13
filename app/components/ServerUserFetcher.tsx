// components/ServerUserFetcher.tsx
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function FetchUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return user;
}
