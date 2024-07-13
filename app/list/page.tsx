import { Card } from '@/components/ui/card'
import { ListForm } from '../components/form/ListForm'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import prisma from '../lib/db';

// ---------if the user has not linked the account with stripe, he will be redirected to billing page where he has to link with stripe first, else he cannot list the service
// but for some reason, when the user links his account with stripe, the stripeConnedtedLinked is not getting updated from false to true in the prisma database
// so temporarily i've added the static instruction on this page as well as billing page

// async function getData(userId: string) {
//     const data = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       select: {
//         stripeConnectedLinked: true,
//       },
//     });
  
//     if (data?.stripeConnectedLinked === false) {
//       return redirect("/billing");
//     }
  
//     return null;
// }
// -------------------------------------------------------------------
  
export default async function SellRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user){
        throw new Error("Unauthorised")
    }

    // const data = await getData(user.id);

  return (
    <div>
        <section className='max-w-7xl mx-auto px-4 md:px-8 mb-14'>
            <Card>
                <ListForm />
            </Card>
        </section>
    </div>
  )
}