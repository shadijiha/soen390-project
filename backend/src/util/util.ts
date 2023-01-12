/**
 *
 */

import { App } from "src/app.types";

export function error<T extends App.WithStatus>(e: any): T {
	const err = e as Error;
	return {
		errors: [err.message],
		status: App.Status.Failed,
	} as T;
}
