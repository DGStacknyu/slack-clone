import { createWorkspace } from "@/actions/createWorkspace";
import { useCreateWorkspaceValue } from "@/hooks/createWorkspaceValue";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import slugify from "slugify";
import { toast } from "sonner";
import { v4 as uuidV4 } from "uuid";
import { z } from "zod";
import ImageUpload from "./imageUpload";
import { createWorkSpaceSchema } from "./schemas/SignInSchemas";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Typography from "./ui/typography";
const CreateWorkspace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { imageUrl, updateImageUrl } = useCreateWorkspaceValue();
  const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name }: z.infer<typeof createWorkSpaceSchema>) {
    const slug = slugify(name, { lower: true });
    const invite_code = uuidV4();
    setIsSubmitting(true);

    const result = await createWorkspace({ name, slug, imageUrl, invite_code });

    setIsSubmitting(false);

    if (result?.error) {
      console.log(result.error);
    }
    form.reset();
    updateImageUrl("");
    setIsOpen(false);
    router.refresh();
    toast.success("Workspace created successfully");
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger>
        <div className="flex items-center gap-2 p-2">
          <Button variant="secondary">
            <FaPlus />
          </Button>
          <Typography variant="p" text="Add Workspace" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography variant="h4" text="Create workspace" />
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Name" variant="p" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Typography
                      variant="p"
                      text="This is your workspace name"
                    />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ImageUpload />

            <Button disabled={isSubmitting} type="submit">
              <Typography variant="p" text="Submit" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
