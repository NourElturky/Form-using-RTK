"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; 
import { setFormData } from "../store/formSlice"; 
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectItem, SelectTrigger, SelectValue, SelectContent,
} from "@/components/ui/select";

const FormSchema = z.object({
  username: z.string().min(3).max(8),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin", "superadmin"]),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to terms." }),
});

export function ReduxForm() {
  const [submittedData, setSubmittedData] = useState<z.infer<typeof FormSchema> | null>(null);

  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.form); // Get form data from Redux

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: reduxData, // Use Redux data as default values
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setSubmittedData(data);

    dispatch(setFormData(data)); // Save to Redux
    localStorage.setItem("formData", JSON.stringify(data)); // Save to localStorage
  };

  useEffect(() => {
    // Populate the form with Redux data
    form.reset(reduxData);
  }, [reduxData, form]);

  return (
    <div className="max-w-lg mx-auto p-8 mt-8 bg-white shadow-md rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="border p-2 rounded-md w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="border p-2 rounded-md w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border p-2 rounded-md w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Dropdown (Select) */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border p-2 rounded-md">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Agree to Terms Checkbox */}
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm">
                  I agree to terms and conditions
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
          >
            Submit
          </Button>
        </form>
      </Form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Submitted Data</h2>
          <ul className="list-disc pl-4">
            <li><strong>Username:</strong> {submittedData.username}</li>
            <li><strong>Email:</strong> {submittedData.email}</li>
            <li><strong>Role:</strong> {submittedData.role}</li>
            <li><strong>Agreed to Terms:</strong> {submittedData.agreeToTerms ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
