import dotenv from "dotenv";
import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();
export const app: Express = express();
