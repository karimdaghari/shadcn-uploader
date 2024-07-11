"use client";
import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Uploader, type UploaderProps } from "./uploader";

export type UploaderInputProps<T extends FieldValues> = UseControllerProps<T> &
	Omit<UploaderProps, "label" | "description" | "onChange"> & {
		label?: string;
		description?: ReactNode;
		dropzoneLabel?: UploaderProps["label"];
		dropzoneDescription?: UploaderProps["description"];
		readOnly?: boolean;
	};

export function UploaderInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	dropzoneLabel,
	dropzoneDescription,
	...props
}: UploaderInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={props.disabled || props.readOnly}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Uploader
							label={dropzoneLabel}
							description={dropzoneDescription}
							{...field}
							{...props}
							disabled={props.disabled || props.readOnly}
						/>
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
