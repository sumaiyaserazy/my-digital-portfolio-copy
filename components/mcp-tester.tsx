"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Dice1, User, Network, Shield, Search, FileSearch } from "lucide-react"
import { toast } from "sonner"

interface MCPTool {
  name: string
  description: string
  server: string
}

const mcpTools: MCPTool[] = [
  {
    name: "roll-dice",
    description: "Roll a dice with specified number of sides",
    server: "roll-dice-server"
  },
  {
    name: "person-app",
    description: "Get person information",
    server: "person-app-server"
  },
  {
    name: "digital-twin",
    description: "Digital twin operations",
    server: "digital-twin-server"
  },
  {
    name: "penetration-test",
    description: "Run penetration testing and view protection outcomes",
    server: "security-server"
  },
  {
    name: "security-scan",
    description: "Perform comprehensive security scanning",
    server: "security-server"
  },
  {
    name: "vulnerability-assessment",
    description: "Assess vulnerabilities and protection coverage",
    server: "security-server"
  }
]

export function MCPTester() {
  const [selectedTool, setSelectedTool] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")

  const handleCall = async () => {
    if (!selectedTool) {
      toast.error("Please select a tool")
      return
    }

    setLoading(true)
    setResult("")

    try {
      // Call MCP server via API route
      const response = await fetch("/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: selectedTool,
          input: input || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to call MCP tool")
      }

      setResult(JSON.stringify(data.result, null, 2))
      toast.success("MCP tool called successfully")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setResult(`Error: ${errorMessage}`)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getToolIcon = (toolName: string) => {
    if (toolName.includes("dice")) return Dice1
    if (toolName.includes("person")) return User
    if (toolName.includes("twin")) return Network
    if (toolName.includes("penetration") || toolName.includes("security") || toolName.includes("vulnerability")) return Shield
    return Dice1
  }

  const selectedToolData = mcpTools.find(t => t.name === selectedTool)
  const IconComponent = selectedToolData ? getToolIcon(selectedToolData.name) : Dice1

  return (
    <Card className="bg-background border-primary/20">
      <CardHeader>
        <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle>MCP Tool Tester</CardTitle>
        <CardDescription>
          Test MCP tools by calling roll-dice, person-app, or digital-twin servers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tool">Select MCP Tool</Label>
          <Select value={selectedTool} onValueChange={setSelectedTool}>
            <SelectTrigger id="tool">
              <SelectValue placeholder="Choose a tool..." />
            </SelectTrigger>
            <SelectContent>
              {mcpTools.map((tool) => (
                <SelectItem key={tool.name} value={tool.name}>
                  {tool.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTool && (
            <p className="text-sm text-muted-foreground">
              {mcpTools.find(t => t.name === selectedTool)?.description}
            </p>
          )}
        </div>

        {selectedTool && (
          <div className="space-y-2">
            <Label htmlFor="input">Input (optional)</Label>
            <Input
              id="input"
              placeholder="Enter input parameters..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}

        <Button onClick={handleCall} disabled={loading || !selectedTool} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calling MCP Tool...
            </>
          ) : (
            "Call MCP Tool"
          )}
        </Button>

        {result && (
          <div className="space-y-2">
            <Label>Result</Label>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-64">
              {result}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

