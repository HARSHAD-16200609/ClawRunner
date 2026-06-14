#!/usr/bin/env bun
import { runCliMode } from "../Modes/cli";
import chalk from "chalk";
import figlet from "figlet";
import {select , isCancel} from "@clack/prompts"
import { runTelegramMode } from "../Modes/telegram";



const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;


// use to print the ascii art name
export function printBannerWithShadow(text: string) {
  const ascii = figlet.textSync(text, {
    font: "ANSI Shadow",
    horizontalLayout: "default",
  });

  const lines = ascii.trimEnd().split("\n");
  const width = Math.max(...lines.map(line => line.length)) + 2;

  // Print shadow first
  for (const line of lines) {
    console.log(SHADOW(("  " + line).padEnd(width)));
  }

  // Move cursor up
  process.stdout.write(`\x1b[${lines.length}A`);

//   // Print foreground
  for (const line of lines) {
    console.log(FACE(line.padEnd(width)));
  }

}

export async function wakeup(){
   
     try{
     printBannerWithShadow("clawrunner")
     }catch(err){
        console.log("ERROR : " ,err)
     }
     
      const mode = await select({
        message:"Choose which Mode to continue with... ??",
        options:[
            // CLI options that we see in menu
            {value:"cli",label:"CLI"},
            {value:"telegram",label:"Telegram"},
            {value:"exit",label:"Exit"}
        ]
      })


      if(isCancel(mode) || mode === "exit"){
        console.log(chalk.dim("\n Goodbye 🦀\n"))
      }
     else if(mode === "cli"){
        runCliMode()
      }
      else if(mode === "telegram"){
      await runTelegramMode()
      }
     
}