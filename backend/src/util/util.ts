import {
	createParamDecorator,
	type ExecutionContext,
	Logger
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { Request } from "express";
import { User } from "src/models/user.entity";
import { FindOptionsRelationByString, FindOptionsRelations } from "typeorm";
import { App } from "../app.types";

export type BearerPayload = {
	email: string;
	id: number;
	getUser: (
		relations?: FindOptionsRelations<User> | FindOptionsRelationByString
	) => Promise<User>;
};

export function error<T extends App.WithStatus>(e: any): T {
	const err = e as Error;
	return {
		errors: [err.message],
		status: App.Status.Failed,
	} as T;
}

/**
 * @example Use this function as decorator on top of controller functions
 * @returns Returns the logged in user
 */
export const AuthUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = <Request>ctx.switchToHttp().getRequest();
		const payload = request.user as BearerPayload;
		return {
			...payload,
			getUser: async (
				relations: FindOptionsRelations<User> | FindOptionsRelationByString = []
			) => {
				return await User.findOne({ where: { id: payload.id }, relations });
			},
		};
	}
);

export class BaseRequest { }
