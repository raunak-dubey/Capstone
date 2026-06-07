import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";

export type SandboxDocument = HydratedDocument<SandboxSession>;

@Schema({ timestamps: true })
export class SandboxSession {
  @Prop({ required: true })
  projectId!: string;

  @Prop({ required: true, unique: true })
  sandboxId!: string;

  @Prop({ required: true })
  containerId!: string;

  @Prop({ required: true })
  port!: number;

  @Prop({ required: true })
  url!: string;

  @Prop({ default: "running" })
  status!: string;
}

export const SandboxSchema = SchemaFactory.createForClass(SandboxSession);
