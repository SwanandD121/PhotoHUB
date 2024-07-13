import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import prisma from "../lib/db";
  import { Button } from "@/components/ui/button";
  import { CreateStripeAccountLink, GetStripeDashboardLink } from "../actions";
import { SubmitButton } from "../components/SubmitButton";
  
  async function getData(userId: string) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        stripeConnectedLinked: true,
      },
    });
  
    return data;
  }
  
  export default async function BillingRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("Unauthorized");
    }
  
    const data = await getData(user.id);
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Find all your details regarding your payments.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-4 col-span-1 rounded-lg p-4 bg-muted">
              <h3 className="text-muted-foreground">
                If you haven't linked your account to <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stripe</span> (our official secured payments partner), then please link it by clicking on the button below.
              </h3>
              <form action={CreateStripeAccountLink}> 
                <SubmitButton title="Link your Account to Stripe" />
              </form>
            </div>
            <div className="flex flex-col gap-4 col-span-1 rounded-lg p-4 bg-muted">
              <h3 className="text-muted-foreground">
                If you have already linked your account to <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stripe</span>, you can go to your dashboard.
              </h3>
              <form action={GetStripeDashboardLink}>
                <SubmitButton title="View Dashboard" />
              </form>
            </div>
            
          </CardContent>
        </Card>
      </section>
    );
  }