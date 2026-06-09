#!/usr/bin/env bun
import {wakeup} from "./tui/wakeup.ts"
import { Command } from 'commander';
const program = new Command();


program.name("ClawRunner")
.description("Your own self-hosted open claw mvp")
.version("0.0.1");


program.command("wakeup").description("Use to wakeup the cli or use Telegram Mode").action(async()=>{
   await wakeup()
})

await program.parseAsync(process.argv)