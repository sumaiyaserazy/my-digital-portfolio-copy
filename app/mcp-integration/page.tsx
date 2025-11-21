import { MCPTester } from "@/components/mcp-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Zap, Network, Play, Settings, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "MCP Integration & Demo | CyberShield",
  description: "Model Context Protocol integration, testing, and interactive demonstrations",
}

export default function MCPIntegrationPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">MCP Integration & Demo</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Test and interact with Model Context Protocol servers including roll-dice, person-app, and digital-twin. Try out MCP tools with live interactive examples.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 mb-12">
            <Link href="https://modelcontextprotocol.io/specification/2025-06-18" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <Code className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Protocol Support</CardTitle>
                  <CardDescription>
                    Full support for Model Context Protocol standards
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="https://github.com/sumaiyaserazy/mcp-auth-demo" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <Play className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Live Demos</CardTitle>
                  <CardDescription>
                    Try out MCP tools with live interactive examples
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <Network className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multiple Servers</CardTitle>
                  <CardDescription>
                    Connect to roll-dice, person-app, and digital-twin servers
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Real-time Testing</CardTitle>
                  <CardDescription>
                    Test MCP tools in real-time with instant feedback
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <Settings className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Configurable</CardTitle>
                  <CardDescription>
                    Customize tool parameters and see results instantly
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools" target="_blank" rel="noopener noreferrer">
              <Card className="bg-background border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Learn how to use each tool with detailed examples
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <MCPTester />
        </div>
      </section>
    </div>
  )
}

