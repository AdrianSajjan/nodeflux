import * as z from "zod";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type FormState = z.infer<typeof schema>;
type FormStatus = "idle" | "loading" | "success" | "error";

const schema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().optional(),
    email: z.string().optional(),
    mode: z.enum(["email", "phone", "whatsapp"], { message: "Please provide your preferred mode of contact" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(1, { message: "Message is required" }),
    agreement: z.boolean().refine((val) => val === true, {
      message: "You must agree to be contacted",
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either email or phone must be provided",
        path: ["email"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either email or phone must be provided",
        path: ["phone"],
      });
    }
  });

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const form = useForm<FormState>({
    defaultValues: { name: "", phone: "", email: "", subject: "", message: "", agreement: true },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormState) => {
    const body = new FormData();
    for (const key in data) {
      body.append(key, String(data[key as keyof FormState]));
    }
    try {
      const response = await fetch("https://script.google.com/macros/s/1-IAIe3ZQVbH_Tu74bYW620vLSwo-jOrf-w2atzDX4Lk/exec", {
        method: "POST",
        body: body,
      });
      if (!response.ok) {
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch (error) {
      setStatus("error");
    }
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
                      <img
                        src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd218882b66ce77f0675fc_Person%20Icon.svg"
                        className="absolute left-4"
                      />
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
                      <img
                        src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd218882b66ce77f0675fc_Person%20Icon.svg"
                        className="absolute left-4"
                      />
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
                      <img
                        src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2186a8f8aab935af73b1_Envelope.svg"
                        className="absolute left-4"
                      />
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
                    <img
                      src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187c420420784330df6_Subject%20Icon.png"
                      className="absolute left-4"
                    />
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
                      <img
                        src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187c420420784330df6_Subject%20Icon.png"
                        className="absolute left-4"
                      />
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
                      <img
                        src="https://cdn.prod.website-files.com/65b815fb8b11393078dd199d/65cd2187028ea46ec50bf656_Message%20Icon.svg"
                        className="absolute left-4 top-2.5"
                      />
                      <Textarea placeholder="Message" className="pl-12" defaultValue="" {...field} />
                    </div>
                  </FormControl>
                  {form.formState.errors.message ? <FormMessage /> : <FormDescription>Type your message</FormDescription>}
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-between col-span-2">
            <div className="flex flex-col items-start col-span-2">
              <FormField
                control={form.control}
                name="agreement"
                render={() => (
                  <FormItem className="w-full">
                    <div className="flex items-center gap-3">
                      <Controller
                        name="agreement"
                        control={form.control}
                        render={({ field }) => <Checkbox id="checkbox" checked={field.value} onCheckedChange={field.onChange} />}
                      />
                      <Label htmlFor="checkbox" className="leading-snug">
                        I agree to be contacted by Nodeflux in regards to this inquiry
                      </Label>
                    </div>
                    {form.formState.errors.agreement ? <FormMessage>{form.formState.errors.agreement.message}</FormMessage> : null}
                  </FormItem>
                )}
              />
            </div>
            <div
              data-disabled={status === "loading"}
              className="relative group/button w-full sm:w-fit shrink-0 data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
            >
              <div className="absolute transition-all duration-150 opacity-0 inset-px bg-[#FFFFFF] rounded-xl blur-sm group-hover/button:opacity-40 group-hover/button:-inset-px group-hover/button:duration-300 z-0"></div>
              <button
                disabled={status === "loading"}
                className="h-14 sm:w-auto w-full inline-flex items-center justify-center text-center px-10 py-2 bg-[#FFFFFF] font-medium rounded-full text-background relative z-10"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
