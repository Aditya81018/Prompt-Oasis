import { Button } from "@/components/ui/button";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import Markdown from "react-markdown";
import templates from "@/data/templates.json"
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [action, setAction] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const actionButtons = [
    { id: 0, label: "Make a prompt" },
    { id: 1, label: "Review my prompt" },
    { id: 2, label: "Strategise a project" },
    { id: 3, label: "Generate a template" },
  ]

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEM_API });

  async function handleSubmit() {

    setIsLoading(true);
    if (action === 0 && input.length > 0) {
      try {
        // Send the user's input to the AI model
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{
            role: "model",
            parts: [{
              text: "You are an expert prompt engineer. Your task is to take a user's prompt and rewrite it to be clearer, more effective, and better for an AI model. The rewritten prompt should be a small and consice yet detailed."
            }]
          }, {
            role: "user",
            parts: [{
              text: "Rewrite this prompt to be better for ai: " + input
            }]
          }],
        });

        // @ts-ignore
        setOutput(result.candidates[0].content.parts[0].text);

      } catch (error) {
        console.error("Error generating content:", error);
      } finally {
        setIsLoading(false)
      }
    }

    if (action === 1 && input.length > 0) {
      try {
        // Send the user's input to the AI model
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{
            role: "model",
            parts: [{
              text: "You are an expert prompt reviewer. Your task is to analyze a user's prompt and provide constructive feedback. Your response must follow this exact format:\n\n### **Score:**\n\nClarity: [Score out of 5 in star emojis]\n\nSpecificity: [Score out of 5 in star emojis]\n\nEffectiveness: [Score out of 5 in star emojis]\n\n### **Summary:**\n[A short, 1-2 sentence summary of the prompt's overall strength and weakness.]\n\n### Actionable Improvements:\n1. [Suggestion 1]\n2. [Suggestion 2]\n3. [Suggestion 3]"
            }]
          }, {
            role: "user",
            parts: [{
              text: "Review this prompt: " + input
            }]
          }],
        });

        // @ts-ignore
        setOutput(result.candidates[0].content.parts[0].text);

      } catch (error) {
        console.error("Error generating content:", error);
      } finally {
        setIsLoading(false)
      }
    }

    if (action === 2 && input.length > 0) {
      try {
        // Send the user's input to the AI model
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{
            role: "model",
            parts: [{
              text: `You are an expert project strategist. Your task is to help the user plan a project by asking key questions and providing a step-by-step plan.
        
        Your responses must be highly structured, concise, and easy to read. Avoid conversational filler and get straight to the point.
        
        Initial Request: When the user first describes a project, you will generate a list of 3-5 high-level questions to clarify the project's goals, scope, and target audience. After the questions, provide a list of 2-3 initial steps and the prompts needed to accomplish them using an AI.
        
        Iterative Process: For each subsequent user input (where the user answers the questions and provides updates), you will generate 1-2 new, more specific questions based on their answers and add 1-2 new, smart steps to the plan, including the AI prompts. You must not repeat previous questions or steps. Maintain a polite and encouraging tone.
        
        Finalizing the Plan: If the user's input starts with "END", you will not ask any more questions. Instead, based on all the information you have gathered, you will generate a comprehensive, final set of steps and the AI prompts to complete the entire project. This final output should be a complete project plan, formatted clearly.
        
        Format:
        Questions:
        1. [Question 1]
        =>
        
        2. [Question 2]
        => 
        
        ...
        
        Steps:
        1. [Step 1]
        => [prompt to accomplish the step using AI]
        
        2. [Step 2]
        => [prompt to accomplish the step using AI]
        
        ...`
            }]
          }, {
            role: "user",
            parts: [{
              text: input
            }]
          }],
        });

        // @ts-ignore
        setOutput(result.candidates[0].content.parts[0].text);

      } catch (error) {
        console.error("Error generating content:", error);
      } finally {
        setIsLoading(false)
      }
    }

    if (action === 3 && input.length > 0) {
      try {
        // Send the user's input to the AI model
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{
            role: "model",
            parts: [{
              text: "You are an expert at creating content templates. Your task is to take a user's content topic and generate a template for them to fill out. The template should be based on the user's input and include specific fields relevant to the topic. Your output must start with a general prompt for a ai and follow the exact format below, with no additional conversational text.\n\n[Field Name 1]\n=> \n[Field Name 2]\n=> \n[Field Name 3]\n=> "
            }]
          }, {
            role: "user",
            parts: [{
              text: input
            }]
          }],
        });

        // @ts-ignore
        setOutput(result.candidates[0].content.parts[0].text);

      } catch (error) {
        console.error("Error generating content:", error);
      } finally {
        setIsLoading(false)
      }
    }
  }

  function handleUseTemplate(template: typeof templates[number]) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setInput(template.description + "\n\n" + template.sections.map(section => section.title).join("\n=> \n") + "\n=> \n")
  }

  return <div className="relative flex flex-col gap-8 p-8 lg:px-48 pt-36 h-screen w-screen" id="page">
    {isLoading && <div className="w-screen h-screen flex justify-center items-center font-bold bg-background/30 fixed top-0 left-0 backdrop-blur z-10"><Loader2 className="animate-spin" /></div>}
    <div className="text-4xl font-bold -mb-4">Prompt Oasis</div>
    <div className="opacity-50 -my-4">Turn your ideas into action. This app helps you craft the perfect prompts to get the best results from AI.</div>
    <textarea id="textarea" className="w-full bg-card/30 text-card-foreground p-4 rounded-md min-h-64" placeholder="Enter your prompt here" value={input} onChange={(e) => setInput(e.target.value)} />
    <Button className="w-fit self-end relative -top-20 right-4" onClick={handleSubmit}>Submit</Button>
    <div className="flex gap-4 -mt-16 w-full flex-wrap">
      {actionButtons.map((button) => (
        <Button key={button.id} onClick={() => setAction(button.id)} variant={action === button.id ? "default" : "ghost"}>{button.label}</Button>
      ))}
    </div>

    {output && <div className="w-full bg-card/30 text-card-foreground p-4 rounded-md">
      <div className="font-bold uppercase">Output</div>
      <Markdown remarkPlugins={[remarkGfm]}>
        {output}
      </Markdown>
      <Button className="mt-4" onClick={() => setInput(output)}>Use as Input</Button>
      <Button className="mt-4 ml-2" onClick={() => navigator.clipboard.writeText(output)}>Copy</Button>
    </div>}
    <div className="flex flex-col gap-2">
      {templates.map((template, i) => <div key={i} className="bg-card/30 text-card-foreground py-2 px-4 rounded-md flex items-center justify-between">
        <div>
          <div className="font-bold text-lg">{template.name}</div>
          <div className="opacity-50">{template.description}</div>
        </div>
        <div className="flex gap-2">

          <Button onClick={() => handleUseTemplate(template)}>Use</Button>

        </div>
      </div>)}
    </div>
    <br /><br />
    <br /><br />
    <br /><br />
  </div>
}