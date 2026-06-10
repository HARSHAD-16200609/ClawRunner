import { isCancel, log, text } from "@clack/prompts"
import chalk, { Chalk } from "chalk"
import { getAgentModel } from "../../AI/ai.config"
import { generateText, stepCountIs, ToolLoopAgent } from "ai"
import { runCliMode } from "../cli"
import { defaultAgentConfig, type ActionLog } from "./types"
import { ActionTracker } from "./actionTracker"
import { ToolExecutor } from "./tool-executor"
import { createAgentTools } from "./agent-tools"
import { renderTerminalMarkdown } from "../../tui/terminal-md"
import { runApprovalFlow } from "./approval"



export async function runAgentMode() {
  console.log(chalk.bold("\n 🤖 Running Agent Mode\n"))
  
    const goal = await text({
      message: "What Would you like the agent to do for you ??",
      placeholder: "DO Some Concrete Database Task"
    })

 
      if (isCancel(goal) || !goal.trim()) return;
   
  const config = defaultAgentConfig();
  const tracker = new ActionTracker()
  const executor  = new ToolExecutor(tracker,config)
const tools = createAgentTools(executor) 

const agent = new ToolLoopAgent({
  model:getAgentModel(),
  stopWhen:stepCountIs(40),
  instructions:[
       `Workspace root: ${config.codebasePath}`,
      "All mutations are staged until approval.",
  ].join("\n"),
  tools,

})

const result = await agent.generate({
  prompt:goal.trim(),
  onStepFinish: ({toolCalls})=>{
    for(const  tc of toolCalls){
      const preview = JSON.stringify((tc.input)).slice(0,160)
      console.log( chalk.green(' ✓'),
      chalk.bold(String(tc.toolName)),
      chalk.dim((preview+ (preview.length >= 160 ? "..." : "")),
        )
      ) 
    }
  }
})

 if (result.text?.trim()) console.log(renderTerminalMarkdown(result.text));

 
 const ok =await  runApprovalFlow(tracker);
 if(!ok) executor.clearStaging();
  
 const {errors} = executor.applyApprovedFromTracker();

if(errors.length){   
   console.log(chalk.red("Some operations Returned error's : "))
     for (const e of errors) console.log(chalk.red(`  • ${e}`));
}
 else{
   console.log(chalk.green('\n✓ Applied.\n'));
  }

  executor.clearStaging()

} 