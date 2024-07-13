"use client"
import { CreateStripeAccountLink, SellProduct, type State } from "@/app/actions";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SelectCategory from "../SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { SubmitButton } from "../SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";
import Link from "next/link";

export function ListForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initalState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, SetProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please describe your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="instructions">
        <Alert className="bg-yellow-500/10">
        <FileWarning color="orange" className="h-4 w-4 " />
          <AlertTitle>Instruction</AlertTitle>
          <AlertDescription>
            <h3 className="">
              You first need to link your account with <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Stripe</span> &#40;our official secured payments partner&#41;. If you haven't linked it yet, then please visit billing page by clicking <span className="text-blue-500 hover:underline hover:cursor-pointer"><Link href={"/billing"}>here</Link></span>.
            </h3>
            <h3>
              If you have already linked your account, please procced to list your service.
            </h3>
          </AlertDescription>
        </Alert>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name of your Product"
            required
            minLength={3}
          />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input
            placeholder="29$"
            type="number"
            name="price"
            required
            min={1}
          />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Small Summary</Label>
          <Textarea
            name="smallDescription"
            placeholder="Pleae describe your product shortly right here..."
            required
            minLength={10}
          />
          {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          {/* <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          /> */}
          <Label>Description</Label>
          {/* <TipTapEditor json={json} setJson={setJson} /> */}
          <Textarea rows={10} name="description"
            placeholder="Pleae describe your product in detail"
            minLength={10}/>
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <div className="">
            <UploadDropzone 
              className="ut-button:bg-primary ut-label:text-primary ut-ready:bg-muted cursor-pointer"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImages(res.map((item) => item.url));
                toast.success("Your images have been uploaded");
              }}
              onUploadError={(error: Error) => {
                toast.error("Something went wrong, try again");
              }}
            />
          </div>
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>

      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton title="Create your Product" />
      </CardFooter>
    </form>
  );
}