"use client";
import { Loader2, UploadCloudIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDropzone, type DropzoneProps } from "react-dropzone";
import { toast } from "sonner";
import { TypographyMuted, TypographySmall } from "./ui/typography";
import { cn } from "~/lib/utils";

interface BaseProps {
	/**
	 * The label to display above the dropzone
	 * @default "Drag and drop your file(s) here, or click to select files"
	 */
	label?: ReactNode;
	/**
	 * The description to display below the dropzone
	 * @default "Drop files here or click to select them"
	 */
	description?: ReactNode;
	/**
	 * The file types to accept
	 * @see https://react-dropzone.js.org/#section-accepting-specific-file-types
	 */
	accept?: DropzoneProps["accept"];
	/**
	 * Whether the uploader is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the uploader accepts multiple files
	 * @default false
	 */
	multiple?: boolean;
	/**
	 * Any class to apply to the uploader
	 */
	className?: string;
	/**
	 * The maximum number of files to accept
	 * @default 1
	 */
	maxFiles?: number;
	/**
	 * The toasts to display when uploading files
	 * @default
	 * loading: "File(s) are being uploaded...",
	 * success: "File(s) uploaded",
	 * error: "An error occurred while uploading file(s)"
	 */
	toasts?: {
		/**
		 * The toast to display when uploading files
		 * @default "File(s) are being uploaded..."
		 */
		loading?: string;
		/**
		 * The toast to display when files are uploaded successfully
		 * @default "File(s) uploaded"
		 */
		success?: string;
		/**
		 * The toast to display when an error occurs while uploading files
		 * @default "An error occurred while uploading file(s)"
		 */
		error?: string;
	};
	/**
	 * The function to call when files are uploaded
	 * @param value The value of the uploaded file(s)
	 * @returns A promise that resolves when the upload is complete
	 */
	onChange: (value: string | string[] | null) => unknown;
}

export type UploaderProps = BaseProps &
	(
		| {
				multiple: true;
				onChange: (value: string[] | null) => unknown;
		  }
		| {
				multiple?: false | undefined;
				onChange: (value: string | null) => unknown;
		  }
	);

export function Uploader({
	label = "Drag and drop your file(s) here, or click to select files",
	description = "Drop files here or click to select them",
	accept,
	disabled,
	onChange,
	className,
	maxFiles,
	multiple = false,
	toasts = {
		loading: "File(s) are being uploaded...",
		success: "File(s) uploaded",
		error: "An error occurred while uploading file(s)",
	},
}: UploaderProps) {
	const [state, setState] = useState<"loading" | "error" | "success">();
	const onUpload = async (input: File[] | File) => {
		// This just simulates an upload.
		// I recommend you use `@tanstack/react-query` to handle the upload or any other (file upload) library. That way, you can get the state for free, handle retries, caching, and more.
		const promise = await new Promise<string[]>((resolve) => {
			setTimeout(() => {
				const files = Array.isArray(input) ? input : [input];
				resolve(files.map((file) => URL.createObjectURL(file)));
			}, 3000);
		});
		onChange(promise);
	};

	const { getRootProps, getInputProps } = useDropzone({
		disabled,
		accept,
		multiple,
		onDropAccepted: async (acceptedFiles) => {
			setState("loading");
			toast.promise(onUpload(acceptedFiles), {
				loading: toasts.loading,
				success: () => {
					setState("success");
					return toasts.success;
				},
				error: () => {
					setState("error");
					return toasts.error;
				},
			});
		},
		maxFiles: multiple ? maxFiles : 1,
	});

	return (
		<div
			className={cn(
				"relative bg-background",
				"h-80 w-full rounded-lg",
				"group flex flex-col items-center justify-center border-2 border-dashed p-4 transition-colors duration-200",
				disabled
					? "opacity-50"
					: "hover:cursor-pointer hover:border-accent hover:bg-accent dark:border-accent dark:hover:border-accent dark:hover:bg-accent",
				className,
			)}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col justify-center items-center space-y-2">
				{state === "loading" ? (
					<Loader2 className="size-8 animate-spin duration-1000" />
				) : (
					<UploadCloudIcon className="size-8" />
				)}
				<div
					className={cn(
						"flex flex-col space-y-1 justify-center items-center",
						disabled && "cursor-default",
					)}
				>
					<TypographySmall>{label}</TypographySmall>
					<TypographyMuted>{description}</TypographyMuted>
				</div>
			</div>
		</div>
	);
}
