"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Network, TrendingUp, AlertTriangle, CheckCircle2, Activity, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WAFTelemetry {
  requestsBlocked: number
  requestsAllowed: number
  threatsDetected: number
  rulesActive: number
  topThreats: Array<{ type: string; count: number }>
  responseTime: string
  uptime: string
  last24h: {
    blocked: number
    allowed: number
    threats: number
  }
}

interface ArcjetTelemetry {
  requestsAnalyzed: number
  threatsBlocked: number
  rateLimitHits: number
  botDetections: number
  suspiciousActivity: number
  protectionRate: string
  avgResponseTime: string
  last24h: {
    analyzed: number
    blocked: number
    rateLimited: number
  }
  topProtections: Array<{ type: string; count: number }>
}

interface MCPTelemetry {
  activeConnections: number
  requestsPerSecond: number
  totalRequests: number
  errorRate: string
  avgLatency: string
  toolsActive: number
  last24h: {
    requests: number
    errors: number
    successful: number
  }
  serverStatus: Array<{ name: string; status: string; requests: number }>
}

interface TelemetryData {
  waf: WAFTelemetry
  arcjet: ArcjetTelemetry
  mcp: MCPTelemetry
  timestamp: string
}

export function TelemetryDashboard() {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTelemetry()
    // Refresh every 30 seconds
    const interval = setInterval(fetchTelemetry, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchTelemetry = async () => {
    try {
      const response = await fetch("/api/telemetry")
      if (!response.ok) {
        throw new Error("Failed to fetch telemetry data")
      }
      const data = await response.json()
      setTelemetry(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-background border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <Activity className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading telemetry data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !telemetry) {
    return (
      <Card className="bg-background border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12 text-destructive">
            <AlertTriangle className="h-8 w-8 mr-2" />
            <span>Error loading telemetry: {error || "No data available"}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Executive Telemetry Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring for WAF, Arcjet, and MCP systems</p>
        </div>
        <Badge className="bg-green-500">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          All Systems Operational
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-background border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">WAF</CardTitle>
            </div>
            <CardDescription>Web Application Firewall</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Requests Blocked</span>
                <span className="text-2xl font-bold text-red-500">
                  {telemetry.waf.requestsBlocked.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <Badge className="bg-green-500">{telemetry.waf.uptime}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Arcjet</CardTitle>
            </div>
            <CardDescription>Advanced Threat Protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Protection Rate</span>
                <span className="text-2xl font-bold text-green-500">
                  {telemetry.arcjet.protectionRate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Threats Blocked</span>
                <Badge className="bg-red-500">
                  {telemetry.arcjet.threatsBlocked.toLocaleString()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">MCP</CardTitle>
            </div>
            <CardDescription>Model Context Protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Connections</span>
                <span className="text-2xl font-bold text-primary">
                  {telemetry.mcp.activeConnections}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <Badge className="bg-green-500">{telemetry.mcp.errorRate}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="waf" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waf">
            <Shield className="h-4 w-4 mr-2" />
            WAF
          </TabsTrigger>
          <TabsTrigger value="arcjet">
            <Zap className="h-4 w-4 mr-2" />
            Arcjet
          </TabsTrigger>
          <TabsTrigger value="mcp">
            <Network className="h-4 w-4 mr-2" />
            MCP
          </TabsTrigger>
        </TabsList>

        {/* WAF Tab */}
        <TabsContent value="waf" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Requests Blocked</p>
                  <p className="text-2xl font-bold">{telemetry.waf.requestsBlocked.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Requests Allowed</p>
                  <p className="text-2xl font-bold text-green-500">
                    {telemetry.waf.requestsAllowed.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Threats Detected</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {telemetry.waf.threatsDetected}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Active</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Rules Active</p>
                  <p className="text-2xl font-bold">{telemetry.waf.rulesActive}</p>
                  <p className="text-xs text-muted-foreground mt-1">WAF Rules</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background border-primary/20">
            <CardHeader>
              <CardTitle>Top Threats Blocked</CardTitle>
              <CardDescription>Most common attack patterns detected and blocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {telemetry.waf.topThreats.map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500/10 p-2 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">{threat.type}</p>
                        <p className="text-sm text-muted-foreground">Blocked by WAF rules</p>
                      </div>
                    </div>
                    <Badge variant="destructive">{threat.count.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{telemetry.waf.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <Badge className="bg-green-500">{telemetry.waf.uptime}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>24-Hour Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Blocked</span>
                  <span className="font-semibold text-red-500">
                    {telemetry.waf.last24h.blocked.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Allowed</span>
                  <span className="font-semibold text-green-500">
                    {telemetry.waf.last24h.allowed.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Threats</span>
                  <span className="font-semibold text-yellow-500">
                    {telemetry.waf.last24h.threats}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Arcjet Tab */}
        <TabsContent value="arcjet" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Requests Analyzed</p>
                  <p className="text-2xl font-bold">{telemetry.arcjet.requestsAnalyzed.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Threats Blocked</p>
                  <p className="text-2xl font-bold text-red-500">
                    {telemetry.arcjet.threatsBlocked.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Rate Limit Hits</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {telemetry.arcjet.rateLimitHits.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Protection Rate</p>
                  <p className="text-2xl font-bold text-green-500">
                    {telemetry.arcjet.protectionRate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Overall</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background border-primary/20">
            <CardHeader>
              <CardTitle>Top Protection Mechanisms</CardTitle>
              <CardDescription>Most effective Arcjet protection features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {telemetry.arcjet.topProtections.map((protection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Shield className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">{protection.type}</p>
                        <p className="text-sm text-muted-foreground">Active protection</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">{protection.count.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Bot Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{telemetry.arcjet.botDetections.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">Bots identified</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Suspicious Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-500">
                  {telemetry.arcjet.suspiciousActivity}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Flagged events</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{telemetry.arcjet.avgResponseTime}</p>
                <p className="text-sm text-muted-foreground mt-2">Avg response time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* MCP Tab */}
        <TabsContent value="mcp" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Active Connections</p>
                  <p className="text-2xl font-bold">{telemetry.mcp.activeConnections}</p>
                  <p className="text-xs text-muted-foreground mt-1">MCP Servers</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Requests/sec</p>
                  <p className="text-2xl font-bold text-primary">
                    {telemetry.mcp.requestsPerSecond}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Average</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                  <p className="text-2xl font-bold">
                    {telemetry.mcp.totalRequests.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Error Rate</p>
                  <p className="text-2xl font-bold text-green-500">{telemetry.mcp.errorRate}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last hour</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background border-primary/20">
            <CardHeader>
              <CardTitle>Server Status</CardTitle>
              <CardDescription>MCP server connections and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {telemetry.mcp.serverStatus.map((server, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        server.status === "active" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}>
                        {server.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{server.name}</p>
                        <p className="text-sm text-muted-foreground">Status: {server.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {server.requests.toLocaleString()} requests
                      </span>
                      <Badge className={server.status === "active" ? "bg-green-500" : "bg-red-500"}>
                        {server.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>24-Hour Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Requests</span>
                  <span className="font-semibold">
                    {telemetry.mcp.last24h.requests.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Successful</span>
                  <span className="font-semibold text-green-500">
                    {telemetry.mcp.last24h.successful.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Errors</span>
                  <span className="font-semibold text-red-500">
                    {telemetry.mcp.last24h.errors}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{telemetry.mcp.avgLatency}</p>
                <p className="text-sm text-muted-foreground mt-2">Average latency</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>Tools Active</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{telemetry.mcp.toolsActive}</p>
                <p className="text-sm text-muted-foreground mt-2">MCP tools available</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Last Updated */}
      <div className="text-sm text-muted-foreground text-center">
        Last updated: {new Date(telemetry.timestamp).toLocaleString()}
      </div>
    </div>
  )
}

