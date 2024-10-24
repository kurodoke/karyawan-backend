import e from "express";

export type Request = { user?: string } & e.Request;
