import * as z from "zod";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormState = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please provide a valid phone number" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  mode: z.enum(["email", "phone", "whatsapp"], { message: "Please provide your preferred mode of contact" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  agreement: z.boolean(),
});

export function ContactForm() {
  const form = useForm<FormState>({
    defaultValues: { name: "", phone: "", email: "", subject: "", message: "", agreement: false },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        <div className="grid grid-cols-2 gap-[1.375rem]">
          <div className="flex items-center col-span-2 sm:col-span-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center">
                      <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd218882b66ce77f0675fc_Person%20Icon.svg" className="absolute left-4" />
                      <Input placeholder="Full Name" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.name ? <FormMessage /> : <FormDescription>Enter your full name</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center col-span-2 sm:col-span-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center">
                      <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd218882b66ce77f0675fc_Person%20Icon.svg" className="absolute left-4" />
                      <Input placeholder="Phone Number" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.phone ? <FormMessage /> : <FormDescription>Provide a valid phone number</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center col-span-2 sm:col-span-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center">
                      <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2186a8f8aab935af73b1_Envelope.svg" className="absolute left-4" />
                      <Input placeholder="Email Address" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.email ? <FormMessage /> : <FormDescription>Provide a valid email address</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center col-span-2 sm:col-span-1">
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <div className="relative flex items-center">
                    <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187c420420784330df6_Subject%20Icon.png" className="absolute left-4" />
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="pl-12">
                          <SelectValue placeholder="Preferred Contact Mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="whatsapp">Whatsapp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.formState.errors.mode ? <FormMessage /> : <FormDescription>Provide your preferred mode of contact</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center col-span-2">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center">
                      <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187c420420784330df6_Subject%20Icon.png" className="absolute left-4" />
                      <Input placeholder="Subject" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.subject ? <FormMessage /> : <FormDescription>Enter your subject</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="relative flex items-start col-span-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center">
                      <img src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187028ea46ec50bf656_Message%20Icon.svg" className="absolute left-4 top-2.5" />
                      <Textarea placeholder="Message" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.message ? <FormMessage /> : <FormDescription>Type your message</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-between col-span-2">
            <div className="flex items-center gap-3">
              <Controller name="agreement" control={form.control} render={({ field }) => <Checkbox id="checkbox" checked={field.value} onCheckedChange={field.onChange} />} />
              <Label htmlFor="checkbox" className="leading-snug">
                I agree to be contacted by Nodeflux in regards to this inquiry
              </Label>
            </div>
            <div className="relative group/button w-full sm:w-fit shrink-0">
              <div className="absolute transition-all duration-150 opacity-0 inset-px bg-[#FFFFFF] rounded-xl blur-sm group-hover/button:opacity-40 group-hover/button:-inset-px group-hover/button:duration-300 z-0"></div>
              <button className="h-14 sm:w-auto w-full inline-flex items-center justify-center text-center px-10 py-2 bg-[#FFFFFF] font-medium rounded-full text-background relative z-10">Submit Now</button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
