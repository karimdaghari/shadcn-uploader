"use client";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Uploader } from "~/components/uploader";
import { UploaderInput } from "~/components/uploader-input";
import { Form } from "~/components/ui/form";

export default function Home() {
	const form = useForm();

	return (
		<div className="flex flex-col justify-center items-center h-screen w-1/2 mx-auto">
			<Tabs defaultValue="basic" className="space-y-2 w-full">
				<TabsList>
					<TabsTrigger value="basic">Basic</TabsTrigger>
					<TabsTrigger value="rhf">React Hook Form</TabsTrigger>
				</TabsList>
				<TabsContent value="basic" className="w-full">
					<Uploader onChange={console.log} />
				</TabsContent>
				<TabsContent value="rhf" className="w-full">
					<Form {...form}>
						<form>
							<UploaderInput control={form.control} name="file" />
						</form>
					</Form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
